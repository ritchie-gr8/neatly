import React from "react";
import AdminSidebar from "../components/global/admin-sidebar";
import { AdminChatbotProvider } from "@/contexts/admin-chatbot-context";
import Head from "next/head";
const AdminLayout = ({ children , title='Admin Dashboard' }) => {
  return (
    <>
    <Head>
        <title>{title+' | Neatly'}</title>
    </Head>
    <AdminChatbotProvider>
      <div className="flex bg-gray-100 h-screen">
        <AdminSidebar />
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </AdminChatbotProvider>
    </>
  );
};

export default AdminLayout;
