import DefaultLayout from "@/layouts/default.layout";
//components
import ImageSlider from "@/components/global/image-slider";
//icons
import { BiSpa } from "react-icons/bi";
import { LiaHotTubSolid, LiaCarSideSolid } from "react-icons/lia";
import { PiBarbell } from "react-icons/pi";
import { LuSofa } from "react-icons/lu";
import { FaWifi } from "react-icons/fa";
import { TbPhoneCall } from "react-icons/tb";

export const metadata = {
  title: "Neatly",
  description:
    "A Hotel Management System is a software built to handle all online hotel activities easily and safely.",
};

export default function Home() {
  const images = [
    "/images/landing-page/test1.jpg",
    "/images/landing-page/test2.jpg",
    "/images/landing-page/test3.jpg",
    "/images/landing-page/test4.jpg",
    "/images/landing-page/test5.jpg",
  ];

  const services = [
    { icon: <BiSpa size="48" />, label: "Spa" },
    { icon: <LiaHotTubSolid size="48" />, label: "Sauna" },
    { icon: <PiBarbell size="48" />, label: "Fitness" },
    { icon: <LuSofa size="48" />, label: "Arrival Lounge" },
    { icon: <FaWifi size="48" />, label: "Free Wifi" },
    { icon: <LiaCarSideSolid size="48" />, label: "Parking" },
    { icon: <TbPhoneCall size="48" />, label: "24 hours operation" },
  ];

  return (
    <DefaultLayout>
      <div className="bg-util-bg">
        {/* First Box --- Hero Section */}
        <div className="aspect-[2/1] relative overflow-hidden">
          <img
            src="/images/landing-page/hotel-main.jpg"
            alt="hotel-main"
            className="w-full h-full object-cover object-[center_65%]"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-black/80 via-black/40 to-transparent">
            <div className="text-white text-8xl font-light text-center leading-snug pb-30">
              <h1> A Best Place for Your </h1>
              <h1> Neatly Experience </h1>
            </div>
            <div>Search Box</div>
          </div>
        </div>

        {/* Second Box --- Neatly Hotel */}
        <div className="w-full h-full py-30 ">
          <div className="px-60">
            <h1 className="text-green-800 text-7xl font-light pb-12">
              Neatly Hotel
            </h1>
            <div className="text-gray-700 space-y-6 pb-30 px-60">
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
            <ImageSlider images={images} itemFlex="30%" aspect="3/4" />
          </div>
        </div>

        {/* Third Box --- Service & Facilities */}
        <div className="w-full bg-green-700 text-white">
          <div className="flex flex-col items-center justify-center py-30 gap-12">
            <h1 className="text-7xl pb-12">Service & Facilities</h1>
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
        </div>

        {/* Fourth Box --- Rooms & Suits*/}
        <div className="bg-util-bg">
          <div className="py-30">
            <h1 className="text-center text-green-800 text-7xl pb-12">Rooms & Suits</h1>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
