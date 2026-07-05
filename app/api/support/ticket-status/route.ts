import { NextResponse } from "next/server";
import { readTickets } from "@/lib/ticketStore";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const ticketId = searchParams.get("ticketId")?.trim();

    if (!ticketId) {
      return NextResponse.json(
        { success: false, message: "Ticket ID is required" },
        { status: 400 }
      );
    }

    const tickets = await readTickets();
    const ticket = tickets.find(
      (item) => item.ticketId.toLowerCase() === ticketId.toLowerCase()
    );

    if (!ticket) {
      return NextResponse.json(
        { success: false, message: "No support ticket found with that ID" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        ticket: {
          ticketId: ticket.ticketId,
          type: ticket.type,
          trackArtist: ticket.trackArtist,
          status: ticket.status,
          date: ticket.date,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error looking up support ticket:", error);
    return NextResponse.json(
      { success: false, message: "Unable to check ticket status right now" },
      { status: 500 }
    );
  }
}
