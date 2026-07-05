"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  KeyRound, Search, FileText, CheckCircle, Clock, AlertTriangle, 
  X, RefreshCw, ChevronRight
} from "lucide-react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import BorderGlow from "@/components/BorderGlow";
import Button from "../../components/ui/Button";

interface Ticket {
  ticketId: string;
  type: string;
  trackArtist: string;
  status: "Pending" | "In Progress" | "Resolved" | "Rejected";
  date: string;
  remarks: string;
  details: Record<string, any>;
}

export default function AdminTicketsClient() {
  const [passcode, setPasscode] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState(false);

  // Tickets States
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  
  // Selected Ticket for Editing
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [editStatus, setEditStatus] = useState<Ticket["status"]>("Pending");
  const [editRemarks, setEditRemarks] = useState("");
  const [updating, setUpdating] = useState(false);

  // Fetch Tickets with Authorization Header
  const fetchTickets = async (keyToUse?: string) => {
    const key = keyToUse || sessionStorage.getItem("distrozi_admin_key") || "";
    setLoading(true);
    try {
      const res = await fetch("/api/admin/tickets", {
        headers: {
          "Authorization": `Bearer ${key}`
        }
      });
      
      if (res.ok) {
        const data = await res.json();
        setTickets(data.tickets || []);
        setIsAuthenticated(true);
        setAuthError(false);
        if (keyToUse) {
          sessionStorage.setItem("distrozi_admin_key", keyToUse);
        }
      } else if (res.status === 401) {
        setIsAuthenticated(false);
        sessionStorage.removeItem("distrozi_admin_key");
        if (keyToUse) {
          setAuthError(true);
        }
      }
    } catch (err) {
      console.error("Failed to fetch tickets:", err);
    } finally {
      setLoading(false);
    }
  };

  // Auth gate checks on mount
  useEffect(() => {
    const savedKey = sessionStorage.getItem("distrozi_admin_key");
    if (savedKey) {
      fetchTickets(savedKey);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    fetchTickets(passcode);
  };

  // Open Ticket detail
  const handleOpenTicket = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setEditStatus(ticket.status);
    setEditRemarks(ticket.remarks || "");
  };

  const handleCloseTicket = () => {
    setSelectedTicket(null);
  };

  // Save changes
  const handleSaveChanges = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTicket) return;

    const key = sessionStorage.getItem("distrozi_admin_key") || "";
    setUpdating(true);
    
    try {
      const res = await fetch("/api/admin/tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${key}`
        },
        body: JSON.stringify({
          ticketId: selectedTicket.ticketId,
          status: editStatus,
          remarks: editRemarks,
        }),
      });

      if (res.ok) {
        // Update local state
        setTickets((prev) =>
          prev.map((t) =>
            t.ticketId === selectedTicket.ticketId
              ? { ...t, status: editStatus, remarks: editRemarks }
              : t
          )
        );
        setSelectedTicket((prev) =>
          prev
            ? { ...prev, status: editStatus, remarks: editRemarks }
            : null
        );
        alert("Ticket updated successfully.");
      } else if (res.status === 401) {
        alert("Session expired or unauthorized. Please re-authenticate.");
        setIsAuthenticated(false);
        sessionStorage.removeItem("distrozi_admin_key");
      } else {
        alert("Failed to update ticket.");
      }
    } catch (err) {
      console.error("Error updating ticket:", err);
      alert("Error saving updates.");
    } finally {
      setUpdating(false);
    }
  };

  // Calculations
  const stats = useMemo(() => {
    const total = tickets.length;
    const pending = tickets.filter((t) => t.status === "Pending").length;
    const inProgress = tickets.filter((t) => t.status === "In Progress").length;
    const resolved = tickets.filter((t) => t.status === "Resolved").length;
    return { total, pending, inProgress, resolved };
  }, [tickets]);

  const filteredTickets = useMemo(() => {
    return tickets.filter((ticket) => {
      const matchesStatus =
        statusFilter === "All" || ticket.status === statusFilter;

      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesStatus;

      const matchesQuery =
        ticket.ticketId.toLowerCase().includes(query) ||
        ticket.type.toLowerCase().includes(query) ||
        ticket.trackArtist.toLowerCase().includes(query) ||
        (ticket.details.labelName &&
          ticket.details.labelName.toLowerCase().includes(query)) ||
        (ticket.details.email &&
          ticket.details.email.toLowerCase().includes(query));

      return matchesStatus && matchesQuery;
    });
  }, [tickets, statusFilter, searchQuery]);

  // Formatted Key helper
  const formatLabel = (key: string) => {
    if (key === "submissionType" || key === "ticketId") return "";
    const formatted = key.replace(/([A-Z])/g, " $1").trim();
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  };

  // Render Gate Screen if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="relative min-h-screen bg-[#050505] flex flex-col justify-between items-center px-6">
        <Navbar />
        <div className="w-full max-w-md my-auto pt-24 pb-12">
          <BorderGlow backgroundColor="#080808" borderRadius={20} className="w-full">
            <div className="p-8 sm:p-10 flex flex-col gap-6 text-center">
              <div className="w-14 h-14 rounded-full bg-[#f3c343]/10 flex items-center justify-center text-[#f3c343] mx-auto border border-[#f3c343]/20 shadow-[0_0_15px_rgba(243,195,67,0.1)]">
                <KeyRound size={28} />
              </div>
              <div className="flex flex-col gap-1.5">
                <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Admin Portal Gate
                </h1>
                <p className="text-white/50 text-xs sm:text-sm">
                  Enter the access passcode to review support ticket logs.
                </p>
              </div>

              <form onSubmit={handleLogin} className="flex flex-col gap-4 text-left">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-white/80">
                    Access Passcode
                  </label>
                  <input
                    type="password"
                    required
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    placeholder="Enter access code"
                    className="w-full bg-white/[0.02] hover:bg-white/[0.04] focus:bg-white/[0.06] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#f3c343]/50 transition-all font-mono"
                  />
                  {authError && (
                    <span className="text-red-400 text-xs mt-1 flex items-center gap-1 font-medium">
                      ⚠️ Invalid passcode. Please try again.
                    </span>
                  )}
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  className="w-full py-3.5 bg-[#f3c343] hover:bg-[#ffd866] text-black font-bold text-sm rounded-xl cursor-pointer mt-2"
                >
                  Authenticate Access
                </Button>
              </form>
            </div>
          </BorderGlow>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#050505] flex flex-col justify-between">
      <Navbar />
      <div className="pt-32 pb-16 flex-1 flex flex-col max-w-6xl mx-auto px-6 lg:px-8 w-full">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold text-[#f3c343] tracking-widest uppercase">
              Control Panel
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
              Support Desk <span className="gradient-text font-bold">Admin</span>
            </h1>
            <p className="text-white/50 text-sm">
              Manage client copyright claims, whitelisting, manual claims, and OAC requests.
            </p>
          </div>
          
          <div className="flex gap-3 shrink-0">
            <button
              onClick={() => fetchTickets()}
              disabled={loading}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white/80 text-sm font-semibold hover:bg-white/5 hover:text-white transition-all disabled:opacity-50 cursor-pointer"
            >
              <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
              {loading ? "Syncing..." : "Sync Tickets"}
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="rounded-2xl bg-white/[0.02] border border-white/5 p-5 flex flex-col gap-1.5 backdrop-blur-sm">
            <span className="text-xs font-medium text-white/40">Total Tickets</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-bold text-white">{stats.total}</span>
              <span className="text-xs text-white/30">received</span>
            </div>
          </div>
          
          <div className="rounded-2xl bg-white/[0.02] border border-white/5 p-5 flex flex-col gap-1.5 backdrop-blur-sm">
            <span className="text-xs font-medium text-white/40">Pending Review</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-bold text-amber-400">{stats.pending}</span>
              <span className="text-xs text-amber-500/30">waiting</span>
            </div>
          </div>

          <div className="rounded-2xl bg-white/[0.02] border border-white/5 p-5 flex flex-col gap-1.5 backdrop-blur-sm">
            <span className="text-xs font-medium text-white/40">In Progress</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-bold text-blue-400">{stats.inProgress}</span>
              <span className="text-xs text-blue-500/30">active</span>
            </div>
          </div>

          <div className="rounded-2xl bg-white/[0.02] border border-white/5 p-5 flex flex-col gap-1.5 backdrop-blur-sm">
            <span className="text-xs font-medium text-white/40">Resolved</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-bold text-emerald-400">{stats.resolved}</span>
              <span className="text-xs text-emerald-500/30">closed</span>
            </div>
          </div>
        </div>

        {/* Filter and Search controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          {/* Tabs */}
          <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-white/[0.02] border border-white/5 self-start">
            {["All", "Pending", "In Progress", "Resolved", "Rejected"].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  statusFilter === status
                    ? "bg-white/[0.06] text-white shadow-sm"
                    : "text-white/40 hover:text-white/70"
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative w-full md:max-w-xs">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 w-4.5 h-4.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by ID, Label, Track..."
              className="w-full bg-white/[0.02] hover:bg-white/[0.04] focus:bg-white/[0.06] border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs text-white focus:outline-none focus:border-[#f3c343]/40 transition-all"
            />
          </div>
        </div>

        {/* Tickets Table / List */}
        <div className="w-full rounded-2xl bg-white/[0.01] border border-white/5 overflow-hidden backdrop-blur-sm shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-white/5 bg-white/[0.02] text-white/40 font-semibold text-xs tracking-wider">
                  <th className="py-4 px-6">Ticket ID</th>
                  <th className="py-4 px-6">Date Submitted</th>
                  <th className="py-4 px-6">Type</th>
                  <th className="py-4 px-6">Track / Artist</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredTickets.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-white/30 text-sm">
                      No support tickets match the filters.
                    </td>
                  </tr>
                ) : (
                  filteredTickets.map((ticket) => {
                    const statusColors = {
                      Pending: "bg-amber-500/10 border-amber-500/20 text-amber-400",
                      "In Progress": "bg-blue-500/10 border-blue-500/20 text-blue-400",
                      Resolved: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
                      Rejected: "bg-red-500/10 border-red-500/20 text-red-400",
                    };

                    const formattedDate = new Date(ticket.date).toLocaleString([], {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    });

                    return (
                      <tr
                        key={ticket.ticketId}
                        className="hover:bg-white/[0.01] transition-colors"
                      >
                        <td className="py-4.5 px-6 font-mono font-bold text-[#f3c343] text-xs">
                          {ticket.ticketId}
                        </td>
                        <td className="py-4.5 px-6 text-white/60 text-xs">
                          {formattedDate}
                        </td>
                        <td className="py-4.5 px-6 font-medium text-white/80 text-xs">
                          {ticket.type}
                        </td>
                        <td className="py-4.5 px-6 text-white/60 text-xs truncate max-w-[200px]">
                          {ticket.trackArtist}
                        </td>
                        <td className="py-4.5 px-6">
                          <span
                            className={`inline-flex px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${
                              statusColors[ticket.status] || ""
                            }`}
                          >
                            {ticket.status}
                          </span>
                        </td>
                        <td className="py-4.5 px-6 text-right">
                          <button
                            onClick={() => handleOpenTicket(ticket)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 text-xs font-semibold text-white/90 hover:text-white transition-all cursor-pointer"
                          >
                            Review
                            <ChevronRight size={12} />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Slide-over Drawer Panel for Reviewing Ticket details */}
        <AnimatePresence>
          {selectedTicket && (
            <div className="fixed inset-0 z-50 flex justify-end">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleCloseTicket}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm"
              />

              {/* Drawer Box */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="relative w-full max-w-xl bg-[#0c0c0c] border-l border-white/10 h-full shadow-2xl z-10 flex flex-col overflow-hidden"
              >
                {/* Header */}
                <div className="p-6 border-b border-white/10 flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-base text-[#f3c343]">
                      {selectedTicket.ticketId}
                    </span>
                    <span className="text-white/30">|</span>
                    <span className="text-sm text-white/60">Review Request</span>
                  </div>
                  <button
                    onClick={handleCloseTicket}
                    className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white transition-colors cursor-pointer"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto p-6 sm:p-8 flex flex-col gap-6 scrollbar-thin scrollbar-thumb-white/10">
                  
                  {/* Summary Card */}
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col gap-1 text-left">
                    <span className="text-[10px] font-semibold text-[#f3c343] tracking-widest uppercase">
                      Ticket Classification
                    </span>
                    <h3 className="text-base font-bold text-white">{selectedTicket.type}</h3>
                    <span className="text-xs text-white/40 mt-1">
                      Submitted on: {new Date(selectedTicket.date).toLocaleString()}
                    </span>
                  </div>

                  {/* Submission Details List */}
                  <div className="flex flex-col gap-3 text-left">
                    <h4 className="text-xs font-semibold text-white/50 uppercase tracking-wider pb-2 border-b border-white/5">
                      Submitted Metadata
                    </h4>

                    <div className="flex flex-col gap-2">
                      {Object.entries(selectedTicket.details).map(([key, val]) => {
                        const formattedLabel = formatLabel(key);
                        if (!formattedLabel) return null;
                        
                        // Check if value is boolean or object
                        let displayValue = String(val);
                        if (typeof val === "boolean") {
                          displayValue = val ? "Confirmed (Yes)" : "No";
                        }

                        return (
                          <div
                            key={key}
                            className="grid grid-cols-3 gap-4 py-2 border-b border-white/[0.02] text-xs"
                          >
                            <span className="font-semibold text-white/40 text-left vertical-top">
                              {formattedLabel}
                            </span>
                            <span className="col-span-2 text-white/80 font-medium break-words leading-relaxed">
                              {displayValue || "-"}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Admin Management Section */}
                  <form onSubmit={handleSaveChanges} className="flex flex-col gap-4 mt-4 text-left border-t border-white/5 pt-6">
                    <h4 className="text-xs font-semibold text-white/50 uppercase tracking-wider">
                      Desk Operations
                    </h4>

                    {/* Status Select */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-white/70">
                        Operational Status
                      </label>
                      <select
                        value={editStatus}
                        onChange={(e) => setEditStatus(e.target.value as Ticket["status"])}
                        className="w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#f3c343]/50 transition-all"
                      >
                        <option value="Pending">Pending Review</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </div>

                    {/* Remarks Input */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-white/70">
                        Internal Desk Remarks (Hidden from Users)
                      </label>
                      <textarea
                        value={editRemarks}
                        onChange={(e) => setEditRemarks(e.target.value)}
                        placeholder="Add internal action notes, dates, splits details..."
                        rows={4}
                        className="w-full bg-white/[0.02] hover:bg-white/[0.04] focus:bg-white/[0.06] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#f3c343]/50 transition-all resize-none leading-relaxed"
                      />
                    </div>

                    {/* Save Button */}
                    <Button
                      type="submit"
                      variant="primary"
                      disabled={updating}
                      className="w-full py-3.5 bg-[#f3c343] hover:bg-[#ffd866] text-black font-bold text-xs rounded-xl cursor-pointer disabled:opacity-40 select-none flex items-center justify-center gap-2 mt-2"
                    >
                      {updating ? (
                        <>
                          <div className="w-3.5 h-3.5 rounded-full border-2 border-black/20 border-t-black animate-spin" />
                          <span>Saving Changes...</span>
                        </>
                      ) : (
                        <span>Save Logs & Update Status</span>
                      )}
                    </Button>
                  </form>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  );
}
