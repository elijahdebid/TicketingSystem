"use client";

import { useState, useTransition } from "react";
import { updateTicketStatus } from "@/app/admin/tickets/[id]/actions";
import { Loader2, Save } from "lucide-react";
import { TICKET_STATUSES, TicketStatus } from "@/lib/constants/tickets";

interface TicketManagementFormProps {
  ticketId: string;
  initialStatus: string;
  initialNotes: string | null;
}

export default function TicketManagementForm({ ticketId, initialStatus, initialNotes }: TicketManagementFormProps) {
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState(initialStatus);
  const [notes, setNotes] = useState(initialNotes || "");
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  async function handleSubmit(formData: FormData) {
    setMessage(null);
    startTransition(async () => {
      const result = await updateTicketStatus(formData);
      if (result.success) {
        setMessage({ type: 'success', text: 'Ticket updated successfully.' });
        // Clear message after 3 seconds
        setTimeout(() => setMessage(null), 3000);
      } else {
        setMessage({ type: 'error', text: result.error || 'Failed to update ticket.' });
      }
    });
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      <input type="hidden" name="ticketId" value={ticketId} />
      
      {message && (
        <div className={`px-4 py-3 rounded-lg text-sm ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
          {message.text}
        </div>
      )}

      <div>
        <label htmlFor="status" className="block text-sm font-medium text-slate-700 mb-1">
          Status
        </label>
        <select
          id="status"
          name="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="block w-full rounded-lg border-slate-300 border px-3 py-2 bg-white focus:border-blue-500 focus:ring-blue-500 sm:text-sm outline-none transition-all"
        >
          {Object.entries(TICKET_STATUSES).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="technicianNotes" className="block text-sm font-medium text-slate-700 mb-1">
          Technician Notes (Visible to Customer)
        </label>
        <textarea
          id="technicianNotes"
          name="technicianNotes"
          rows={4}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="block w-full rounded-lg border-slate-300 border px-3 py-2 bg-white focus:border-blue-500 focus:ring-blue-500 sm:text-sm outline-none transition-all placeholder-slate-400"
          placeholder="Add notes, diagnosis, or updates for the customer here..."
        />
        <p className="mt-1 text-xs text-slate-500">
          These notes will be displayed to the customer when they track their ticket.
        </p>
      </div>

      <div className="pt-4 border-t border-slate-200 flex justify-end">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex justify-center rounded-lg border border-transparent bg-blue-600 py-2 px-4 text-sm font-bold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-70 disabled:cursor-not-allowed items-center gap-2"
        >
          {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {isPending ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
