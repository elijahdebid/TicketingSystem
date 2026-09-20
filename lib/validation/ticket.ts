import { z } from "zod";

export const CreateTicketSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  phone: z.string().min(7, "Valid phone number is required"),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  preferredContactMethod: z.enum(["Phone", "SMS", "Facebook Messenger", "Email"]),
  
  category: z.string().min(1, "Category is required"),
  serviceType: z.string().min(1, "Service type is required"),
  
  subject: z.string().min(5, "Subject is required"),
  description: z.string().min(10, "Please provide more details about the problem"),
  
  deviceType: z.string().optional(),
  deviceBrand: z.string().optional(),
  deviceModel: z.string().optional(),
  serialNumber: z.string().optional(),
  
  location: z.string().optional(),
  preferredServiceDate: z.string().optional(),
});

export type CreateTicketInput = z.infer<typeof CreateTicketSchema>;

export const UpdateTicketStatusSchema = z.object({
  status: z.enum([
    "NEW",
    "CONTACTED",
    "SCHEDULED",
    "IN_PROGRESS",
    "WAITING_FOR_CUSTOMER",
    "WAITING_FOR_PARTS",
    "COMPLETED",
    "CANCELLED",
  ]),
});

export const UpdateTicketPrioritySchema = z.object({
  priority: z.enum(["LOW", "NORMAL", "HIGH", "URGENT"]),
});

export const TechnicianNotesSchema = z.object({
  diagnosis: z.string().optional(),
  workPerformed: z.string().optional(),
  recommendation: z.string().optional(),
  technicianNotes: z.string().optional(),
  internalNotes: z.string().optional(),
});

export const CostSchema = z.object({
  estimatedCost: z.number().nonnegative().optional().nullable(),
  actualCost: z.number().nonnegative().optional().nullable(),
});
