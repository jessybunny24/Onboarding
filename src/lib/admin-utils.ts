/**
 * Utilities & helpers for the TICKET #404 Facility Admin Console
 */

export interface IncidentMeta {
  label: string;
  badge: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL" | "EXTERNAL";
  badgeClass: string;
  threatLevel: string;
  description: string;
}

export const INCIDENT_CONFIG: Record<string, IncidentMeta> = {
  "level-1-environmental": {
    label: "Level 1: Environmental Shift",
    badge: "LOW",
    badgeClass: "bg-blue-950/70 text-blue-400 border-blue-800/60",
    threatLevel: "Minor office reality divergence",
    description: "Displaced chairs, shifted clocks, room orientation changes.",
  },
  "level-2-technical": {
    label: "Level 2: Technical/Hardware Glitch",
    badge: "MEDIUM",
    badgeClass: "bg-cyan-950/70 text-cyan-400 border-cyan-800/60",
    threatLevel: "Subnet hardware malfunction",
    description: "Printer photo printouts, ghost devices on subnet, rogue cursors.",
  },
  "level-3-mimic": {
    label: "Level 3: Biological/Mimic Encounter",
    badge: "HIGH",
    badgeClass: "bg-purple-950/70 text-purple-400 border-purple-800/60",
    threatLevel: "High risk personnel mimicry",
    description: "Employees returning as different people, supervisor clones.",
  },
  "level-4-temporal": {
    label: "Level 4: Spatiotemporal Paradox",
    badge: "CRITICAL",
    badgeClass: "bg-red-950/70 text-red-400 border-red-800/60",
    threatLevel: "Facility structural/chronological collapse",
    description: "Tickets logged from 2011, shifting hallways, infinite loops.",
  },
  "press-inquiry": {
    label: "General Press & Publisher Inquiries",
    badge: "EXTERNAL",
    badgeClass: "bg-emerald-950/70 text-emerald-400 border-emerald-800/60",
    threatLevel: "External media & partner correspondence",
    description: "Media requests, demo keys, and partnership queries.",
  },
};

export interface StatusMeta {
  label: string;
  bgClass: string;
  borderClass: string;
  textClass: string;
  dotClass: string;
}

export const STATUS_CONFIG: Record<string, StatusMeta> = {
  RECEIVED: {
    label: "Received",
    bgClass: "bg-amber-500/10",
    borderClass: "border-amber-500/30",
    textClass: "text-amber-400",
    dotClass: "bg-amber-400",
  },
  IN_PROGRESS: {
    label: "In Progress",
    bgClass: "bg-blue-500/10",
    borderClass: "border-blue-500/30",
    textClass: "text-blue-400",
    dotClass: "bg-blue-400",
  },
  RESOLVED: {
    label: "Resolved",
    bgClass: "bg-emerald-500/10",
    borderClass: "border-emerald-500/30",
    textClass: "text-emerald-400",
    dotClass: "bg-emerald-400",
  },
  QUARANTINED: {
    label: "Quarantined",
    bgClass: "bg-rose-500/10",
    borderClass: "border-rose-500/30",
    textClass: "text-rose-400",
    dotClass: "bg-rose-400 animate-pulse",
  },
};

export function getIncidentMeta(incidentType: string): IncidentMeta {
  return (
    INCIDENT_CONFIG[incidentType] || {
      label: incidentType,
      badge: "MEDIUM",
      badgeClass: "bg-slate-800 text-slate-300 border-slate-700",
      threatLevel: "Unclassified Incident",
      description: "Standard logged inquiry",
    }
  );
}

export function getStatusMeta(status: string): StatusMeta {
  return (
    STATUS_CONFIG[status] || {
      label: status,
      bgClass: "bg-slate-800/80",
      borderClass: "border-slate-700",
      textClass: "text-slate-300",
      dotClass: "bg-slate-400",
    }
  );
}

/**
 * Format relative time (e.g. "5m ago", "2h ago", "3d ago")
 */
export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "Just now";
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) return `${diffInDays}d ago`;
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

/**
 * Format precise timestamp for tooltips and dossiers
 */
export function formatFullTimestamp(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
}

/**
 * Export array of tickets to clean CSV file
 */
export function exportTicketsToCSV(tickets: any[], filename = "ticket-404-database.csv") {
  const headers = [
    "Ticket Number",
    "Status",
    "Incident Type",
    "Submitter Name",
    "Email",
    "Location",
    "Message / Description",
    "Admin Notes",
    "Date Created (UTC)",
    "Last Updated (UTC)",
  ];

  const escapeCSV = (val: string | null | undefined) => {
    if (val === null || val === undefined) return '""';
    const stringVal = String(val).replace(/"/g, '""');
    return `"${stringVal}"`;
  };

  const rows = tickets.map((t) => [
    escapeCSV(t.ticketNumber),
    escapeCSV(t.status),
    escapeCSV(t.incidentType),
    escapeCSV(t.name),
    escapeCSV(t.email),
    escapeCSV(t.location),
    escapeCSV(t.message),
    escapeCSV(t.adminNotes),
    escapeCSV(t.createdAt),
    escapeCSV(t.updatedAt),
  ]);

  const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\r\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
