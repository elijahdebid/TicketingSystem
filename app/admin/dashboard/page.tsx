import { createClient } from "@/lib/supabase/server";
import { Ticket, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { getStatusBadge, TicketStatus } from "@/lib/constants/tickets";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  // Fetch recent tickets
  const { data: recentTickets } = await supabase
    .from("tickets")
    .select(`
      id,
      ticket_number,
      subject,
      status,
      created_at,
      customers ( full_name )
    `)
    .order("created_at", { ascending: false })
    .limit(5);

  // Fetch stats (using separate queries for simplicity, though a grouped RPC would be more efficient)
  const { count: newCount } = await supabase.from("tickets").select("*", { count: "exact", head: true }).eq("status", "NEW");
  const { count: inProgressCount } = await supabase.from("tickets").select("*", { count: "exact", head: true }).eq("status", "IN_PROGRESS");
  const { count: waitingCount } = await supabase.from("tickets").select("*", { count: "exact", head: true }).eq("status", "WAITING_ON_CUSTOMER");
  const { count: resolvedCount } = await supabase.from("tickets").select("*", { count: "exact", head: true }).eq("status", "RESOLVED");

  const stats = [
    { name: "New Requests", value: newCount || 0, icon: AlertCircle, color: "text-red-600", bg: "bg-red-100" },
    { name: "In Progress", value: inProgressCount || 0, icon: Clock, color: "text-blue-600", bg: "bg-blue-100" },
    { name: "Waiting on Customer", value: waitingCount || 0, icon: Ticket, color: "text-amber-600", bg: "bg-amber-100" },
    { name: "Resolved (Total)", value: resolvedCount || 0, icon: CheckCircle2, color: "text-green-600", bg: "bg-green-100" },
  ];

  return (
    <div className="p-6 sm:p-8 lg:p-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-500 mt-1">Overview of your service requests and business performance.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex items-center">
            <div className={`p-4 rounded-xl ${stat.bg} mr-5`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 mb-1">{stat.name}</p>
              <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Tickets */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
          <h2 className="text-lg font-bold text-slate-900">Recent Service Requests</h2>
          <Link href="/admin/tickets" className="text-sm font-medium text-blue-600 hover:text-blue-700">
            View all
          </Link>
        </div>
        
        {recentTickets && recentTickets.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Ticket</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Customer</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Subject</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {recentTickets.map((ticket) => (
                  <tr key={ticket.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-mono font-medium text-slate-900">{ticket.ticket_number}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-slate-700">{ticket.customers?.full_name}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-slate-900 font-medium line-clamp-1">{ticket.subject}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2.5 py-1 text-xs font-bold rounded-full border ${getStatusBadge(ticket.status as TicketStatus)}`}>
                        {ticket.status.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      {new Date(ticket.created_at || "").toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link href={`/admin/tickets/${ticket.id}`} className="text-blue-600 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors">
                        Manage
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center text-slate-500">
            No service requests found.
          </div>
        )}
      </div>
    </div>
  );
}
