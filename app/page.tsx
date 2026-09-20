import Link from "next/link";
import { technicianConfig } from "@/lib/config/technician";
import { SERVICE_CATEGORIES } from "@/lib/constants/tickets";
import { ArrowRight, CheckCircle2, Monitor, Network, Printer, Wrench, ShieldCheck, Clock, Award } from "lucide-react";

export default function Home() {
  const getCategoryIcon = (label: string) => {
    switch (label) {
      case "Computer & Laptop": return <Monitor className="w-8 h-8 text-blue-600 mb-4" />;
      case "Networking": return <Network className="w-8 h-8 text-blue-600 mb-4" />;
      case "Printer & Peripherals": return <Printer className="w-8 h-8 text-blue-600 mb-4" />;
      case "IT Support": return <Wrench className="w-8 h-8 text-blue-600 mb-4" />;
      default: return <CheckCircle2 className="w-8 h-8 text-blue-600 mb-4" />;
    }
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
              Computer & IT Services
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-10">
              Reliable Technology Support for Home, Office & Small Business
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/request" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors shadow-lg shadow-blue-200 flex items-center justify-center gap-2">
                REQUEST A SERVICE <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/track" className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-8 py-4 rounded-xl font-bold text-lg transition-colors flex items-center justify-center gap-2">
                Track Existing Ticket
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-slate-50 py-12 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4 p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
              <div className="bg-green-100 p-3 rounded-full">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Prompt Service</h3>
                <p className="text-sm text-slate-500">Fast response to your IT problems</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
              <div className="bg-blue-100 p-3 rounded-full">
                <ShieldCheck className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Transparent Updates</h3>
                <p className="text-sm text-slate-500">Know the status of your repair</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
              <div className="bg-purple-100 p-3 rounded-full">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Local Expertise</h3>
                <p className="text-sm text-slate-500">Professional {technicianConfig.title}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-lg text-gray-600">Comprehensive IT solutions for all your technical needs.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICE_CATEGORIES.map((category) => (
              <div key={category.id} className="bg-slate-50 border border-slate-200 rounded-3xl p-8 hover:shadow-md transition-shadow">
                {getCategoryIcon(category.label)}
                <h3 className="text-xl font-bold text-gray-900 mb-4">{category.label}</h3>
                <ul className="space-y-3">
                  {category.services.map((service, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">{service}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-blue-600 py-20 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Need help with your devices or network?</h2>
          <p className="text-blue-100 text-lg mb-10">
            Submit a service request online and I will get back to you as soon as possible.
          </p>
          <Link href="/request" className="bg-white text-blue-600 hover:bg-slate-50 px-8 py-4 rounded-xl font-bold text-lg transition-colors inline-flex items-center gap-2 shadow-lg">
            Start a Service Request <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
