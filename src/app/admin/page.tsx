"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import StatsOverview from "@/components/admin/StatsOverview";
import FilterBar from "@/components/admin/FilterBar";
import TicketsTable, { TicketItem } from "@/components/admin/TicketsTable";
import TicketsKanban from "@/components/admin/TicketsKanban";
import TicketDetailModal from "@/components/admin/TicketDetailModal";
import ToastNotification, { ToastMessage } from "@/components/admin/ToastNotification";
import { exportTicketsToCSV } from "@/lib/admin-utils";

export default function AdminPage() {
  const [tickets, setTickets] = useState<TicketItem[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    received: 0,
    inProgress: 0,
    resolved: 0,
    quarantined: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Filters state
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [status, setStatus] = useState("ALL");
  const [incidentType, setIncidentType] = useState("ALL");
  const [timeRange, setTimeRange] = useState("all");
  const [sort, setSort] = useState("newest");
  const [viewMode, setViewMode] = useState<"table" | "kanban">("table");
  const [autoRefresh, setAutoRefresh] = useState(false);

  // Modal & Toast state
  const [selectedTicket, setSelectedTicket] = useState<TicketItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Search debounce timer
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 250);
    return () => clearTimeout(handler);
  }, [search]);

  // Toast notification helper
  const addToast = (type: "success" | "error" | "info", message: string) => {
    const id = `${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Main fetch function
  const fetchTickets = useCallback(
    async (showRefreshIndicator = false) => {
      if (showRefreshIndicator) {
        setIsRefreshing(true);
      }

      try {
        const queryParams = new URLSearchParams();
        if (debouncedSearch) queryParams.set("search", debouncedSearch);
        if (status !== "ALL") queryParams.set("status", status);
        if (incidentType !== "ALL") queryParams.set("incidentType", incidentType);
        if (timeRange !== "all") queryParams.set("timeRange", timeRange);
        if (sort !== "newest") queryParams.set("sort", sort);

        const response = await fetch(`/api/tickets?${queryParams.toString()}`);
        const data = await response.json();

        if (data.success) {
          setTickets(data.tickets || []);
          if (data.stats) {
            setStats(data.stats);
          }
        } else {
          addToast("error", data.error || "Failed to query database.");
        }
      } catch (err) {
        console.error("Failed to load tickets:", err);
        addToast("error", "Database connection error.");
      } finally {
        setIsLoading(false);
        setIsRefreshing(false);
      }
    },
    [debouncedSearch, status, incidentType, timeRange, sort]
  );

  // Trigger fetch on filter changes
  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  // Auto-refresh interval
  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(() => {
      fetchTickets(true);
    }, 15000);
    return () => clearInterval(interval);
  }, [autoRefresh, fetchTickets]);

  // Handle ticket inspection
  const handleInspect = (ticket: TicketItem) => {
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };

  // Handle status update
  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/tickets/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Status update failed.");
      }

      // Update in state
      setTickets((prev) =>
        prev.map((t) => (t.id === id ? { ...t, status: newStatus, updatedAt: new Date().toISOString() } : t))
      );

      if (selectedTicket && selectedTicket.id === id) {
        setSelectedTicket((prev) =>
          prev ? { ...prev, status: newStatus, updatedAt: new Date().toISOString() } : null
        );
      }

      addToast("success", `Status updated to ${newStatus}`);
      fetchTickets();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to update status";
      addToast("error", message);
      throw err;
    }
  };

  // Handle notes save
  const handleSaveNotes = async (id: string, notes: string) => {
    try {
      const res = await fetch(`/api/tickets/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminNotes: notes }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to save admin notes.");
      }

      setTickets((prev) =>
        prev.map((t) => (t.id === id ? { ...t, adminNotes: notes, updatedAt: new Date().toISOString() } : t))
      );

      if (selectedTicket && selectedTicket.id === id) {
        setSelectedTicket((prev) =>
          prev ? { ...prev, adminNotes: notes, updatedAt: new Date().toISOString() } : null
        );
      }

      addToast("success", "Facility notes saved to ticket dossier.");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to save notes";
      addToast("error", message);
      throw err;
    }
  };

  // Handle ticket deletion
  const handleDeleteTicket = async (id: string, ticketNumber: string) => {
    try {
      const res = await fetch(`/api/tickets/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to purge ticket.");
      }

      setTickets((prev) => prev.filter((t) => t.id !== id));
      if (selectedTicket && selectedTicket.id === id) {
        setIsModalOpen(false);
        setSelectedTicket(null);
      }

      addToast("success", `Ticket ${ticketNumber} purged from facility database.`);
      fetchTickets();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to purge ticket";
      addToast("error", message);
    }
  };

  // Handle CSV export
  const handleExportCSV = () => {
    if (tickets.length === 0) {
      addToast("info", "No tickets available to export with current filters.");
      return;
    }
    exportTicketsToCSV(tickets, `ticket404-export-${new Date().toISOString().slice(0, 10)}.csv`);
    addToast("success", `Exported ${tickets.length} tickets to CSV.`);
  };

  // Handle sample data seeding
  const handleSeedData = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch("/api/tickets/seed", { method: "POST" });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to seed sample tickets.");
      }
      addToast("success", `Generated ${data.tickets.length} sample anomaly incidents.`);
      await fetchTickets();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to seed data";
      addToast("error", message);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleResetFilters = () => {
    setSearch("");
    setDebouncedSearch("");
    setStatus("ALL");
    setIncidentType("ALL");
    setTimeRange("all");
    setSort("newest");
  };

  return (
    <div className="space-y-6">
      {/* Metric Cards KPI Row */}
      <StatsOverview
        stats={stats}
        activeStatus={status}
        onSelectStatus={(selected) => setStatus(selected)}
      />

      {/* Filter and Action Bar */}
      <FilterBar
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={setStatus}
        incidentType={incidentType}
        onIncidentTypeChange={setIncidentType}
        timeRange={timeRange}
        onTimeRangeChange={setTimeRange}
        sort={sort}
        onSortChange={setSort}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        isRefreshing={isRefreshing}
        onRefresh={() => fetchTickets(true)}
        autoRefresh={autoRefresh}
        onToggleAutoRefresh={() => setAutoRefresh((prev) => !prev)}
        onExportCSV={handleExportCSV}
        onSeedData={handleSeedData}
        totalFiltered={tickets.length}
        totalCount={stats.total}
      />

      {/* Main Data Presentation: Table or Kanban */}
      {viewMode === "table" ? (
        <TicketsTable
          tickets={tickets}
          isLoading={isLoading}
          onInspect={handleInspect}
          onUpdateStatus={handleUpdateStatus}
          onDeleteTicket={handleDeleteTicket}
          onResetFilters={handleResetFilters}
          onSeedData={handleSeedData}
        />
      ) : (
        <TicketsKanban
          tickets={tickets}
          onInspect={handleInspect}
          onUpdateStatus={handleUpdateStatus}
        />
      )}

      {/* Full Dossier Inspection Modal */}
      <TicketDetailModal
        ticket={selectedTicket}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedTicket(null);
        }}
        onUpdateStatus={handleUpdateStatus}
        onSaveNotes={handleSaveNotes}
        onDeleteTicket={handleDeleteTicket}
      />

      {/* Toast Feedback Alerts */}
      <ToastNotification toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
