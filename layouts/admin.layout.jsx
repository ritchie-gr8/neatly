import React from "react";
import AdminSidebar from "../components/global/admin-sidebar";
import { AdminChatbotProvider } from "@/contexts/admin-chatbot-context";

const AdminLayout = ({ children }) => {
  return (
    <AdminChatbotProvider>
      <div className="flex h-screen bg-gray-100">
        <AdminSidebar />
        <div className="flex-1 overflow-y-auto h-full">{children}</div>
      </div>
    </AdminChatbotProvider>
  );
};

export default AdminLayout;
