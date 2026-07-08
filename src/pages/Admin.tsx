import { useState } from "react";
import { useGetLeads, useGetLeadStats } from "@/lib/api-client";
import { Users, MessageSquare, FileText, Phone, TrendingUp, RefreshCw, Mail, Building2, Tag, Package } from "lucide-react";

const TYPE_LABELS: Record<string, { label: string; color: string; bg: string }> = {
  quote:    { label: "Quote",    color: "text-blue-700",  bg: "bg-blue-50 border-blue-200" },
  contact:  { label: "Contact",  color: "text-green-700", bg: "bg-green-50 border-green-200" },
  brochure: { label: "Brochure", color: "text-purple-700",bg: "bg-purple-50 border-purple-200" },
  callback: { label: "Callback", color: "text-orange-700",bg: "bg-orange-50 border-orange-200" },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-IN", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit", hour12: true
  });
}

export default function Admin() {
  const [filter, setFilter] = useState<string>("all");
  const { data: leads, isLoading, refetch, isFetching } = useGetLeads();
  const { data: stats } = useGetLeadStats();

  const filtered = leads?.filter((l) => filter === "all" || l.type === filter) ?? [];

  const statCards = [
    { label: "Total Leads",  value: stats?.total    ?? 0, icon: <TrendingUp size={20} />, color: "text-[#0F3D8F]",  bg: "bg-[#0F3D8F]/8" },
    { label: "Quote Requests", value: stats?.quotes ?? 0, icon: <Package size={20} />,    color: "text-blue-600",   bg: "bg-blue-50" },
    { label: "Contact Forms", value: stats?.contacts ?? 0, icon: <MessageSquare size={20} />, color: "text-green-600", bg: "bg-green-50" },
    { label: "Brochures",    value: stats?.brochures ?? 0, icon: <FileText size={20} />,  color: "text-purple-600", bg: "bg-purple-50" },
    { label: "Callbacks",    value: stats?.callbacks ?? 0, icon: <Phone size={20} />,     color: "text-orange-600", bg: "bg-orange-50" },
  ];

  return (
    <div className="min-h-screen bg-[#F5F7FA] font-['Inter',sans-serif]">
      {/* Header */}
      <div className="bg-[#0D1B2A] px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/logo-fabmacs.jpg" alt="FABMACS INNOVATION" className="h-9 w-auto object-contain" />
          <div>
            <h1 className="text-white font-bold text-base">Admin Dashboard</h1>
            <p className="text-[#BFC5CC] text-xs">Leads & Enquiries</p>
          </div>
        </div>
        <button
          onClick={() => refetch()}
          disabled={isFetching}
          className="flex items-center gap-2 px-4 py-2 bg-[#0F3D8F] hover:bg-[#2E7AF9] text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-60"
        >
          <RefreshCw size={15} className={isFetching ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stat Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {statCards.map((s) => (
            <div key={s.label} className="bg-white border border-[#BFC5CC]/40 rounded-2xl p-5">
              <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center mb-3 ${s.color}`}>
                {s.icon}
              </div>
              <div className={`text-3xl font-black ${s.color} mb-0.5`}>{s.value}</div>
              <div className="text-xs text-gray-500 font-medium">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 flex-wrap mb-5">
          {["all", "quote", "contact", "brochure", "callback"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-all ${
                filter === tab
                  ? "bg-[#0F3D8F] text-white border-[#0F3D8F]"
                  : "bg-white text-gray-600 border-[#BFC5CC]/60 hover:border-[#0F3D8F] hover:text-[#0F3D8F]"
              }`}
            >
              {tab === "all" ? "All Leads" : TYPE_LABELS[tab]?.label}
              {tab === "all" && leads && <span className="ml-1.5 text-xs opacity-70">({leads.length})</span>}
            </button>
          ))}
        </div>

        {/* Leads List */}
        {isLoading ? (
          <div className="flex items-center justify-center py-24 text-gray-400">
            <RefreshCw size={24} className="animate-spin mr-3" /> Loading leads...
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white border border-[#BFC5CC]/40 rounded-2xl p-16 text-center text-gray-400">
            <Users size={36} className="mx-auto mb-3 opacity-40" />
            <p className="font-medium">No leads yet</p>
            <p className="text-sm mt-1">Leads will appear here once forms are submitted.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((lead) => {
              const t = TYPE_LABELS[lead.type] ?? { label: lead.type, color: "text-gray-700", bg: "bg-gray-50 border-gray-200" };
              return (
                <div key={lead.id} className="bg-white border border-[#BFC5CC]/40 rounded-2xl p-5 hover:border-[#0F3D8F]/30 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    {/* Left */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2.5 mb-2 flex-wrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${t.bg} ${t.color}`}>
                          {t.label}
                        </span>
                        <span className="font-bold text-[#0D1B2A] text-base">{lead.name}</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-1.5 text-sm">
                        {lead.email && (
                          <div className="flex items-center gap-1.5 text-gray-600">
                            <Mail size={13} className="text-[#2E7AF9] shrink-0" />
                            <a href={`mailto:${lead.email}`} className="hover:text-[#0F3D8F] truncate">{lead.email}</a>
                          </div>
                        )}
                        {lead.phone && (
                          <div className="flex items-center gap-1.5 text-gray-600">
                            <Phone size={13} className="text-[#2E7AF9] shrink-0" />
                            <a href={`tel:${lead.phone}`} className="hover:text-[#0F3D8F]">{lead.phone}</a>
                          </div>
                        )}
                        {lead.company && (
                          <div className="flex items-center gap-1.5 text-gray-600">
                            <Building2 size={13} className="text-[#2E7AF9] shrink-0" />
                            <span className="truncate">{lead.company}</span>
                          </div>
                        )}
                        {lead.industry && (
                          <div className="flex items-center gap-1.5 text-gray-600">
                            <Tag size={13} className="text-[#2E7AF9] shrink-0" />
                            <span>{lead.industry}</span>
                          </div>
                        )}
                        {lead.product && (
                          <div className="flex items-center gap-1.5 text-gray-600">
                            <Package size={13} className="text-[#2E7AF9] shrink-0" />
                            <span className="truncate">{lead.product}</span>
                          </div>
                        )}
                      </div>

                      {lead.message && (
                        <div className="mt-3 p-3 bg-[#F5F7FA] rounded-lg border border-[#BFC5CC]/30 text-sm text-gray-600 leading-relaxed">
                          {lead.message}
                        </div>
                      )}
                    </div>

                    {/* Right — date */}
                    <div className="text-xs text-gray-400 shrink-0 sm:text-right">
                      {lead.createdAt ? formatDate(String(lead.createdAt)) : "—"}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
