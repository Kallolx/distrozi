import fs from 'fs';
import path from 'path';

const localFilePath = path.join(process.cwd(), 'data', 'support-tickets.json');

export interface Ticket {
  ticketId: string;
  type: string;
  trackArtist: string;
  status: "Pending" | "In Progress" | "Resolved" | "Rejected";
  date: string;
  remarks: string;
  details: Record<string, any>;
}

export async function getTickets(): Promise<Ticket[]> {
  const kvUrl = process.env.KV_REST_API_URL;
  const kvToken = process.env.KV_REST_API_TOKEN;

  // Use Vercel KV (Redis REST API) in production if configured
  if (kvUrl && kvToken) {
    try {
      const res = await fetch(`${kvUrl}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${kvToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(["GET", "distrozi_tickets"]),
        cache: "no-store",
      });

      if (res.ok) {
        const data = await res.json();
        if (data && data.result) {
          const parsed = JSON.parse(data.result);
          return Array.isArray(parsed) ? parsed : [];
        }
      }
    } catch (err) {
      console.error("Vercel KV Get tickets error:", err);
    }
  }

  // Fallback to local file system
  try {
    if (!fs.existsSync(localFilePath)) {
      return [];
    }
    const data = fs.readFileSync(localFilePath, 'utf8');
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error("Local file read tickets error:", err);
    return [];
  }
}

export async function saveTickets(tickets: Ticket[]): Promise<boolean> {
  const kvUrl = process.env.KV_REST_API_URL;
  const kvToken = process.env.KV_REST_API_TOKEN;

  // Use Vercel KV (Redis REST API) in production if configured
  if (kvUrl && kvToken) {
    try {
      const res = await fetch(`${kvUrl}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${kvToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(["SET", "distrozi_tickets", JSON.stringify(tickets)]),
      });

      if (res.ok) {
        return true;
      }
    } catch (err) {
      console.error("Vercel KV Set tickets error:", err);
    }
  }

  // Fallback to local file system
  try {
    const dir = path.dirname(localFilePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(localFilePath, JSON.stringify(tickets, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error("Local file write tickets error:", err);
    return false;
  }
}
