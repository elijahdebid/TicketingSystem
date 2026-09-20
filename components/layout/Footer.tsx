import { technicianConfig } from "@/lib/config/technician";
import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-white text-lg font-bold mb-4">{technicianConfig.companyName}</h3>
          <p className="text-sm text-slate-400 mb-4">{technicianConfig.description}</p>
          <div className="space-y-2">
            <a href={`tel:${technicianConfig.phone}`} className="flex items-center gap-2 hover:text-white transition-colors">
              <Phone className="w-4 h-4" />
              <span>{technicianConfig.phone}</span>
            </a>
            <a href={`mailto:${technicianConfig.email}`} className="flex items-center gap-2 hover:text-white transition-colors">
              <Mail className="w-4 h-4" />
              <span>{technicianConfig.email}</span>
            </a>
            <a href={technicianConfig.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
              <span className="font-semibold px-1 text-xs border border-slate-500 rounded text-slate-400">FB</span>
              <span>Facebook Page</span>
            </a>
          </div>
        </div>
        
        <div>
          <h3 className="text-white text-lg font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link href="/request" className="hover:text-white transition-colors">Request Service</Link></li>
            <li><Link href="/track" className="hover:text-white transition-colors">Track Ticket</Link></li>
            <li><Link href="/admin/login" className="hover:text-white transition-colors">Admin Login</Link></li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-white text-lg font-bold mb-4">Service Hours</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex justify-between"><span>Mon - Fri:</span> <span>9:00 AM - 6:00 PM</span></li>
            <li className="flex justify-between"><span>Saturday:</span> <span>10:00 AM - 4:00 PM</span></li>
            <li className="flex justify-between text-slate-500"><span>Sunday:</span> <span>Closed (Emergencies only)</span></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
        <p>&copy; {currentYear} {technicianConfig.companyName}. All rights reserved.</p>
        <p className="mt-1">Managed by {technicianConfig.name} - {technicianConfig.title}</p>
      </div>
    </footer>
  );
}
