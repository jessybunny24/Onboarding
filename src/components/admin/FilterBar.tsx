"use client";

import React from "react";
import {
  Search,
  X,
  Filter,
  ArrowUpDown,
  Calendar,
  Download,
  RefreshCw,
  PlusCircle,
  Table as TableIcon,
  Kanban,
  RotateCcw,
} from "lucide-react";

interface FilterBarProps {
  search: string;
  onSearchChange: (val: string) => void;
  status: string;
  onStatusChange: (val: string) => void;
  incidentType: string;
  onIncidentTypeChange: (val: string) => void;
  timeRange: string;
  onTimeRangeChange: (val: string) => void;
  sort: string;
  onSortChange: (val: string) => void;
  viewMode: "table" | "kanban";
  onViewModeChange: (mode: "table" | "kanban") => void;
  isRefreshing: boolean;
  onRefresh: () => void;
  autoRefresh: boolean;
  onToggleAutoRefresh: () => void;
  onExportCSV: () => void;
  onSeedData: () => void;
  totalFiltered: number;
  totalCount: number;
}

export default function FilterBar({
  search,
  onSearchChange,
  status,
  onStatusChange,
  incidentType,
  onIncidentTypeChange,
  timeRange,
  onTimeRangeChange,
  sort,
  onSortChange,
  viewMode,
  onViewModeChange,
  isRefreshing,
  onRefresh,
  autoRefresh,
  onToggleAutoRefresh,
  onExportCSV,
  onSeedData,
  totalFiltered,
  totalCount,
}: FilterBarProps) {
  const isFiltered =
    search.trim() !== "" ||
    status !== "ALL" ||
    incidentType !== "ALL" ||
    timeRange !== "all" ||
    sort !== "newest";

  const handleResetFilters = () => {
    onSearchChange("");
    onStatusChange("ALL");
    onIncidentTypeChange("ALL");
    onTimeRangeChange("all");
    onSortChange("newest");
  };

  return (
    <div className="bg-[#0b101d] border border-slate-800/90 rounded-2xl p-4 sm:p-5 shadow-xl shadow-black/40 space-y-4 mb-6">
      {/* Top Row: Search Input & Primary Actions */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by ticket #, submitter name, email, location, or message..."
            className="w-full pl-10 pr-9 py-2.5 bg-[#070a13] border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all font-mono"
          />
          {search && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-0.5 rounded cursor-pointer"
              title="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* View Switcher & Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* View Toggle */}
          <div className="bg-[#070a13] border border-slate-700/80 p-1 rounded-xl flex items-center gap-1">
            <button
              type="button"
              onClick={() => onViewModeChange("table")}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer ${
                viewMode === "table"
                  ? "bg-cyan-950 text-cyan-300 border border-cyan-800/80 font-semibold"
                  : "text-slate-400 hover:text-slate-200"
              }`}
              title="Table View"
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>Table</span>
            </button>
            <button
              type="button"
              onClick={() => onViewModeChange("kanban")}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer ${
                viewMode === "kanban"
                  ? "bg-cyan-950 text-cyan-300 border border-cyan-800/80 font-semibold"
                  : "text-slate-400 hover:text-slate-200"
              }`}
              title="Kanban Board View"
            >
              <Kanban className="w-3.5 h-3.5" />
              <span>Kanban</span>
            </button>
          </div>

          {/* Refresh Button */}
          <button
            type="button"
            onClick={onRefresh}
            disabled={isRefreshing}
            className="px-3 py-2 bg-[#070a13] border border-slate-700/80 hover:border-slate-600 rounded-xl text-xs font-mono text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
            title="Refresh ticket database"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-cyan-400" : ""}`}
            />
            <span className="hidden sm:inline">Refresh</span>
          </button>

          {/* Auto Refresh Toggle */}
          <button
            type="button"
            onClick={onToggleAutoRefresh}
            className={`px-3 py-2 border rounded-xl text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer ${
              autoRefresh
                ? "bg-emerald-950/40 text-emerald-300 border-emerald-700/60"
                : "bg-[#070a13] text-slate-400 border-slate-700/80 hover:text-slate-200"
            }`}
            title="Auto-refresh every 15 seconds"
          >
            <span
              className={`w-2 h-2 rounded-full ${
                autoRefresh ? "bg-emerald-400 animate-pulse" : "bg-slate-600"
              }`}
            />
            <span className="hidden md:inline">Auto (15s)</span>
          </button>

          {/* Export CSV */}
          <button
            type="button"
            onClick={onExportCSV}
            className="px-3.5 py-2 bg-slate-800/80 hover:bg-slate-700 border border-slate-700 rounded-xl text-xs font-mono text-slate-200 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Export filtered tickets to CSV"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span>Export CSV</span>
          </button>

          {/* Seed Sample Incident Button */}
          <button
            type="button"
            onClick={onSeedData}
            className="px-3.5 py-2 bg-cyan-950/50 hover:bg-cyan-900/60 border border-cyan-800/80 rounded-xl text-xs font-mono text-cyan-300 hover:text-cyan-200 flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Seed realistic anomaly tickets for testing"
          >
            <PlusCircle className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden lg:inline">Seed Incidents</span>
          </button>
        </div>
      </div>

      {/* Bottom Filter Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800/80 text-xs">
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-1.5 text-slate-400 font-mono">
            <Filter className="w-3.5 h-3.5 text-cyan-400" />
            <span>Filters:</span>
          </div>

          {/* Status Select */}
          <div className="relative">
            <select
              value={status}
              onChange={(e) => onStatusChange(e.target.value)}
              className="appearance-none bg-[#070a13] border border-slate-700/80 rounded-lg px-3 py-1.5 pr-7 font-mono text-slate-200 focus:outline-none focus:ring-1 focus:ring-cyan-500 cursor-pointer"
            >
              <option value="ALL">All Statuses</option>
              <option value="RECEIVED">Pending / Received</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="RESOLVED">Resolved</option>
              <option value="QUARANTINED">Quarantined</option>
            </select>
            <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate-400">
              ▼
            </div>
          </div>

          {/* Incident Type Select */}
          <div className="relative">
            <select
              value={incidentType}
              onChange={(e) => onIncidentTypeChange(e.target.value)}
              className="appearance-none bg-[#070a13] border border-slate-700/80 rounded-lg px-3 py-1.5 pr-7 font-mono text-slate-200 focus:outline-none focus:ring-1 focus:ring-cyan-500 cursor-pointer"
            >
              <option value="ALL">All Incident Types</option>
              <option value="level-1-environmental">Level 1: Environmental Shift</option>
              <option value="level-2-technical">Level 2: Technical/Hardware Glitch</option>
              <option value="level-3-mimic">Level 3: Biological/Mimic Encounter</option>
              <option value="level-4-temporal">Level 4: Spatiotemporal Paradox</option>
              <option value="press-inquiry">Press & Publisher Inquiries</option>
            </select>
            <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate-400">
              ▼
            </div>
          </div>

          {/* Date Timeframe Select */}
          <div className="relative">
            <select
              value={timeRange}
              onChange={(e) => onTimeRangeChange(e.target.value)}
              className="appearance-none bg-[#070a13] border border-slate-700/80 rounded-lg px-3 py-1.5 pr-7 font-mono text-slate-200 focus:outline-none focus:ring-1 focus:ring-cyan-500 cursor-pointer"
            >
              <option value="all">All Dates</option>
              <option value="today">Today</option>
              <option value="week">Past 7 Days</option>
              <option value="month">Past 30 Days</option>
            </select>
            <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate-400">
              <Calendar className="w-3 h-3 text-slate-400 inline" />
            </div>
          </div>

          {/* Sort Order Select */}
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => onSortChange(e.target.value)}
              className="appearance-none bg-[#070a13] border border-slate-700/80 rounded-lg px-3 py-1.5 pr-7 font-mono text-slate-200 focus:outline-none focus:ring-1 focus:ring-cyan-500 cursor-pointer"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
            <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate-400">
              <ArrowUpDown className="w-3 h-3 text-slate-400 inline" />
            </div>
          </div>

          {/* Reset Filters Button */}
          {isFiltered && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="px-2.5 py-1.5 rounded-lg bg-red-950/40 border border-red-800/60 text-red-300 hover:bg-red-900/50 flex items-center gap-1 font-mono transition-colors cursor-pointer"
              title="Reset all active filters"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* Counter Badge */}
        <div className="text-slate-400 font-mono text-xs flex items-center gap-1.5">
          <span>Displaying:</span>
          <span className="font-bold text-white px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700">
            {totalFiltered}
          </span>
          <span className="text-slate-500">/</span>
          <span className="text-slate-400">{totalCount} total tickets</span>
        </div>
      </div>
    </div>
  );
}
