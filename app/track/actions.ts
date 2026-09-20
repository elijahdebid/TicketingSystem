"use server";

import { createAdminClient } from "@/lib/supabase/admin";

export async function lookupTicket(formData: FormData) {
  const ticketNumber = formData.get("ticketNumber") as string;
  const phone = formData.get("phone") as string;

  if (!ticketNumber || !phone) {
    return { success: false, error: "Please provide both Ticket Number and Mobile Number." };
  }

  try {
    const supabase = createAdminClient();

    const cleanTicketNumber = ticketNumber.trim().toUpperCase();
    const cleanInputPhone = phone.trim().replace(/[\s\-\(\)\+]/g, "");

    // Query ticket with associated customer
    const { data: ticket, error } = await supabase
      .from("tickets")
      .select(`
        ticket_number,
        subject,
        description,
        status,
        created_at,
        updated_at,
        technician_notes,
        customers ( phone )
      `)
      .eq("ticket_number", cleanTicketNumber)
      .maybeSingle();

    if (error || !ticket) {
      return { success: false, error: "No ticket found with that ticket number." };
    }

    const customerPhone = (ticket.customers as any)?.phone || "";
    const cleanCustomerPhone = customerPhone.replace(/[\s\-\(\)\+]/g, "");

    // Compare phones (exact match or last 10 digits match)
    const matchesPhone = 
      cleanCustomerPhone === cleanInputPhone ||
      (cleanCustomerPhone.length >= 10 && 
       cleanInputPhone.length >= 10 && 
       cleanCustomerPhone.slice(-10) === cleanInputPhone.slice(-10));

    if (!matchesPhone) {
      return { success: false, error: "The mobile number does not match our records for this ticket." };
    }

    return { 
      success: true, 
      ticket: {
        ticketNumber: ticket.ticket_number,
        subject: ticket.subject,
        description: ticket.description,
        status: ticket.status,
        createdAt: ticket.created_at,
        updatedAt: ticket.updated_at,
        technicianNotes: ticket.technician_notes,
      }
    };
  } catch (err) {
    console.error("Lookup error:", err);
    return { success: false, error: "An error occurred while looking up the ticket." };
  }
}
