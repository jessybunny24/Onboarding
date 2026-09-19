import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const DEFAULT_SESSION_ID = "default-session";

export async function GET() {
  try {
    const progress = await prisma.anomalyProgress.upsert({
      where: { id: DEFAULT_SESSION_ID },
      update: {},
      create: {
        id: DEFAULT_SESSION_ID,
        isAnomalyActive: false,
        activeTicketIndex: 0,
        anomalyMode: false,
        playerHealth: 100,
        solvedStreak: 0,
        printerPulls: 0,
        cablesConnected: [],
        sliderValue: 40,
      },
    });

    return NextResponse.json({ success: true, data: progress });
  } catch (error) {
    console.error("Failed to fetch anomaly progress:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch anomaly progress",
        data: {
          id: DEFAULT_SESSION_ID,
          isAnomalyActive: false,
          activeTicketIndex: 0,
          anomalyMode: false,
          playerHealth: 100,
          solvedStreak: 0,
          printerPulls: 0,
          cablesConnected: [],
          sliderValue: 40,
        },
      },
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
        { success: false, error: "Invalid JSON payload" },
        { status: 400 }
      );
    }

    const progress = await prisma.anomalyProgress.upsert({
      where: { id: DEFAULT_SESSION_ID },
      update: {
        ...(typeof body.isAnomalyActive === "boolean" && {
          isAnomalyActive: body.isAnomalyActive,
        }),
        ...(typeof body.activeTicketIndex === "number" && {
          activeTicketIndex: body.activeTicketIndex,
        }),
        ...(typeof body.anomalyMode === "boolean" && {
          anomalyMode: body.anomalyMode,
        }),
        ...(typeof body.playerHealth === "number" && {
          playerHealth: body.playerHealth,
        }),
        ...(typeof body.solvedStreak === "number" && {
          solvedStreak: body.solvedStreak,
        }),
        ...(typeof body.printerPulls === "number" && {
          printerPulls: body.printerPulls,
        }),
        ...(Array.isArray(body.cablesConnected) && {
          cablesConnected: body.cablesConnected,
        }),
        ...(typeof body.sliderValue === "number" && {
          sliderValue: body.sliderValue,
        }),
      },
      create: {
        id: DEFAULT_SESSION_ID,
        isAnomalyActive: Boolean(body.isAnomalyActive),
        activeTicketIndex: Number(body.activeTicketIndex) || 0,
        anomalyMode: Boolean(body.anomalyMode),
        playerHealth: typeof body.playerHealth === "number" ? body.playerHealth : 100,
        solvedStreak: Number(body.solvedStreak) || 0,
        printerPulls: Number(body.printerPulls) || 0,
        cablesConnected: Array.isArray(body.cablesConnected) ? body.cablesConnected : [],
        sliderValue: typeof body.sliderValue === "number" ? body.sliderValue : 40,
      },
    });

    return NextResponse.json({ success: true, data: progress });
  } catch (error) {
    console.error("Failed to save anomaly progress:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save anomaly progress" },
      { status: 500 }
    );
  }
}
