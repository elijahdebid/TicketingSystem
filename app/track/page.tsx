"use client";

import { useState, useTransition } from "react";
import { Search, Loader2, Ticket, Calendar, Clock, MessageSquare } from "lucide-react";
import { lookupTicket } from "@/app/track/actions";
import { getStatusBadge, TicketStatus } from "@/lib/constants/tickets";

type TicketResult = {
  ticketNumber: string;
  subject: string;
  description: string;
  status: string;
  createdAt: string | null;
  updatedAt: string | null;
  technicianNotes: string | null;
} | null;

export default function TrackTicketPage() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [ticket, setTicket] = useState<TicketResult>(null);

  async function handleSearch(formData: FormData) {
    setError(null);
    setTicket(null);
    
    startTransition(async () => {
      const result = await lookupTicket(formData);
      if (result.success && result.ticket) {
        setTicket(result.ticket);
      } else {
        setError(result.error || "Failed to look up ticket.");
      }
    });
  }

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-4">
            <Search className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
            Track Your Ticket
          </h1>
          <p className="mt-4 text-xl text-slate-500">
            Enter your ticket number and mobile number to see the status of your request.
          </p>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200 mb-8">
          <form action={handleSearch} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
                {error}
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label htmlFor="ticketNumber" className="block text-sm font-medium text-slate-700">Ticket Number <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  id="ticketNumber" 
                  name="ticketNumber" 
                  required 
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all uppercase" 
                  placeholder="IT-2026-000001" 
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="phone" className="block text-sm font-medium text-slate-700">Mobile Number <span className="text-red-500">*</span></label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  required 
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
                  placeholder="09xxxxxxxxx" 
                />
              </div>
            </div>
            
            <button 
              type="submit" 
              disabled={isPending}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold text-lg transition-colors shadow-md disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6"
            >
              {isPending && <Loader2 className="w-5 h-5 animate-spin" />}
              {isPending ? "Searching..." : "Track Status"}
            </button>
          </form>
        </div>

        {ticket && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-100 pb-4 mb-4 gap-4">
              <div className="flex items-center gap-3">
                <Ticket className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-slate-900 font-mono">{ticket.ticketNumber}</h2>
              </div>
              <span className={`px-4 py-1.5 rounded-full text-sm font-bold border ${getStatusBadge(ticket.status as TicketStatus)}`}>
                {ticket.status.replace(/_/g, ' ')}
              </span>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900">{ticket.subject}</h3>
                <p className="text-slate-600 mt-2">{ticket.description}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-slate-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Submitted</p>
                    <p className="text-slate-700">{new Date(ticket.createdAt!).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-slate-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Last Updated</p>
                    <p className="text-slate-700">{new Date(ticket.updatedAt!).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              {ticket.technicianNotes && (
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <MessageSquare className="w-12 h-12" />
                  </div>
                  <h4 className="text-sm font-bold text-blue-900 mb-2 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" /> Message from Technician
                  </h4>
                  <p className="text-blue-800 relative z-10">{ticket.technicianNotes}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
