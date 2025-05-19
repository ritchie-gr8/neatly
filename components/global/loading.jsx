import { motion } from "framer-motion";
import { Sparkle } from "lucide-react";

const dotVariants = {
  bounce: (i) => ({
    y: ["0%", "-20%", "0%", "0%"],
    transition: {
      duration: 1.2,
      repeat: Infinity,
      repeatType: "loop",
      ease: "easeInOut",
      delay: i * 0.12,
    },
  }),
};

const Loading = () => {
  return (
    <div className="col-span-full flex justify-center items-center py-20">
      <div className="flex flex-col items-center gap-6">
        <span className="text-3xl text-orange-500 font-semibold flex gap-1 items-center">
          Now Loading
          {[0, 1, 2, 3].map((i) => (
            <motion.span
              key={i}
              variants={dotVariants}
              animate="bounce"
              custom={i}
            >
              .
            </motion.span>
          ))}
        </span>
      </div>
    </div>
  );
};

export default Loading;
