import Link from "next/link";
import { CheckCircle2, Ticket, Phone, Mail } from "lucide-react";
import { technicianConfig } from "@/lib/config/technician";

export default async function ConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ ticket?: string }>;
}) {
  const { ticket } = await searchParams;

  if (!ticket) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold text-slate-800">Invalid Request</h1>
        <p className="mt-2 text-slate-500">No ticket number was provided.</p>
        <Link href="/request" className="mt-4 text-blue-600 hover:underline">
          Return to request form
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-16 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden">
        <div className="bg-green-500 p-8 text-center">
          <CheckCircle2 className="w-16 h-16 text-white mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-white">Request Received</h1>
          <p className="text-green-100 mt-2 text-lg">Your service request has been successfully submitted.</p>
        </div>
        
        <div className="p-8">
          <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 mb-8 text-center">
            <p className="text-slate-500 text-sm font-semibold uppercase tracking-wider mb-2">Your Ticket Number</p>
            <div className="flex items-center justify-center gap-3">
              <Ticket className="w-6 h-6 text-blue-600" />
              <span className="text-3xl font-mono font-bold text-slate-900">{ticket}</span>
            </div>
            <p className="text-sm text-slate-500 mt-4">
              Please keep this ticket number for reference. We will review your request and contact you using your preferred contact method.
            </p>
          </div>

          <div className="border-t border-slate-100 pt-8 mb-8">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Technician Contact</h3>
            <div className="flex items-center gap-4 mb-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Phone className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-slate-900">{technicianConfig.name}</p>
                <p className="text-slate-500">{technicianConfig.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Mail className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-slate-900">Email</p>
                <p className="text-slate-500">{technicianConfig.email}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/" className="flex-1 text-center bg-slate-100 hover:bg-slate-200 text-slate-800 px-6 py-3 rounded-xl font-bold transition-colors">
              Return Home
            </Link>
            <Link href="/request" className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-colors shadow-md">
              Submit Another Request
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
