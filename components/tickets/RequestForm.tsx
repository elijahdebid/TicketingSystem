"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { SERVICE_CATEGORIES } from "@/lib/constants/tickets";
import { submitServiceRequest } from "@/app/request/actions";
import { Loader2 } from "lucide-react";

export default function RequestForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  
  const [selectedCategory, setSelectedCategory] = useState<string>(SERVICE_CATEGORIES[0].id);

  const activeCategory = SERVICE_CATEGORIES.find(c => c.id === selectedCategory) || SERVICE_CATEGORIES[0];

  async function handleSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const result = await submitServiceRequest(formData);
      if (result.success && result.ticketNumber) {
        router.push(`/request/confirmation?ticket=${result.ticketNumber}`);
      } else {
        setError(result.error || "Submission failed");
      }
    });
  }

  return (
    <form action={handleSubmit} className="space-y-8 bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
          {error}
        </div>
      )}

      {/* Customer Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-900 border-b pb-2">1. Customer Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label htmlFor="fullName" className="block text-sm font-medium text-slate-700">Full Name <span className="text-red-500">*</span></label>
            <input type="text" id="fullName" name="fullName" required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="Juan Dela Cruz" />
          </div>
          <div className="space-y-1">
            <label htmlFor="phone" className="block text-sm font-medium text-slate-700">Mobile Number <span className="text-red-500">*</span></label>
            <input type="tel" id="phone" name="phone" required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="09xxxxxxxxx" />
          </div>
          <div className="space-y-1">
            <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email Address <span className="text-slate-400 text-xs font-normal">(Optional)</span></label>
            <input type="email" id="email" name="email" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="juan@example.com" />
          </div>
          <div className="space-y-1">
            <label htmlFor="preferredContactMethod" className="block text-sm font-medium text-slate-700">Preferred Contact Method <span className="text-red-500">*</span></label>
            <select id="preferredContactMethod" name="preferredContactMethod" required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white">
              <option value="Phone">Phone Call</option>
              <option value="SMS">SMS / Text</option>
              <option value="Facebook Messenger">Facebook Messenger</option>
              <option value="Email">Email</option>
            </select>
          </div>
        </div>
      </div>

      {/* Service Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-900 border-b pb-2">2. Service Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label htmlFor="category" className="block text-sm font-medium text-slate-700">Service Category <span className="text-red-500">*</span></label>
            <select 
              id="category" 
              name="category" 
              required 
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {SERVICE_CATEGORIES.map(c => (
                <option key={c.id} value={c.id}>{c.label}</option>
              ))}
            </select>
          </div>
          <div className="space-y-1">
            <label htmlFor="serviceType" className="block text-sm font-medium text-slate-700">Service Type <span className="text-red-500">*</span></label>
            <select id="serviceType" name="serviceType" required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white">
              {activeCategory.services.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Request Details */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-900 border-b pb-2">3. Request Details</h3>
        <div className="space-y-4">
          <div className="space-y-1">
            <label htmlFor="subject" className="block text-sm font-medium text-slate-700">Subject / Short Summary <span className="text-red-500">*</span></label>
            <input type="text" id="subject" name="subject" required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="e.g. Laptop not turning on" />
          </div>
          <div className="space-y-1">
            <label htmlFor="description" className="block text-sm font-medium text-slate-700">Detailed Description <span className="text-red-500">*</span></label>
            <textarea id="description" name="description" required rows={4} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="Please describe what is happening, what you have already tried, and when the problem started."></textarea>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-2">
          <div className="space-y-1">
            <label htmlFor="deviceType" className="block text-sm font-medium text-slate-700">Device Type <span className="text-slate-400 text-xs font-normal">(Optional)</span></label>
            <input type="text" id="deviceType" name="deviceType" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="Laptop, Desktop, Router..." />
          </div>
          <div className="space-y-1">
            <label htmlFor="deviceBrand" className="block text-sm font-medium text-slate-700">Brand <span className="text-slate-400 text-xs font-normal">(Optional)</span></label>
            <input type="text" id="deviceBrand" name="deviceBrand" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="Dell, Asus, HP..." />
          </div>
          <div className="space-y-1">
            <label htmlFor="deviceModel" className="block text-sm font-medium text-slate-700">Model <span className="text-slate-400 text-xs font-normal">(Optional)</span></label>
            <input type="text" id="deviceModel" name="deviceModel" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="Inspiron, TUF..." />
          </div>
          <div className="space-y-1">
            <label htmlFor="serialNumber" className="block text-sm font-medium text-slate-700">Serial Number <span className="text-slate-400 text-xs font-normal">(Optional)</span></label>
            <input type="text" id="serialNumber" name="serialNumber" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="S/N..." />
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="space-y-1">
            <label htmlFor="location" className="block text-sm font-medium text-slate-700">Location / Area <span className="text-slate-400 text-xs font-normal">(Optional)</span></label>
            <input type="text" id="location" name="location" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="City or area for on-site service" />
          </div>
          <div className="space-y-1">
            <label htmlFor="preferredServiceDate" className="block text-sm font-medium text-slate-700">Preferred Date <span className="text-slate-400 text-xs font-normal">(Optional)</span></label>
            <input type="date" id="preferredServiceDate" name="preferredServiceDate" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
          </div>
        </div>
      </div>

      <div className="pt-6 border-t">
        <button 
          type="submit" 
          disabled={isPending}
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold text-lg transition-colors shadow-md disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isPending && <Loader2 className="w-5 h-5 animate-spin" />}
          {isPending ? "Submitting..." : "Submit Service Request"}
        </button>
        <p className="mt-3 text-sm text-slate-500">By submitting this request, you agree to be contacted via your preferred method regarding your service.</p>
      </div>
    </form>
  );
}
