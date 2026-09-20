"use server";

import { createClient } from "@/lib/supabase/server";

export async function lookupTicket(formData: FormData) {
  const ticketNumber = formData.get("ticketNumber") as string;
  const phone = formData.get("phone") as string;

  if (!ticketNumber || !phone) {
    return { success: false, error: "Please provide both Ticket Number and Mobile Number." };
  }

  try {
    const supabase = await createClient();

    // Query ticket with associated customer matching the phone number
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
        customers!inner ( phone )
      `)
      .eq("ticket_number", ticketNumber.trim().toUpperCase())
      .eq("customers.phone", phone.trim())
      .single();

    if (error || !ticket) {
      return { success: false, error: "No matching ticket found with that mobile number." };
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
