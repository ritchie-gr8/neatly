import { useState, useEffect} from "react";
import { motion, AnimatePresence } from "framer-motion";
import DefaultLayout from "@/layouts/default.layout";
import ImageSlider from "@/components/global/image-slider";
import api from "@/lib/axios";
import testimonials from "@/constants/testimonials";
import services from "@/constants/services";
import sliderImages from "@/constants/slider-home";
//icons
import { FaArrowRight } from "react-icons/fa6";
import { PiArrowCircleLeftThin, PiArrowCircleRightThin } from "react-icons/pi";

export const metadata = {
  title: "Neatly",
  description:
    "A Hotel Management System is a software built to handle all online hotel activities easily and safely.",
};

export default function Home() {
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [isForward, setIsForward] = useState(true);
  const [roomTypes, setRoomTypes] = useState([]);

  useEffect(() => {
    const fetchRoomTypes = async () => {
      try {
        const response = await api.get('/admin/room-type/list');
        const data = response.data.data.items;
        setRoomTypes(data);
      } catch (error) {
        console.error('Error fetching room types:', error);
      }
    };

    fetchRoomTypes();
  }, []);

  const rooms = [
    {
      id: 1,
      name: roomTypes[0]?.name || "Error Loading Room",
      image: roomTypes[0]?.defaultImage || "",
      colSpan: "md:col-span-3",
      height: "md:h-132 h-66",
      rowSpan: "",
    },
    {
      id: 2,
      name: roomTypes[1]?.name || "Error Loading Room",
      image: roomTypes[1]?.defaultImage || "",
      colSpan: "md:col-span-2",
      height: "md:h-96 h-66",
      rowSpan: "",
    },
    {
      id: 3,
      name: roomTypes[2]?.name || "Error Loading Room",
      image: roomTypes[2]?.defaultImage || "",
      colSpan: "md:col-span-1",
      height: "md:h-96 h-66",
      rowSpan: "",
    },
    {
      id: 4,
      name: roomTypes[3]?.name || "Error Loading Room",
      image: roomTypes[3]?.defaultImage || "",
      colSpan: "md:col-span-1",
      height: "md:h-196 h-66",
      rowSpan: "md:row-span-2",
    },
    {
      id: 5,
      name: roomTypes[4]?.name || "Error Loading Room",
      image: roomTypes[4]?.defaultImage || "",
      colSpan: "md:col-span-2",
      height: "md:h-96 h-66",
      rowSpan: "",
    },
    {
      id: 6,
      name: roomTypes[5]?.name || "Error Loading Room",
      image: roomTypes[5]?.defaultImage || "",
      colSpan: "md:col-span-2",
      height: "md:h-96 h-66",
      rowSpan: "",
    },
  ];


  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex(prev => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 6000);
  
    return () => clearInterval(interval);
  }, [testimonialIndex]);

  return (
    <DefaultLayout showFooter>
      <div className="bg-util-bg">

        {/* First Box --- Hero Section */}
        <section className="md:aspect-[2/1] aspect-[1/2] relative overflow-hidden">
          <img
            src="/images/landing-page/hotel-main.jpg"
            alt="hotel-villa"
            className="w-full h-full object-cover object-[center_65%] md:scale-100 scale-200"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-black/80 via-black/40 to-transparent">
          <h1 className="text-white text-5xl md:text-8xl font-light text-center leading-tight md:leading-[1.1] pb-12 md:pb-30">
            <span className="md:hidden block text-center">
              A Best Place <br /> for Your Neatly <br />Experience
            </span>
            <span className="hidden md:inline">
              A Best Place for Your<br />
              Neatly Experience
            </span>
          </h1>
          <div>Search Box</div>
        </div>
        </section>

        {/* Second Box --- Neatly Hotel */}
        <section className="w-full h-full py-12 md:py-30" id="about">
          <div className="px-6 md:px-60">
            <h1 className="text-green-800 text-4xl md:text-7xl font-light pb-6 md:pb-12">
              Neatly Hotel
            </h1>
            <div className="text-gray-700 space-y-4 md:space-y-6 pb-12 md:pb-30 px-6 md:px-60">
              <p>
                Set in Bangkok, Thailand. Neatly Hotel offers 5-star
                accommodation with an outdoor pool, kids' club, sports
                facilities and a fitness centre. There is also a spa, an indoor
                pool and saunas.
              </p>
              <p>
                All units at the hotel are equipped with a seating area, a
                flat-screen TV with satellite channels, a dining area and a
                private bathroom with free toiletries, a bathtub and a
                hairdryer. Every room in Neatly Hotel features a furnished
                balcony. Some rooms are equipped with a coffee machine.
              </p>
              <p>
                Free WiFi and entertainment facilities are available at property
                and also rentals are provided to explore the area.
              </p>
            </div>
          </div>
          <div>
            <ImageSlider images={sliderImages} itemFlex="30%" aspect="3/4" button />
          </div>
        </section>

        {/* Third Box --- Service & Facilities */}
        <section className="w-full bg-green-700 text-white" id="services">
          <div className="flex flex-col items-center justify-center py-30 gap-12">
            <h1 className="md:text-7xl text-5xl pb-12">Service & <br className="md:hidden block"/> Facilities</h1>
            <div className="flex gap-18 flex-wrap justify-center">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center w-30 h-30 gap-6 whitespace-nowrap"
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
          <div className="md:py-30 py-12">
            <h1 className="text-center text-green-800 md:text-7xl text-4xl md:pb-24 pb-12">
              Rooms & Suits
            </h1>
            <div className="px-0 md:px-60">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {rooms.map((room) => (
                  <div
                    key={room.id}
                    className={`${room.colSpan} ${room.rowSpan} ${room.height} relative overflow-hidden cursor-pointer`}
                  >
                    <img
                      src={room.image}
                      alt={room.name}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 hover:bg-black/10 transition duration-300" />
                    <div className="flex flex-col absolute md:left-18 md:bottom-18 left-6 bottom-6 z-10 md:gap-6 gap-3 text-white">
                      <h1 className="md:text-5xl text-3xl">{room.name}</h1>
                      <span className="flex text-xl items-center justify-start gap-2">
                        Explore Room
                        <FaArrowRight size="18" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Fifth Box --- Our Customer Says */}
        <section className="flex flex-col md:px-60 px-6 md:py-30 py-12 bg-green-200">
          <h1 className="text-center md:text-7xl text-4xl md:pb-24 pb-12 text-green-800">
            Our Customer <br className="md:hidden block"/> Says
          </h1>
          <div className="relative">
            <div className="flex items-center justify-between">
              <button 
                className="md:block hidden"
                onClick={() => {
                  setIsForward(false);
                  setTestimonialIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
                }}
              >
                <PiArrowCircleLeftThin size="60" className="text-orange-500 hover:text-orange-300 transition duration-300 flex-shrink-0 cursor-pointer"/>
              </button>
              <AnimatePresence mode="wait">
                <motion.p
                  key={testimonialIndex}
                  initial={{ opacity: 0, x: isForward ? 100 : -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: isForward ? -100 : 100 }}
                  transition={{ duration: 0.5 }}
                  className="text-green-700 max-w-4xl text-center md:font-normal font-bold"
                >
                  {testimonials[testimonialIndex].quote}
                </motion.p>
              </AnimatePresence>
              <button 
                className="md:block hidden"
                onClick={() => {
                  setIsForward(true);
                  setTestimonialIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
                }}
              >
                <PiArrowCircleRightThin size="60" className="text-orange-500 hover:text-orange-300 transition duration-300 flex-shrink-0 cursor-pointer"/>
              </button>
            </div>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={testimonialIndex}
              initial={{ opacity: 0, x: isForward ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isForward ? -20 : 20 }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-center md:pt-12 pt-6 gap-4"
            >
              <motion.img
                src={testimonials[testimonialIndex].img}
                alt={`${testimonials[testimonialIndex].name} image`}
                className="w-10 h-10 rounded-full"
                transition={{ duration: 0.5 }}
                loading="lazy"
              />
              <motion.p
                className="text-gray-600"
                transition={{ duration: 0.5 }}
              >
                {testimonials[testimonialIndex].name}
              </motion.p>
            </motion.div>
          </AnimatePresence>
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
          <div className="flex items-center justify-center gap-6 md:hidden pt-6">
          <button 
                onClick={() => {
                  setIsForward(false);
                  setTestimonialIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
                }}
              >
                <PiArrowCircleLeftThin size="60" className="text-orange-500 hover:text-orange-300 transition duration-300 flex-shrink-0 cursor-pointer"/>
              </button>
              <button 
                onClick={() => {
                  setIsForward(true);
                  setTestimonialIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
                }}
              >
                <PiArrowCircleRightThin size="60" className="text-orange-500 hover:text-orange-300 transition duration-300 flex-shrink-0 cursor-pointer"/>
              </button>
          </div>
        </section>
      </div>
    </DefaultLayout>
  );
}
