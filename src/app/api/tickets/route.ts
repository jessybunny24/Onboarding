import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, location, incidentType, message } = body;

    // Validate required fields
    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { success: false, error: "Name is required." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !email.trim()) {
      return NextResponse.json(
        { success: false, error: "Email address is required." },
        { status: 400 }
      );
    }

    if (!incidentType || typeof incidentType !== "string" || !incidentType.trim()) {
      return NextResponse.json(
        { success: false, error: "Incident type is required." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { success: false, error: "Message / description is required." },
        { status: 400 }
      );
    }

    // Generate unique ticket number formatted like #404-XXXX
    let ticketNumber = "";
    let isUnique = false;
    let attempts = 0;

    while (!isUnique && attempts < 5) {
      attempts++;
      const candidateNumber = `#404-${Math.floor(1000 + Math.random() * 9000)}`;
      const existing = await prisma.supportTicket.findUnique({
        where: { ticketNumber: candidateNumber },
      });
      if (!existing) {
        ticketNumber = candidateNumber;
        isUnique = true;
      }
    }

    if (!ticketNumber) {
      ticketNumber = `#404-${Date.now().toString().slice(-4)}`;
    }

    const ticket = await prisma.supportTicket.create({
      data: {
        ticketNumber,
        name: name.trim(),
        email: email.trim(),
        location: location?.trim() || null,
        incidentType: incidentType.trim(),
        message: message.trim(),
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Ticket successfully logged in facility database.",
        ticket,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating support ticket:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to log support ticket to facility database.",
      },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search")?.trim() || "";
    const status = searchParams.get("status")?.trim() || "ALL";
    const incidentType = searchParams.get("incidentType")?.trim() || "ALL";
    const sort = searchParams.get("sort") || "newest";
    const timeRange = searchParams.get("timeRange") || "all";

    // Build filter conditions
    const where: any = {};

    if (status && status !== "ALL") {
      where.status = status;
    }

    if (incidentType && incidentType !== "ALL") {
      where.incidentType = incidentType;
    }

    if (search) {
      where.OR = [
        { ticketNumber: { contains: search, mode: "insensitive" } },
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { location: { contains: search, mode: "insensitive" } },
        { message: { contains: search, mode: "insensitive" } },
      ];
    }

    if (timeRange && timeRange !== "all") {
      const now = new Date();
      if (timeRange === "today") {
        const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        where.createdAt = { gte: startOfDay };
      } else if (timeRange === "week") {
        const pastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        where.createdAt = { gte: pastWeek };
      } else if (timeRange === "month") {
        const pastMonth = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        where.createdAt = { gte: pastMonth };
      }
    }

    const [
      tickets,
      totalCount,
      receivedCount,
      inProgressCount,
      resolvedCount,
      quarantinedCount,
    ] = await Promise.all([
      prisma.supportTicket.findMany({
        where,
        orderBy: { createdAt: sort === "oldest" ? "asc" : "desc" },
      }),
      prisma.supportTicket.count(),
      prisma.supportTicket.count({ where: { status: "RECEIVED" } }),
      prisma.supportTicket.count({ where: { status: "IN_PROGRESS" } }),
      prisma.supportTicket.count({ where: { status: "RESOLVED" } }),
      prisma.supportTicket.count({ where: { status: "QUARANTINED" } }),
    ]);

    return NextResponse.json({
      success: true,
      tickets,
      stats: {
        total: totalCount,
        received: receivedCount,
        inProgress: inProgressCount,
        resolved: resolvedCount,
        quarantined: quarantinedCount,
      },
      filteredCount: tickets.length,
    });
  } catch (error) {
    console.error("Error fetching support tickets:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch support tickets." },
      { status: 500 }
    );
  }
}
