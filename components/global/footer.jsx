"use client";
import Link from "next/link";
import { Sparkle } from "lucide-react";
//icons
import { PiPhoneThin, PiMapPinLight } from "react-icons/pi";
import { CiMail } from "react-icons/ci";
import { FaFacebook, FaTwitter } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";


const Footer = () => {
  return (
    <div className="w-full bg-green-800 px-6 lg:px-12 xl:px-30 2xl:px-60 lg:pt-18 pt-12 text-white">
        {/* Top Box */}
        <div className="flex flex-col md:flex-row items-start justify-between lg:pb-24 pb-6 gap-10 lg:gap-0">
          {/* Left Box */}
          <div className="flex flex-col gap-10 w-full lg:w-auto">
            <div className="pl-5">
              <Link
                href="/"
                className="text-3xl text-green-100 font-bold relative font-noto-serif"
              >
                <Sparkle
                  className="size-4 absolute top-1 -left-5 text-orange-500 fill-orange-500"
                  title="Neatly logo"
                />
                NEATLY
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-bold">Neatly Hotel</p>
              <p className="text-sm font-light">
                The best hotel for rising your experience
              </p>
            </div>
          </div>
          {/* Right Box */}
          <div className="flex flex-col w-full lg:w-auto gap-10"> 
            <p className="font-bold">CONTACT</p>
            <div className="flex flex-col gap-6 font-light">
                <div className="flex items-center gap-4">
                    <PiPhoneThin size="24"className="text-green-500"/>
                    <p>+66 99 999 9999</p>
                </div>
                <div className="flex items-center gap-4">
                    <CiMail size="24" className="text-green-500"/>
                    <p>contact@neatlyhotel.com</p>
                </div>
                <div className="flex items-center gap-4">
                    <PiMapPinLight size="24" className="text-green-500 -translate-y-2.5"/>
                    <div>
                        <p>188 Phaya Thai Rd, Thung Phaya Thai,</p>
                        <p>Ratchathewi, Bangkok 10400</p>
                    </div>
                </div>
            </div>
          </div>
        </div>
        {/* Bottom Box */}
        <div className="flex items-center justify-between border-t border-green-700 py-10">
            <div className="flex flex-row gap-4">
                <button className="cursor-pointer lg:text-2xl md:text-xl text-lg"> <FaFacebook/> </button>
                <button className="cursor-pointer lg:text-2xl md:text-xl text-lg"> <FaTwitter/> </button>
                <button className="cursor-pointer lg:text-2xl md:text-xl text-lg"> <RiInstagramFill/> </button>
            </div>
            <p className="font-extralight lg:text-md md:text-sm text-sm">Copyright ©2022 Neatly Hotel</p>
        </div>
    </div>
  );
};

export default Footer;
