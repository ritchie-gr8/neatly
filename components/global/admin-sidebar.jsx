import { adminMenu } from "@/constants/admin-menu";
import React from "react";
import { LogOut } from "lucide-react";
import { Sparkle } from "lucide-react";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks/useAuth";
import { PATHS } from "@/constants/paths";

const AdminSidebar = () => {
  const { logout } = useAuth();
  const router = useRouter();
  const { pathname } = router;

  const handleSignOut = () => {
    logout();
    router.push(PATHS.PUBLIC.SIGN_IN);
  };

  return (
    <aside className="w-[240px] bg-green-800 h-full flex flex-col">
      <div className="px-6 py-10 flex items-center flex-col gap-4 mb-10">
        <h1 className="text-h4 text-green-100 font-medium relative font-noto-serif">
          <Sparkle className="size-3 absolute top-1 -left-3 text-orange-500 fill-orange-500" />
          NEATLY
        </h1>
        <p className="text-green-400 font-normal">Admin Panel Control</p>
      </div>

      <nav className="flex flex-col flex-1 justify-between">
        <div>
          {adminMenu.map((menu) => (
            <div
              className={`flex items-center gap-3 px-6 py-5 text-base font-medium
               cursor-pointer text-green-100 hover:bg-green-600 ${
                 pathname === menu.path ? "bg-green-600" : ""
               }`}
              key={menu.id}
              onClick={() => router.push(menu.path)}
            >
              <menu.icon size={16} />
              <span>{menu.title}</span>
            </div>
          ))}
        </div>

        <div className="mb-44 pt-12">
          <div
            className="flex items-center gap-3 px-6 py-5 text-b1 font-medium
               cursor-pointer text-green-100 hover:bg-green-600"
            onClick={handleSignOut}
          >
            <LogOut size={18} />
            <span>Log out</span>
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
