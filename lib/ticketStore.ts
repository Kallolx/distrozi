import fs from "fs";
import path from "path";

export type TicketStatus = "Pending" | "In Progress" | "Resolved" | "Rejected";

export interface SupportTicket {
  ticketId: string;
  type: string;
  trackArtist: string;
  status: TicketStatus;
  date: string;
  remarks: string;
  details: Record<string, string>;
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
  return process.env.NODE_ENV !== "production";
}

function readLocalTickets(): SupportTicket[] {
  if (!canUseLocalFileStore()) {
    throw new Error("Persistent ticket storage is not configured for production.");
  }

  if (!fs.existsSync(localFilePath)) return [];

  const data = fs.readFileSync(localFilePath, "utf8");
  const parsed = JSON.parse(data) as unknown;
  return Array.isArray(parsed) ? (parsed as SupportTicket[]) : [];
}

function writeLocalTickets(tickets: SupportTicket[]) {
  if (!canUseLocalFileStore()) {
    throw new Error("Persistent ticket storage is not configured for production.");
  }

  const dir = path.dirname(localFilePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(localFilePath, JSON.stringify(tickets, null, 2), "utf8");
}

export async function readTickets(): Promise<SupportTicket[]> {
  if (!redisConfig()) {
    return readLocalTickets();
  }

  const raw = await redisCommand<string | null>(["GET", TICKETS_KEY]);
  if (!raw) return [];

  const parsed = JSON.parse(raw) as unknown;
  return Array.isArray(parsed) ? (parsed as SupportTicket[]) : [];
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
