import { NextResponse } from "next/server";
import { readTickets } from "@/lib/ticketStore";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const passcode = searchParams.get("passcode")?.trim();
    const correctPasscode = process.env.ADMIN_PASSCODE || "distrozi2026";

    if (passcode !== correctPasscode) {
      return NextResponse.json({ success: false, message: "Unauthorized debug access" }, { status: 401 });
    }

    const tickets = await readTickets();
    return NextResponse.json({
      success: true,
      totalCount: tickets.length,
      statusDistribution: tickets.reduce((acc, t) => {
        acc[t.status] = (acc[t.status] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
      latestTen: tickets
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 10)
        .map(t => ({
          ticketId: t.ticketId,
          date: t.date,
          status: t.status,
          type: t.type,
          hasStatusUpdatedAt: !!t.statusUpdatedAt,
          statusUpdatedAt: t.statusUpdatedAt,
          detailsKeys: Object.keys(t.details || {}),
        })),
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error reading debug tickets", error: String(error) },
      { status: 500 }
    );
  }
}
