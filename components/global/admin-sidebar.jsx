import { adminMenu } from "@/constants/admin-menu";
import React, { useEffect, useState } from "react";
import { LogOut } from "lucide-react";
import { Sparkle } from "lucide-react";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks/useAuth";
import { PATHS } from "@/constants/paths";
import Link from "next/link";


const AdminSidebar = () => {
  const { logout } = useAuth();
  const router = useRouter();
  const { pathname } = router;
  const [activeMenu, setActiveMenu] = useState("");


  useEffect(() => {
    const currentMenu = adminMenu.find(menu => 
      pathname.startsWith(menu.path)
    );
    
    if (currentMenu) {
      setActiveMenu(currentMenu.path);
    }
  }, [pathname]);

  const handleSignOut = () => {
    logout();
    router.push(PATHS.PUBLIC.SIGN_IN);
  };

  return (
    <aside className="w-[260px] bg-green-800 h-full flex flex-col pb-44">
      <div className="px-6 py-10 flex items-center flex-col gap-4 mb-10">
        <h1 className="text-h4 text-green-100 font-medium relative font-noto-serif">
          <Sparkle className="size-3 absolute top-1 -left-3 text-orange-500 fill-orange-500" />
          NEATLY
        </h1>
        <p className="text-green-400 font-normal">Admin Panel Control</p>
      </div>

      <nav className="flex flex-col flex-1 justify-between ">
        <div>
          {adminMenu.map((menu) => (
            <Link 
              href={menu.path}
              key={menu.id}
              className={`flex items-center gap-3 px-6 py-5 text-base font-medium
               cursor-pointer text-green-100 hover:bg-green-600
               transition-all duration-400 ease-in-out ${
                 activeMenu === menu.path ? "bg-green-600 pl-12" : "pl-6"
               }`}
            >
              <menu.icon size={16} />
              <span>{menu.title}</span>
            </Link>
          ))}
        </div>

        <div className="pt-12">
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
