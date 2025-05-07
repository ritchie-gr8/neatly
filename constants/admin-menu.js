import { Box, BriefcaseBusiness, ChartPie, Hotel, MessageSquareText } from "lucide-react";
import { HiClipboardDocumentCheck } from "react-icons/hi2";

export const adminMenu = [
  {
    id: "admin-customer-booking-tab",
    title: "Customer Booking",
    icon: BriefcaseBusiness,
    path: "/admin/customer-booking",
  },
  {
    id: "admin-room-management-tab",
    title: "Room Management",
    icon: HiClipboardDocumentCheck,
    path: "/admin/room-management",
  },
  {
    id: "admin-hotel-information-tab",
    title: "Hotel Information",
    icon: Hotel,
    path: "/admin/hotel-information",
  },
  {
    id: "admin-room-property-tab",
    title: "Room Property",
    icon: Box,
    path: "/admin/room-property",
  },
  {
    id: "admin-analytics-dashboard-tab",
    title: "Analytics Dashboard",
    icon: ChartPie,
    path: "/admin/analytics-dashboard",
  },
  {
    id: "admin-chatbot-setup-tab",
    title: "Chatbot Setup",
    icon: MessageSquareText,
    path: "/admin/chatbot-setup",
  },
];
