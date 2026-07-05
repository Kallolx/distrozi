import { NextResponse } from 'next/server';
import { readTickets, writeTickets, SupportTicket, TicketStatus } from '@/lib/ticketStore';

export async function GET(request: Request) {
  try {
    // Authorization header validation using server environment variables
    const authHeader = request.headers.get('authorization') || '';
    const token = authHeader.replace('Bearer ', '').trim();
    const correctPasscode = process.env.ADMIN_PASSCODE || 'distrozi2026';

    if (token !== correctPasscode) {
      return NextResponse.json({ success: false, message: "Unauthorized access" }, { status: 401 });
    }

    const tickets = await readTickets();
    // Sort by date descending (latest first)
    const sorted = tickets.sort((a: SupportTicket, b: SupportTicket) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return NextResponse.json({ tickets: sorted }, { status: 200 });
  } catch (error) {
    console.error("Error reading support tickets:", error);
    return NextResponse.json(
      { success: false, message: "Failed to read ticket store", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
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

    const tickets = await readTickets();
    const index = tickets.findIndex((t: SupportTicket) => t.ticketId === ticketId);

    if (index === -1) {
      return NextResponse.json({ success: false, message: "Ticket not found" }, { status: 404 });
    }

    if (status !== undefined) {
      tickets[index].status = status as TicketStatus;
    }
    if (remarks !== undefined) {
      tickets[index].remarks = remarks;
    }

    await writeTickets(tickets);

    return NextResponse.json({ success: true, ticket: tickets[index] }, { status: 200 });
  } catch (error) {
    console.error("Error updating support ticket:", error);
    return NextResponse.json(
      { success: false, message: "Server error occurred", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
