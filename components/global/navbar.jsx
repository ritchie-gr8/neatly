"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Sparkle } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navLink = [
    { href: "#about", label: "About Neatly" },
    { href: "#services", label: "Service & Facilities" },
    { href: "#rooms", label: "Rooms & Suits" },
  ];

  return (
    <div className="w-full h-16 bg-white border-b fixed z-99">
      <div className="w-full h-full px-60 mx-auto flex items-center justify-between">
        {/* Left bar */}
        <div className="flex items-center gap-12 pl-5">
          <Link
            href="/"
            className="text-h4 text-green-700 font-black relative font-noto-serif"
          >
            <Sparkle
              className="size-4 absolute top-1 -left-5 text-orange-500 fill-orange-500"
              title="Neatly logo"
            />
            NEATLY
          </Link>

          <div className="flex text-gray-900 gap-12">
            {navLink.map(({ href, label }) => (
              <Link
                key={label}
                href={`/#${href.replace('#', '')}`}
                className="hover:text-gray-600 transition-colors duration-300 ease-in-out"
                onClick={(e) => {
                  e.preventDefault();
                  const targetSection = document.querySelector(href);
                  if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Right bar */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-6 text-gray-900">
              <Link href="/profile" className="flex items-center gap-2 hover:text-gray-600 transition-colors duration-300 ease-in-out">
                {user.profilePicture ? (
                  <img
                    src={user.profilePicture}
                    alt="User Avatar"
                    className="inline-flex items-center justify-center rounded-full h-8 w-8 object-cover"
                  />
                ) : (
                  <span className="inline-flex items-center justify-center rounded-full h-8 w-8 bg-gray-900 text-white text-lg font-medium">
                    {user.firstName[0]}
                  </span>
                )}
                <span>{`${user.firstName} ${user.lastName}`}</span>
              </Link>
              <Button onClick={() => logout()} className="btn-primary">
                Log Out
              </Button>
            </div>
          ) : (
            // Unregister
            <div className="flex items-center gap-4">
              <Link href="/sign-in" className="text-b1 text-gray-900 hover:text-gray-600 transition-colors duration-300 ease-in-out">
                Log In
              </Link>
              <Link href="/sign-up" className="text-b1 text-gray-900 hover:text-gray-600 transition-colors duration-300 ease-in-out">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
