import { PiArrowCircleLeftThin, PiArrowCircleRightThin } from 'react-icons/pi';

const CircleArrowButton = ({ direction = "left", onClick, className = "", hiddenOnDesktop = false }) => {
  const Icon = direction === "left" ? PiArrowCircleLeftThin : PiArrowCircleRightThin;
  return (
    <button
      onClick={onClick}
      className={`${hiddenOnDesktop ? "md:hidden" : "md:block hidden"} ${className}`}
    >
      <Icon size="60" className="text-orange-500 hover:text-orange-300 transition duration-300 flex-shrink-0 cursor-pointer" />
    </button>
  );
};

export default CircleArrowButton;
