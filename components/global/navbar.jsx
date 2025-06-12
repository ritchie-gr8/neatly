"use client";

import Link from "next/link";
import { useRouter } from "next/router";
import { PATHS } from "@/constants/paths";
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
  SheetClose,
} from "@/components/ui/sheet";
import { useAuth } from "@/hooks/useAuth";
//icons
import { Sparkle } from "lucide-react";
import { LogOut, User, BriefcaseBusiness, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import api from "@/lib/axios";

const Navbar = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const navLink = [
    { href: "#about", label: "About Neatly" },
    { href: "#services", label: "Service & Facilities" },
    { href: "#rooms", label: "Rooms & Suits" },
  ];

  const [hotelInfo, setHotelInfo] = useState(null);

  useEffect(() => {
    const fetchHotelInfo = async () => {
      try {
        const response = await api.get("/hotel-info");
        const data = response.data;
        setHotelInfo(data);
      } catch (error) {
        console.error("Error fetching hotel information:", error);
      }
    };

    fetchHotelInfo();
  }, []);

  return (
    <div className="w-full md:h-16 h-12 bg-white border-b fixed z-50">
      <div className="w-full h-full px-6 lg:px-12 xl:px-30 2xl:px-60 mx-auto flex items-center justify-between">
        {/* Left bar */}
        <div className="flex items-center gap-12">
          <Link
            href="/"
            className="md:text-h4 text-2xl text-green-700 font-black relative font-noto-serif"
          >
            {hotelInfo && hotelInfo?.hotelUrl ? (
              <img
                src={hotelInfo?.hotelUrl}
                alt="hotel-logo"
                className="w[94px] md:w-[140px] h-[25px] md:h-[45px] object-contain"
                title="Neatly logo"
              />
            ) : (
              <>
                <Sparkle
                  className="md:size-4 size-2 absolute md:top-1 md:-left-5 top-0.5 -left-2 text-orange-500 fill-orange-500"
                  title="Neatly logo"
                />{" "}
                NEATLY
              </>
            )}
          </Link>

          <div className="hidden lg:flex text-gray-900 gap-12 text-base">
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
        <div className="hidden lg:flex items-center gap-4">
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
                      href="/booking-history"
                      className="flex items-center gap-2 p-2 rounded hover:bg-gray-200 transition"
                    >
                      <BriefcaseBusiness className="w-4 h-4 text-gray-600" />{" "}
                      Booking History
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

        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Menu className="w-6 h-6 text-green-600" />
            </SheetTrigger>
            <SheetContent side="right" className="w-full top-12 md:top-16">
              {user && (
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage
                      src={user?.profilePicture}
                      alt={user?.firstName}
                    />
                    <AvatarFallback>{user?.firstName?.[0]}</AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <div className="text-base text-gray-700">
                      {`${user.firstName} ${user.lastName}`}
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-4 text-base">
                <div>
                  {user ? (
                    <div className="flex flex-col gap-8 text-gray-700 border-t pt-8">
                      <SheetClose asChild>
                        <Link
                          href="/profile"
                          className="flex items-center gap-2 hover:text-gray-600 transition"
                        >
                          <User className="w-4 h-4 text-gray-500" /> Profile
                        </Link>
                      </SheetClose>

                      <SheetClose asChild>
                        <Link
                          href="/booking-history"
                          className="flex items-center gap-2 hover:text-gray-600 transition"
                        >
                          <BriefcaseBusiness className="w-4 h-4 text-gray-500" />{" "}
                          Booking History
                        </Link>
                      </SheetClose>

                      <SheetClose asChild>
                        <button
                          onClick={logout}
                          className="flex items-center gap-2 hover:text-gray-600 transition border-t pt-4 w-full text-left focus:outline-none"
                        >
                          <LogOut className="w-4 h-4 text-gray-500" /> Log out
                        </button>
                      </SheetClose>
                    </div>
                  ) : (
                    // Unregister
                    <div className="flex flex-col gap-8">
                      {navLink.map(({ href, label }) => (
                        <SheetClose asChild key={label}>
                          <button
                            className="text-left text-gray-900 hover:text-gray-600 transition-colors"
                            onClick={() => {
                              if (router.pathname === PATHS.PUBLIC.HOME) {
                                const targetSection =
                                  document.querySelector(href);
                                if (targetSection) {
                                  targetSection.scrollIntoView({
                                    behavior: "smooth",
                                  });
                                }
                              } else {
                                router.push(PATHS.PUBLIC.HOME).then(() => {
                                  const targetSection =
                                    document.querySelector(href);
                                  if (targetSection) {
                                    targetSection.scrollIntoView({
                                      behavior: "smooth",
                                    });
                                  }
                                });
                              }
                            }}
                          >
                            {label}
                          </button>
                        </SheetClose>
                      ))}
                      <SheetClose asChild>
                        <Link
                          href="/sign-in"
                          className="text-orange-500 transition-colors border-t pt-8 block"
                        >
                          Log in
                        </Link>
                      </SheetClose>

                      <SheetClose asChild>
                        <Link
                          href="/sign-up"
                          className="text-orange-500 transition-colors block"
                        >
                          Register
                        </Link>
                      </SheetClose>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
