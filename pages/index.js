import dynamic from "next/dynamic";

const SearchRoom = dynamic(
  () => import("@/components/search-result/search-room"),
  {
    ssr: false,
  }
);
const ImageSlider = dynamic(() => import("@/components/global/image-slider"));
const CircleArrowButton = dynamic(() =>
  import("@/components/ui/circle-arrow-button")
);
const Loading = dynamic(() => import("@/components/global/loading"));

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "@/lib/axios";
import Image from "next/image";
import DefaultLayout from "@/layouts/default.layout";
import Aos from "aos";
import "aos/dist/aos.css";
import layoutConfig from "@/constants/room-layout-config";
import testimonials from "@/constants/testimonials";
import services from "@/constants/services";
import sliderImages from "@/constants/slider-home";
import { FaArrowRight } from "react-icons/fa6";
import Link from "next/link";

export const metadata = {
  title: "Neatly",
  description:
    "A Hotel Management System is a software built to handle all online hotel activities easily and safely.",
};

export default function Home() {
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [roomTypes, setRoomTypes] = useState([]);
  const [hotelInfo, setHotelInfo] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRoomTypes = async () => {
      setIsLoading(true);
      try {
        const response = await api.get("/room-type");
        const data = response.data.roomTypes;
        setRoomTypes(data);
      } catch (error) {
        console.error("Error fetching room types:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRoomTypes();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1024) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    const AOS = () => {
      Aos.init({
        mirror: true,
        duration: 1000,
      });
    };
    AOS();
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex((prev) =>
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 6000);
    return () => clearInterval(interval);
  }, []);

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

  const rooms = useMemo(() => {
    return roomTypes.map((room, i) => ({
      ...room,
      ...layoutConfig[i % layoutConfig.length],
    }));
  }, [roomTypes]);

  return (
    <DefaultLayout title="Home" showFooter>
        <div className="bg-util-bg overflow-x-hidden">
          {/* First Box --- Hero Section */}
          <section className="md:aspect-[2/1] aspect-[1/2] h-[764px] w-full relative">
            <Image
              src="https://res.cloudinary.com/dhyyl3snm/image/upload/f_auto,q_auto/v1747641838/hotel1_iuvsl0.jpg"
              alt="hotel-villa"
              fill
              className="object-cover object-[center_65%] scale-100"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent z-10 pointer-events-none" />
            <div className="w-full h-fit pt-12 md:pt-24 absolute inset-0 flex flex-col items-center justify-center z-20">
              <h1
                className="text-white text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-center leading-tight md:leading-[1.1] pb-12 lg:pb-30"
                data-aos="fade-up"
              >
                <span className="md:hidden block text-center">
                  A Best Place <br /> for Your Neatly <br />
                  Experience
                </span>
                <span className="hidden md:inline">
                  A Best Place for Your
                  <br />
                  Neatly Experience
                </span>
              </h1>
              <div
                className="w-full px-12 lg:px-12 xl:px-30 2xl:px-60"
                data-aos="fade"
                data-aos-delay="500"
                data-aos-duration="1500"
              >
                <SearchRoom pageType="landing-page" />
              </div>
            </div>
          </section>

        {/* Second Box --- Hotel Master*/}
        <section className="w-full h-full py-12 md:py-30" id="about">
          <div className="px-6 lg:px-12 xl:px-30 2xl:px-60">
            <h1
              className="text-green-800 text-4xl md:text-6xl lg:text-7xl font-light pb-6 md:pb-12"
              data-aos={isMobile ? "fade-up" : "fade-right"}
            >
              {hotelInfo && hotelInfo.hotelName}
            </h1>
            <div
              className="text-gray-700 space-y-4 md:space-y-6 pb-12 md:pb-30 px-6 md:px-12 lg:px-18 xl:px-30"
              data-aos={isMobile ? "fade-up" : "fade-left"}
              data-aos-delay="150"
            >
              <p className="whitespace-pre-line leading-8">
                {hotelInfo && hotelInfo.hotelDescription}
              </p>
            </div>
          </div>
          <div>
            <ImageSlider
              images={sliderImages}
              itemFlex="30%"
              aspect="3/4"
              button
            />
          </div>
        </section>

          {/* Third Box --- Service & Facilities */}
          <section className="w-full bg-green-700 text-white" id="services">
            <div className="flex flex-col items-center justify-center lg:py-30 py-12 gap-12">
              <h1
                className="lg:text-7xl text-5xl lg:pb-12"
                data-aos={isMobile ? "fade-up" : "fade-left"}
              >
                Service & <br className="lg:hidden block" /> Facilities
              </h1>
              <div className="flex gap-18 flex-wrap justify-center">
                {services.map((service, index) => (
                  <div
                    key={service.label}
                    className="flex flex-col items-center text-center w-30 h-30 gap-6 whitespace-nowrap"
                    data-aos={isMobile ? "fade-up" : "fade-left"}
                    data-aos-delay={isMobile ? 0 : index * 100}
                  >
                    <div>{service.icon}</div>
                    <p>{service.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

        {/* Fourth Box --- Rooms & Suits*/}
        <section className="bg-util-bg" id="rooms">
          <div className="lg:py-30 py-12">
            <h1
              className="text-center text-green-800 lg:text-7xl text-5xl lg:pb-24 pb-12"
              data-aos="fade-up"
            >
              Rooms & Suits
            </h1>
            <div className="px-0 lg:px-12 xl:px-30 2xl:px-60">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {isLoading ? (
                  <Loading />
                ) : (
                  rooms.slice(0, 6).map((room) => (
                    <Link
                      key={room.id}
                      href={`/rooms/${room.id}`}
                      className={`${room.colSpan} ${room.rowSpan} ${room.height} relative overflow-hidden cursor-pointer`}
                      data-aos="fade-up"
                    >
                      <img
                        src={room.defaultImage}
                        alt={room.name}
                        fill
                        className="absolute inset-0 w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/30 hover:bg-black/10 transition duration-300" />
                      <div className="flex flex-col absolute left-6 bottom-6 md:left-12 md:bottom-12 xl:left-18 xl:bottom-18 z-10 lg:gap-6 gap-3 text-white">
                        <h1 className="md:text-4xl lg:text-5xl text-3xl">
                          {room.name}
                        </h1>
                        <span className="flex text-xl items-center justify-start gap-2">
                          Explore Room
                          <FaArrowRight size="18" />
                        </span>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>

          {/* Fifth Box --- Our Customer Says */}
          <section className="flex flex-col px-6 lg:px-12 xl:px-30 2xl:px-60 lg:py-30 py-12 bg-green-200">
            <div>
              <h1 className="text-center lg:text-7xl text-4xl lg:pb-24 pb-12 text-green-800">
                Our Customer <br className="lg:hidden block" /> Says
              </h1>
              <div className="relative ">
                <div className="flex items-center justify-between">
                  <CircleArrowButton
                    direction="left"
                    onClick={() => {
                      setTestimonialIndex((prev) =>
                        prev === 0 ? testimonials.length - 1 : prev - 1
                      );
                    }}
                    Desktop={true}
                  />
                  {/* Quote */}
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={testimonialIndex}
                      initial={{ opacity: 0, x: isMobile ? 10 : 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: isMobile ? -10 : -100 }}
                      transition={{ duration: 0.5 }}
                      viewport={{ amount: 0.5 }}
                      className="text-green-700 max-w-4xl text-center lg:font-normal font-bold lg:px-12"
                    >
                      {testimonials[testimonialIndex].quote}
                    </motion.p>
                  </AnimatePresence>
                  <CircleArrowButton
                    direction="right"
                    onClick={() => {
                      setTestimonialIndex((prev) =>
                        prev === testimonials.length - 1 ? 0 : prev + 1
                      );
                    }}
                    Desktop={true}
                  />
                </div>
              </div>
              {/* Customer */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={testimonialIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ amount: 0.5 }}
                  className="flex items-center justify-center lg:pt-12 pt-6 gap-4"
                >
                  <motion.div
                    transition={{ duration: 0.5 }}
                    viewport={{ amount: 0.5 }}
                    className="relative w-8 h-8 rounded-full overflow-hidden"
                  >
                    <Image
                      src={testimonials[testimonialIndex].img}
                      alt={`${testimonials[testimonialIndex].name} image`}
                      fill
                      loading="lazy"
                    />
                  </motion.div>
                  <motion.p
                    className="text-gray-600"
                    transition={{ duration: 0.5 }}
                    viewport={{ amount: 0.5 }}
                  >
                    {testimonials[testimonialIndex].name}
                  </motion.p>
                </motion.div>
              </AnimatePresence>
              {/* Pagination dots */}
              <div className="flex justify-center gap-3 mt-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setTestimonialIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      index === testimonialIndex ? "bg-gray-600" : "bg-gray-400"
                    }`}
                  />
                ))}
              </div>
              <div className="flex items-center justify-center gap-6 pt-6">
                <CircleArrowButton
                  direction="left"
                  onClick={() => {
                    setTestimonialIndex((prev) =>
                      prev === 0 ? testimonials.length - 1 : prev - 1
                    );
                  }}
                />
                <CircleArrowButton
                  direction="right"
                  onClick={() => {
                    setTestimonialIndex((prev) =>
                      prev === testimonials.length - 1 ? 0 : prev + 1
                    );
                  }}
                />
              </div>
            </div>
          </section>
        </div>
    </DefaultLayout>
  );
}
