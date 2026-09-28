import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const sampleIncidents = [
  {
    name: "Dr. Evelyn Vance",
    email: "e.vance@facility-containment.internal",
    location: "Sub-Level 4 // Bio-Containment Core",
    incidentType: "level-3-mimic",
    message: "Senior researcher in Sector 7 observed drinking liquid nitrogen from the water cooler without blinking. Uncanny resemblance to Dr. Morrison, who reportedly transferred last week.",
    status: "QUARANTINED",
    adminNotes: "Classified security review initiated. DNA swab sent to sub-level lab.",
  },
  {
    name: "Desk Technician Tyler",
    email: "tyler.tech@internal-ops.net",
    location: "Print Station 12-B",
    incidentType: "level-2-technical",
    message: "Network LaserJet 4000 has printed 1,200 blank pages followed by high-resolution scans of the employee breakroom at 03:00 AM yesterday. Equipment is completely unplugged from ethernet and power.",
    status: "IN_PROGRESS",
    adminNotes: "Power cord severed physically; device continues humming. Technician assigned.",
  },
  {
    name: "Agent Marcus Sterling",
    email: "m.sterling@spatiotemporal.gov",
    location: "Sector 9 Infinite Corridor",
    incidentType: "level-4-temporal",
    message: "Hallway between breakroom and server rack now measures approximately 4.2 miles long. Pedometer logs 9,000 steps to reach the water dispenser. Emergency rations requested.",
    status: "RECEIVED",
    adminNotes: null,
  },
  {
    name: "Claire Dupont",
    email: "press@indiegameradar.com",
    location: "External Press Query",
    incidentType: "press-inquiry",
    message: "Hello! We are covering the release of TICKET #404 on our horror gaming column and would love review build access along with a short Q&A with the lead game designer.",
    status: "RESOLVED",
    adminNotes: "Demo key sent via marketing department. Press kit zip link attached.",
  },
  {
    name: "Janitor H. Wells",
    email: "hwells@facility-maintenance.internal",
    location: "Room 204 // Operations Annex",
    incidentType: "level-1-environmental",
    message: "Every chair in conference room B is turned exactly 45 degrees towards the northeast wall each morning. Maintenance logs show no scheduled cleaning staff entered between 10 PM and 6 AM.",
    status: "RECEIVED",
    adminNotes: null,
  },
];

export async function POST() {
  try {
    const createdTickets = [];

    for (const incident of sampleIncidents) {
      const ticketNumber = `#404-${Math.floor(1000 + Math.random() * 9000)}`;
      const ticket = await prisma.supportTicket.create({
        data: {
          ticketNumber,
          name: incident.name,
          email: incident.email,
          location: incident.location,
          incidentType: incident.incidentType,
          message: incident.message,
          status: incident.status,
          adminNotes: incident.adminNotes,
        },
      });
      createdTickets.push(ticket);
    }

    return NextResponse.json({
      success: true,
      message: `Seeded ${createdTickets.length} sample incident tickets.`,
      tickets: createdTickets,
    });
  } catch (error) {
    console.error("Error seeding tickets:", error);
    return NextResponse.json(
      { success: false, error: "Failed to seed sample tickets." },
      { status: 500 }
    );
  }
}
