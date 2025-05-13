"use client";

import Link from "next/link";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
//icons
import { Sparkle } from "lucide-react";
import {
  LogOut,
  User,
  BriefcaseBusiness,
  Menu,
} from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navLink = [
    { href: "#about", label: "About Neatly" },
    { href: "#services", label: "Service & Facilities" },
    { href: "#rooms", label: "Rooms & Suits" },
  ];

  return (
    <div className="w-full md:h-16 h-12 bg-white border-b fixed z-50">
      <div className="w-full h-full md:px-60 px-3 mx-auto flex items-center justify-between">
        {/* Left bar */}
        <div className="flex items-center gap-12 pl-5">
          <Link
            href="/"
            className="md:text-h4 text-2xl text-green-700 font-black relative font-noto-serif"
          >
            <Sparkle
              className="md:size-4 size-2 absolute md:top-1 md:-left-5 top-0.5 -left-2 text-orange-500 fill-orange-500"
              title="Neatly logo"
            />
            NEATLY
          </Link>

          <div className="hidden md:flex text-gray-900 gap-12 text-base">
            {navLink.map(({ href, label }) => (
              <Link
                key={label}
                href={`/#${href.replace("#", "")}`}
                className="hover:text-gray-600 transition-colors duration-300 ease-in-out"
                onClick={(e) => {
                  e.preventDefault();
                  const targetSection = document.querySelector(href);
                  if (targetSection) {
                    targetSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Right bar --- Desktop */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="items-center gap-6 text-gray-900">
              <Popover>
                <PopoverTrigger asChild>
                  <button className="flex items-center gap-2 hover:text-gray-600 transition-colors duration-300 ease-in-out focus:outline-none cursor-pointer">
                    <Avatar className="w-8 h-8">
                      <AvatarImage
                        src={user.profilePicture}
                        alt={user.firstName}
                      />
                      <AvatarFallback>{user.firstName[0]}</AvatarFallback>
                    </Avatar>
                    <span>{`${user.firstName} ${user.lastName}`}</span>
                  </button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-48 p-2">
                  <div className="flex flex-col gap-1 text-sm">
                    <Link
                      href="/profile"
                      className="flex items-center gap-2 p-2 rounded hover:bg-gray-200 transition"
                    >
                      <User className="w-4 h-4 text-gray-600" /> Profile
                    </Link>
                    <Link
                      href="/"
                      className="flex items-center gap-2 p-2 rounded hover:bg-gray-200 transition"
                    >
                      <BriefcaseBusiness className="w-4 h-4 text-gray-600" /> Booking History
                    </Link>
                    <button
                      onClick={logout}
                      className="flex items-center gap-2 p-2 rounded hover:bg-gray-200 transition cursor-pointer"
                    >
                      <LogOut className="w-4 h-4 text-gray-600" /> Logout
                    </button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          ) : (
            // Unregister
            <div className="flex items-center gap-4">
              <Link
                href="/sign-in"
                className="text-b1 text-gray-900 hover:text-gray-600 transition-colors duration-300 ease-in-out"
              >
                Log In
              </Link>
              <Link
                href="/sign-up"
                className="text-b1 text-gray-900 hover:text-gray-600 transition-colors duration-300 ease-in-out"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Right bar --- Mobile */}
     

      </div>
    </div>
  );
};

export default Navbar;
