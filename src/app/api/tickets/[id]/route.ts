import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status, adminNotes } = body;

    const validStatuses = ["RECEIVED", "IN_PROGRESS", "RESOLVED", "QUARANTINED"];
    if (status && !validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, error: `Invalid status. Must be one of: ${validStatuses.join(", ")}` },
        { status: 400 }
      );
    }

    const updateData: { status?: string; adminNotes?: string | null } = {};
    if (status !== undefined) updateData.status = status;
    if (adminNotes !== undefined) updateData.adminNotes = adminNotes;

    const updated = await prisma.supportTicket.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      message: "Ticket updated successfully.",
      ticket: updated,
    });
  } catch (error) {
    console.error("Error updating support ticket:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update support ticket." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.supportTicket.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Ticket purged from database.",
    });
  } catch (error) {
    console.error("Error deleting support ticket:", error);
    return NextResponse.json(
      { success: false, error: "Failed to purge support ticket." },
      { status: 500 }
    );
  }
}
