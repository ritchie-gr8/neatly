import { BiSpa } from "react-icons/bi";
import { LiaHotTubSolid, LiaCarSideSolid } from "react-icons/lia";
import { PiBarbell } from "react-icons/pi";
import { LuSofa } from "react-icons/lu";
import { FaWifi } from "react-icons/fa";
import { TbPhoneCall } from "react-icons/tb";

const services = [
  { icon: <BiSpa size="48" />, label: "Spa" },
  { icon: <LiaHotTubSolid size="48" />, label: "Sauna" },
  { icon: <PiBarbell size="48" />, label: "Fitness" },
  { icon: <LuSofa size="48" />, label: "Arrival Lounge" },
  { icon: <FaWifi size="48" />, label: "Free Wifi" },
  { icon: <LiaCarSideSolid size="48" />, label: "Parking" },
  { icon: <TbPhoneCall size="48" />, label: "24 hours operation" },
];

export default services;
