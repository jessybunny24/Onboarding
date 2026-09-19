import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const reports = await prisma.incidentReport.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, data: reports });
  } catch (error) {
    console.error("Failed to fetch incident reports:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch reports" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    let body: Record<string, unknown>;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON body" },
        { status: 400 }
      );
    }

    const { name, email, location, incidentType, message } = body;

    if (!name || !email || !location || !message) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const report = await prisma.incidentReport.create({
      data: {
        name: String(name),
        email: String(email),
        location: String(location),
        incidentType: String(incidentType || "Hardware Failure"),
        message: String(message),
      },
    });

    return NextResponse.json({ success: true, data: report });
  } catch (error) {
    console.error("Failed to save incident report:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save incident report" },
      { status: 500 }
    );
  }
}
