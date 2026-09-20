import Link from "next/link";
import { technicianConfig } from "@/lib/config/technician";
import { Wrench, Menu, Lock } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Wrench className="h-5 w-5 text-white" />
              </div>
              <div>
                <span className="block font-bold text-gray-900 leading-tight">
                  {technicianConfig.companyName}
                </span>
                <span className="block text-xs text-gray-500">
                  IT Support & Services
                </span>
              </div>
            </Link>
          </div>
          <div className="hidden sm:flex sm:items-center sm:space-x-6">
            <Link href="/" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
              Home
            </Link>
            <Link href="/request" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
              Services
            </Link>
            <Link href="/track" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
              Track Ticket
            </Link>
            <Link href="/request" className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm">
              Request Service
            </Link>
            <Link 
              href="/admin/dashboard" 
              className="text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-slate-100 px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Lock className="w-3.5 h-3.5 text-slate-500" />
              Admin Portal
            </Link>
          </div>
          <div className="flex items-center gap-2 sm:hidden">
            <Link 
              href="/admin/dashboard" 
              className="text-slate-600 border border-slate-200 bg-slate-50 p-2 rounded-md text-xs font-semibold flex items-center"
              title="Admin Portal"
            >
              <Lock className="w-4 h-4 text-slate-600" />
            </Link>
            <button type="button" className="text-gray-500 hover:text-gray-700 p-2">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
