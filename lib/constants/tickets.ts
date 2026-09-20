export const TICKET_STATUSES = [
  "NEW",
  "CONTACTED",
  "SCHEDULED",
  "IN_PROGRESS",
  "WAITING_FOR_CUSTOMER",
  "WAITING_FOR_PARTS",
  "COMPLETED",
  "CANCELLED",
] as const;

export type TicketStatus = (typeof TICKET_STATUSES)[number];

export const TICKET_PRIORITIES = ["LOW", "NORMAL", "HIGH", "URGENT"] as const;

export type TicketPriority = (typeof TICKET_PRIORITIES)[number];

export const SERVICE_CATEGORIES = [
  {
    id: "Computer & Laptop",
    label: "Computer & Laptop",
    services: [
      "Diagnostics & Troubleshooting",
      "Windows Installation & Setup",
      "Software Installation",
      "Hardware Upgrades",
      "PC Assembly",
      "Computer Maintenance",
    ],
  },
  {
    id: "Networking",
    label: "Networking",
    services: [
      "Wi-Fi Setup",
      "LAN Setup",
      "Router Configuration",
      "Network Troubleshooting",
      "Network Printer Setup",
      "Small Office Network Setup",
    ],
  },
  {
    id: "Printer & Peripherals",
    label: "Printer & Peripherals",
    services: [
      "Printer Installation",
      "Printer Configuration",
      "Printer Troubleshooting",
      "Peripheral Setup",
    ],
  },
  {
    id: "IT Support",
    label: "IT Support",
    services: [
      "Home & Office IT Support",
      "Hardware & Software Troubleshooting",
      "Technical Setup",
      "General IT Assistance",
    ],
  },
  {
    id: "Data & Systems",
    label: "Data & Systems",
    services: [
      "Excel Solutions",
      "Database Solutions",
      "Reporting",
      "Business Systems",
      "Automation",
    ],
  },
  {
    id: "Other",
    label: "Other",
    services: ["Other Request"],
  },
] as const;

// Helper to get status UI details
export function getStatusBadge(status: TicketStatus) {
  switch (status) {
    case "NEW":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "CONTACTED":
      return "bg-purple-100 text-purple-800 border-purple-200";
    case "SCHEDULED":
      return "bg-teal-100 text-teal-800 border-teal-200";
    case "IN_PROGRESS":
      return "bg-amber-100 text-amber-800 border-amber-200";
    case "WAITING_FOR_CUSTOMER":
      return "bg-orange-100 text-orange-800 border-orange-200";
    case "WAITING_FOR_PARTS":
      return "bg-pink-100 text-pink-800 border-pink-200";
    case "COMPLETED":
      return "bg-green-100 text-green-800 border-green-200";
    case "CANCELLED":
      return "bg-gray-100 text-gray-800 border-gray-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
}

export function getPriorityBadge(priority: TicketPriority) {
  switch (priority) {
    case "LOW":
      return "bg-slate-100 text-slate-700";
    case "NORMAL":
      return "bg-blue-50 text-blue-700";
    case "HIGH":
      return "bg-orange-100 text-orange-700";
    case "URGENT":
      return "bg-red-100 text-red-700 font-bold";
    default:
      return "bg-slate-100 text-slate-700";
  }
}
