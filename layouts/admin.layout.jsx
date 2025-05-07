import React from "react";
import AdminSidebar from "../components/global/admin-sidebar";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 overflow-y-auto h-full">{children}</div>
    </div>
  );
};

export default AdminLayout;
