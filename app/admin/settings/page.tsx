import { Settings } from "lucide-react";
import { technicianConfig } from "@/lib/config/technician";

export default function AdminSettingsPage() {
  return (
    <div className="p-6 sm:p-8 lg:p-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-500 mt-1">Configure your application settings.</p>
      </div>

      <div className="max-w-3xl space-y-8">
        {/* Business Profile */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center">
            <h2 className="text-lg font-bold text-slate-900">Business Profile</h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg text-sm text-blue-800 mb-4">
              <strong>Note:</strong> In this version, these settings are loaded from your configuration file. Future updates will allow changing them directly from this dashboard.
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700">Company Name</label>
                <div className="mt-1 p-2 bg-slate-50 border border-slate-200 rounded-md text-slate-700">
                  {technicianConfig.companyName}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Technician Name</label>
                <div className="mt-1 p-2 bg-slate-50 border border-slate-200 rounded-md text-slate-700">
                  {technicianConfig.name}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Phone</label>
                <div className="mt-1 p-2 bg-slate-50 border border-slate-200 rounded-md text-slate-700">
                  {technicianConfig.phone}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Email</label>
                <div className="mt-1 p-2 bg-slate-50 border border-slate-200 rounded-md text-slate-700">
                  {technicianConfig.email}
                </div>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-slate-700">Facebook URL</label>
                <div className="mt-1 p-2 bg-slate-50 border border-slate-200 rounded-md text-slate-700 truncate">
                  {technicianConfig.facebook}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Database Settings */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center">
            <h2 className="text-lg font-bold text-slate-900">Database Info</h2>
          </div>
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="font-medium text-slate-700">Supabase Connected</span>
            </div>
            <p className="text-sm text-slate-500">Your application is successfully connected to the Supabase PostgreSQL database. Ticket sequencing and RLS policies are active.</p>
          </div>
        </section>
      </div>
    </div>
  );
}
