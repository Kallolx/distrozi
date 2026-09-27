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

  // Check and auto-resolve tickets in progress for more than 72 hours (3 days) ONLY for "YouTube Claim Release" type
  const now = new Date();
  let hasChanges = false;

  // Give legacy duplicate IDs a fresh unique ID. The oldest ticket keeps the original;
  // newer ones remember it in details.originalTicketId so status lookups still work.
  const seenIds = new Set(tickets.map((t) => t.ticketId));
  const claimedIds = new Set<string>();
  const byDateAsc = [...tickets].sort(
    (a, b) => (new Date(a.date).getTime() || 0) - (new Date(b.date).getTime() || 0)
  );
  for (const t of byDateAsc) {
    if (!claimedIds.has(t.ticketId)) {
      claimedIds.add(t.ticketId);
      continue;
    }
    let newId = generateTicketId();
    while (seenIds.has(newId)) newId = generateTicketId();
    seenIds.add(newId);
    claimedIds.add(newId);
    t.details = { ...t.details, originalTicketId: t.ticketId, ticketId: newId };
    t.ticketId = newId;
    hasChanges = true;
  }

  const updatedTickets = tickets.map((t) => {
    if (t.status === "In Progress" && t.type === "YouTube Claim Release") {
      if (!t.statusUpdatedAt) {
        // Legacy "In Progress" ticket lacking a status timestamp.
        // Set it to the current time so it has a fresh 72-hour window from today.
        hasChanges = true;
        return {
          ...t,
          statusUpdatedAt: now.toISOString(),
        };
      } else {
        const refTime = new Date(t.statusUpdatedAt);
        const diffMs = now.getTime() - refTime.getTime();
        const diffHours = diffMs / (1000 * 60 * 60);

        if (diffHours >= 72) {
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

export function generateTicketId(): string {
  return `DT-${Math.floor(100000 + Math.random() * 900000)}`;
}

// Serial numbering for new tickets (DT-1001, DT-1002, ...). Legacy tickets keep their random 6-digit IDs.
const COUNTER_KEY = "distrozi:support:ticket-counter";
const COUNTER_START = 1000;
const localCounterPath = path.join(process.cwd(), "data", "support-ticket-counter.json");

async function nextSerialNumber(): Promise<number> {
  if (redisConfig()) {
    await redisCommand<string | null>(["SET", COUNTER_KEY, COUNTER_START, "NX"]);
    return redisCommand<number>(["INCR", COUNTER_KEY]);
  }

  let current = COUNTER_START;
  try {
    if (fs.existsSync(localCounterPath)) {
      current = Number(JSON.parse(fs.readFileSync(localCounterPath, "utf8")).value) || COUNTER_START;
    }
  } catch (e) {
    console.error("Error reading local ticket counter:", e);
  }
  const next = current + 1;
  fs.mkdirSync(path.dirname(localCounterPath), { recursive: true });
  fs.writeFileSync(localCounterPath, JSON.stringify({ value: next }), "utf8");
  return next;
}

// Persists the ticket under the next serial ID (skipping any ID already in use).
// Returns the ticket ID that was actually stored.
export async function addTicket(ticket: SupportTicket): Promise<string> {
  const tickets = await readTickets();
  const existingIds = new Set(tickets.map((t) => t.ticketId));
  let ticketId = `DT-${await nextSerialNumber()}`;
  while (existingIds.has(ticketId)) {
    ticketId = `DT-${await nextSerialNumber()}`;
  }
  tickets.push({ ...ticket, ticketId, details: { ...ticket.details, ticketId } });
  await writeTickets(tickets);
  return ticketId;
}
