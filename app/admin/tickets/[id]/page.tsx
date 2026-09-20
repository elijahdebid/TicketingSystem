import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, User, Ticket, Calendar, Monitor, History } from "lucide-react";
import TicketManagementForm from "@/components/tickets/TicketManagementForm";
import { getStatusBadge, TicketStatus } from "@/lib/constants/tickets";

export const dynamic = "force-dynamic";

export default async function AdminTicketDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: ticket, error } = await supabase
    .from("tickets")
    .select(`
      *,
      customers (*),
      ticket_activities (*)
    `)
    .eq("id", id)
    .single();

  if (error || !ticket) {
    notFound();
  }

  // Sort activities newest first
  const activities = (ticket.ticket_activities || []).sort(
    (a: any, b: any) => new Date(b.created_at || "").getTime() - new Date(a.created_at || "").getTime()
  );

  return (
    <div className="p-6 sm:p-8 lg:p-10 max-w-7xl mx-auto">
      <div className="mb-6">
        <Link href="/admin/tickets" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Tickets
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl font-bold text-slate-900 font-mono tracking-tight">{ticket.ticket_number}</h1>
            <span className={`px-3 py-1 text-sm font-bold rounded-full border ${getStatusBadge(ticket.status as TicketStatus)}`}>
              {ticket.status.replace(/_/g, ' ')}
            </span>
          </div>
          <p className="text-xl text-slate-700 font-medium">{ticket.subject}</p>
        </div>
        <div className="text-sm text-slate-500 text-right">
          <p>Created: {new Date(ticket.created_at || "").toLocaleString()}</p>
          <p>Last Updated: {new Date(ticket.updated_at || "").toLocaleString()}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Details */}
        <div className="lg:col-span-2 space-y-8">
          {/* Description Section */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center">
              <Ticket className="w-5 h-5 text-slate-400 mr-2" />
              <h2 className="text-lg font-bold text-slate-900">Request Details</h2>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Description</h3>
                <p className="text-slate-800 whitespace-pre-wrap">{ticket.description}</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                <div>
                  <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Category</h3>
                  <p className="text-slate-900">{ticket.category}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Service Type</h3>
                  <p className="text-slate-900">{ticket.service_type}</p>
                </div>
                {ticket.location && (
                  <div>
                    <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Location</h3>
                    <p className="text-slate-900">{ticket.location}</p>
                  </div>
                )}
                {ticket.preferred_service_date && (
                  <div>
                    <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Preferred Date</h3>
                    <p className="text-slate-900">{new Date(ticket.preferred_service_date || "").toLocaleDateString()}</p>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Device Section */}
          {(ticket.device_type || ticket.device_brand || ticket.device_model || ticket.serial_number) && (
            <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center">
                <Monitor className="w-5 h-5 text-slate-400 mr-2" />
                <h2 className="text-lg font-bold text-slate-900">Device Information</h2>
              </div>
              <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                {ticket.device_type && (
                  <div>
                    <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Type</h3>
                    <p className="text-slate-900">{ticket.device_type}</p>
                  </div>
                )}
                {ticket.device_brand && (
                  <div>
                    <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Brand</h3>
                    <p className="text-slate-900">{ticket.device_brand}</p>
                  </div>
                )}
                {ticket.device_model && (
                  <div>
                    <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Model</h3>
                    <p className="text-slate-900">{ticket.device_model}</p>
                  </div>
                )}
                {ticket.serial_number && (
                  <div>
                    <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Serial Number</h3>
                    <p className="text-slate-900 font-mono text-sm bg-slate-100 inline-block px-2 py-1 rounded">{ticket.serial_number}</p>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Activity History */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center">
              <History className="w-5 h-5 text-slate-400 mr-2" />
              <h2 className="text-lg font-bold text-slate-900">Activity Log</h2>
            </div>
            <div className="p-6">
              {activities.length > 0 ? (
                <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-slate-200">
                  {activities.map((activity: any, index: number) => (
                    <div key={activity.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-200 text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                        <div className="w-2 h-2 bg-slate-500 rounded-full"></div>
                      </div>
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-slate-50 p-4 rounded-xl border border-slate-200 shadow-sm">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-bold text-slate-900 text-sm">{activity.action}</h4>
                          <time className="text-xs font-medium text-slate-500">{new Date(activity.created_at || "").toLocaleString()}</time>
                        </div>
                        {(activity.old_value || activity.new_value) && (
                          <div className="text-sm text-slate-600 mt-2 flex items-center gap-2">
                            {activity.old_value && (
                              <span className="line-through opacity-70">{activity.old_value.replace(/_/g, ' ')}</span>
                            )}
                            {activity.old_value && activity.new_value && <span>→</span>}
                            {activity.new_value && (
                              <span className="font-semibold">{activity.new_value.replace(/_/g, ' ')}</span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500 text-center">No activity recorded yet.</p>
              )}
            </div>
          </section>
        </div>

        {/* Right Column - Management & Customer Info */}
        <div className="space-y-8">
          {/* Management Actions */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden sticky top-6">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
              <h2 className="text-lg font-bold text-slate-900">Manage Ticket</h2>
            </div>
            <div className="p-6">
              <TicketManagementForm 
                ticketId={ticket.id} 
                initialStatus={ticket.status} 
                initialNotes={ticket.technician_notes} 
              />
            </div>
          </section>

          {/* Customer Info */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center">
              <User className="w-5 h-5 text-slate-400 mr-2" />
              <h2 className="text-lg font-bold text-slate-900">Customer Details</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Full Name</p>
                <p className="text-slate-900 font-medium">{ticket.customers.full_name}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Phone</p>
                <p className="text-slate-900">
                  <a href={`tel:${ticket.customers.phone}`} className="text-blue-600 hover:underline">
                    {ticket.customers.phone}
                  </a>
                </p>
              </div>
              {ticket.customers.email && (
                <div>
                  <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Email</p>
                  <p className="text-slate-900">
                    <a href={`mailto:${ticket.customers.email}`} className="text-blue-600 hover:underline">
                      {ticket.customers.email}
                    </a>
                  </p>
                </div>
              )}
              <div>
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Pref. Contact Method</p>
                <p className="text-slate-900 inline-flex items-center px-2.5 py-0.5 rounded-md bg-slate-100 text-sm font-medium">
                  {ticket.customers.preferred_contact_method}
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
