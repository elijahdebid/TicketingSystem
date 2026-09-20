"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateTicketStatus(formData: FormData) {
  const ticketId = formData.get("ticketId") as string;
  const status = formData.get("status") as string;
  const technicianNotes = formData.get("technicianNotes") as string;

  if (!ticketId || !status) {
    return { success: false, error: "Missing required fields" };
  }

  try {
    const supabase = await createClient();
    
    // First, get the current ticket to see what changed
    const { data: currentTicket, error: fetchError } = await supabase
      .from("tickets")
      .select("status, technician_notes")
      .eq("id", ticketId)
      .single();

    if (fetchError) throw fetchError;

    // Build update payload
    const updates: any = {
      status,
      updated_at: new Date().toISOString(),
    };
    
    if (technicianNotes !== undefined) {
      updates.technician_notes = technicianNotes;
    }

    // Update ticket
    const { error: updateError } = await supabase
      .from("tickets")
      .update(updates)
      .eq("id", ticketId);

    if (updateError) throw updateError;

    // Log activities if changed
    if (currentTicket.status !== status) {
      await supabase.from("ticket_activities").insert({
        ticket_id: ticketId,
        action: "Status updated",
        old_value: currentTicket.status,
        new_value: status,
      });
    }

    if (currentTicket.technician_notes !== technicianNotes) {
      await supabase.from("ticket_activities").insert({
        ticket_id: ticketId,
        action: "Technician notes updated",
      });
    }

    revalidatePath(`/admin/tickets/${ticketId}`);
    revalidatePath("/admin/tickets");
    revalidatePath("/admin/dashboard");
    
    return { success: true };
  } catch (error) {
    console.error("Failed to update ticket:", error);
    return { success: false, error: "Failed to update ticket" };
  }
}
