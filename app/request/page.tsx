import RequestForm from "@/components/tickets/RequestForm";
import { technicianConfig } from "@/lib/config/technician";
import { Wrench } from "lucide-react";

export default function RequestServicePage() {
  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-4">
            <Wrench className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
            Request IT Service
          </h1>
          <p className="mt-4 max-w-2xl text-xl text-slate-500 mx-auto">
            Please fill out the form below. {technicianConfig.name} will review your request and contact you as soon as possible.
          </p>
        </div>
        
        <RequestForm />
      </div>
    </div>
  );
}
