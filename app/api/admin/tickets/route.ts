import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'support-tickets.json');

function readTickets() {
  try {
    if (!fs.existsSync(filePath)) {
      return [];
    }
    const data = fs.readFileSync(filePath, 'utf8');
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Error reading tickets:", error);
    return [];
  }
}

function writeTickets(tickets: any[]) {
  try {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(tickets, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error("Error writing tickets:", error);
    return false;
  }
}

export async function GET(request: Request) {
  // Authorization header validation using server environment variables
  const authHeader = request.headers.get('authorization') || '';
  const token = authHeader.replace('Bearer ', '').trim();
  const correctPasscode = process.env.ADMIN_PASSCODE || 'distrozi2026';

  if (token !== correctPasscode) {
    return NextResponse.json({ success: false, message: "Unauthorized access" }, { status: 401 });
  }

  const tickets = readTickets();
  // Sort by date descending (latest first)
  const sorted = tickets.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return NextResponse.json({ tickets: sorted }, { status: 200 });
}

export async function POST(request: Request) {
  try {
    // Authorization header validation using server environment variables
    const authHeader = request.headers.get('authorization') || '';
    const token = authHeader.replace('Bearer ', '').trim();
    const correctPasscode = process.env.ADMIN_PASSCODE || 'distrozi2026';

    if (token !== correctPasscode) {
      return NextResponse.json({ success: false, message: "Unauthorized access" }, { status: 401 });
    }

    const body = await request.json();
    const { ticketId, status, remarks } = body;

    if (!ticketId) {
      return NextResponse.json({ success: false, message: "Ticket ID is required" }, { status: 400 });
    }

    const tickets = readTickets();
    const index = tickets.findIndex((t: any) => t.ticketId === ticketId);

    if (index === -1) {
      return NextResponse.json({ success: false, message: "Ticket not found" }, { status: 404 });
    }

    if (status !== undefined) {
      tickets[index].status = status;
    }
    if (remarks !== undefined) {
      tickets[index].remarks = remarks;
    }

    const success = writeTickets(tickets);
    if (!success) {
      return NextResponse.json({ success: false, message: "Failed to save updates to the file store" }, { status: 500 });
    }

    return NextResponse.json({ success: true, ticket: tickets[index] }, { status: 200 });
  } catch (error) {
    console.error("Error updating support ticket:", error);
    return NextResponse.json(
      { success: false, message: "Server error occurred", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
