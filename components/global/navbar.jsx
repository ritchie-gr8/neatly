"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Sparkle } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <div className="w-full h-16 bg-util-bg">
      <div className="w-full h-full max-w-5xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-h4 text-green-800 font-medium relative font-noto-serif">
          <Sparkle className="size-4 absolute top-1 -left-5 text-orange-500 fill-orange-500" />
          NEATLY
        </Link>
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4 text-gray-900">
              {user.email}
              <Button onClick={() => logout()} className="btn-primary">
                Log Out
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link href="/sign-in" className="text-b1 text-gray-900">
                Log In
              </Link>
              <Link href="/sign-up" className="text-b1 text-gray-900">
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
