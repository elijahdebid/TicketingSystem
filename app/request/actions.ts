"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { CreateTicketSchema } from "@/lib/validation/ticket";
import { z } from "zod";
import { redirect } from "next/navigation";

export async function submitServiceRequest(formData: FormData) {
  const data = {
    fullName: formData.get("fullName"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    preferredContactMethod: formData.get("preferredContactMethod"),
    category: formData.get("category"),
    serviceType: formData.get("serviceType"),
    subject: formData.get("subject"),
    description: formData.get("description"),
    deviceType: formData.get("deviceType"),
    deviceBrand: formData.get("deviceBrand"),
    deviceModel: formData.get("deviceModel"),
    serialNumber: formData.get("serialNumber"),
    location: formData.get("location"),
    preferredServiceDate: formData.get("preferredServiceDate"),
  };

  try {
    const parsed = CreateTicketSchema.parse(data);

    // Use admin client (service role) to insert, because public users shouldn't have unrestricted insert access via RLS without a secure server action wrapper.
    const supabase = createAdminClient();

    // 1. Find or create customer (Upsert based on phone number, or simple insert)
    let customerId: string;
    
    // Check if customer exists by phone
    const { data: existingCustomer } = await supabase
      .from("customers")
      .select("id")
      .eq("phone", parsed.phone)
      .limit(1)
      .single();

    if (existingCustomer) {
      customerId = existingCustomer.id;
      // Optionally update name/email
      await supabase
        .from("customers")
        .update({
          full_name: parsed.fullName,
          email: parsed.email || null,
          preferred_contact_method: parsed.preferredContactMethod,
        })
        .eq("id", customerId);
    } else {
      const { data: newCustomer, error: customerError } = await supabase
        .from("customers")
        .insert({
          full_name: parsed.fullName,
          phone: parsed.phone,
          email: parsed.email || null,
          preferred_contact_method: parsed.preferredContactMethod,
        })
        .select("id")
        .single();

      if (customerError) throw customerError;
      customerId = newCustomer.id;
    }

    // 2. Create the ticket
    // generate_ticket_number() runs automatically via database default!
    const { data: newTicket, error: ticketError } = await supabase
      .from("tickets")
      .insert({
        customer_id: customerId,
        category: parsed.category,
        service_type: parsed.serviceType,
        subject: parsed.subject,
        description: parsed.description,
        device_type: parsed.deviceType || null,
        device_brand: parsed.deviceBrand || null,
        device_model: parsed.deviceModel || null,
        serial_number: parsed.serialNumber || null,
        location: parsed.location || null,
        preferred_service_date: parsed.preferredServiceDate ? new Date(parsed.preferredServiceDate).toISOString() : null,
      })
      .select("ticket_number")
      .single();

    if (ticketError) throw ticketError;

    // 3. Activity logging is handled by DB triggers, or we can manually insert the first log:
    await supabase.from("ticket_activities").insert({
      ticket_id: (await supabase.from("tickets").select("id").eq("ticket_number", newTicket.ticket_number).single()).data!.id,
      action: "Ticket created",
      new_value: "NEW"
    });

    return { success: true, ticketNumber: newTicket.ticket_number };
  } catch (error) {
    console.error("Submission error:", error);
    if (error instanceof z.ZodError) {
      return { success: false, error: (error as any).errors[0].message };
    }
    return { success: false, error: "An unexpected error occurred while submitting your request. Please try again." };
  }
}
