import { motion } from "framer-motion";

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

const sizeClasses = {
  xs: {
    text: "text-md",
    dot: "text-xl",
    gap: "gap-1",
    py: "py-2",
  },
  sm: {
    text: "text-lg",
    dot: "text-2xl",
    gap: "gap-2",
    py: "py-6",
  },
  md: {
    text: "text-2xl",
    dot: "text-4xl",
    gap: "gap-4",
    py: "py-10",
  },
  lg: {
    text: "text-3xl",
    dot: "text-5xl",
    gap: "gap-6",
    py: "py-20",
  },
};

const Loading = ({ text = "Now Loading", size = "lg", customClasses = null, className }) => {
  let classes = sizeClasses[size] || sizeClasses.lg;
  if (customClasses) {
    classes = {
      ...classes,
      ...customClasses,
    };
  }

  return (
    <div className={`col-span-full flex justify-center items-center ${classes.py}`}>
      <div className={`flex flex-col items-center ${classes.gap} ${className}`}>
        <span className={`text-orange-500 font-semibold flex gap-1 items-end ${classes.text}`}>
          {text}
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              variants={dotVariants}
              animate="bounce"
              custom={i}
              className={classes.dot}
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
