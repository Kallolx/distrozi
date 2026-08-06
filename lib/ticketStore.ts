import fs from "fs";
import path from "path";

export type TicketStatus = "Under Review" | "In Progress" | "Resolved" | "Rejected";

export interface SupportTicket {
  ticketId: string;
  type: string;
  trackArtist: string;
  status: TicketStatus;
  date: string;
  remarks: string;
  details: Record<string, string>;
  statusUpdatedAt?: string;
}

const TICKETS_KEY = "distrozi:support:tickets";
const localFilePath = path.join(process.cwd(), "data", "support-tickets.json");

function redisConfig() {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  return url && token ? { url: url.replace(/\/$/, ""), token } : null;
}

async function redisCommand<T>(command: Array<string | number>): Promise<T> {
  const config = redisConfig();
  if (!config) {
    throw new Error("Redis ticket storage is not configured.");
  }

  const response = await fetch(config.url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
    cache: "no-store",
  });

  const payload = (await response.json()) as { result?: T; error?: string };
  if (!response.ok || payload.error) {
    throw new Error(payload.error || `Redis command failed with status ${response.status}`);
  }

  return payload.result as T;
}

function canUseLocalFileStore() {
  return true;
}

function readLocalTickets(): SupportTicket[] {
  if (!fs.existsSync(localFilePath)) return [];

  try {
    const data = fs.readFileSync(localFilePath, "utf8");
    const parsed = JSON.parse(data) as unknown;
    return Array.isArray(parsed) ? (parsed as SupportTicket[]) : [];
  } catch (e) {
    console.error("Error reading local tickets:", e);
    return [];
  }
}

function writeLocalTickets(tickets: SupportTicket[]) {
  try {
    const dir = path.dirname(localFilePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(localFilePath, JSON.stringify(tickets, null, 2), "utf8");
  } catch (e) {
    console.error("Error writing local tickets:", e);
  }
}

export async function readTickets(): Promise<SupportTicket[]> {
  let tickets: SupportTicket[] = [];
  if (!redisConfig()) {
    tickets = readLocalTickets();
  } else {
    try {
      const raw = await redisCommand<string | null>(["GET", TICKETS_KEY]);
      if (raw) {
        const parsed = JSON.parse(raw) as unknown;
        tickets = Array.isArray(parsed) ? (parsed as SupportTicket[]) : [];
      }
    } catch (err) {
      console.error("Error reading tickets from Redis:", err);
      tickets = readLocalTickets();
    }
  }

  // Check and auto-resolve tickets in progress for more than 120 hours (5 days)
  const now = new Date();
  let hasChanges = false;

  const updatedTickets = tickets.map((t) => {
    if (t.status === "In Progress") {
      if (!t.statusUpdatedAt) {
        // Legacy "In Progress" ticket lacking a status timestamp.
        // Set it to the current time so it has a fresh 120-hour window from today.
        hasChanges = true;
        return {
          ...t,
          statusUpdatedAt: now.toISOString(),
        };
      } else {
        const refTime = new Date(t.statusUpdatedAt);
        const diffMs = now.getTime() - refTime.getTime();
        const diffHours = diffMs / (1000 * 60 * 60);

        if (diffHours >= 120) {
          hasChanges = true;
          return {
            ...t,
            status: "Resolved" as const,
            statusUpdatedAt: now.toISOString(),
          };
        }
      }
    }
    return t;
  });

  if (hasChanges) {
    try {
      if (!redisConfig()) {
        writeLocalTickets(updatedTickets);
      } else {
        await redisCommand<string>(["SET", TICKETS_KEY, JSON.stringify(updatedTickets)]);
      }
    } catch (err) {
      console.error("Error auto-resolving tickets in database write:", err);
      writeLocalTickets(updatedTickets);
    }
    return updatedTickets;
  }

  return tickets;
}

export async function writeTickets(tickets: SupportTicket[]): Promise<void> {
  if (!redisConfig()) {
    writeLocalTickets(tickets);
    return;
  }

  await redisCommand<string>(["SET", TICKETS_KEY, JSON.stringify(tickets)]);
}

export async function addTicket(ticket: SupportTicket): Promise<void> {
  const tickets = await readTickets();
  tickets.push(ticket);
  await writeTickets(tickets);
}
