import { useCallback, useState } from "react";
import { cn } from "@/lib/utils";
import useEmblaCarousel from "embla-carousel-react";
//icons
import { SlArrowLeftCircle, SlArrowRightCircle } from "react-icons/sl";
import { IoClose } from "react-icons/io5";

export default function ImageSlider({
  images,
  itemFlex = "30%",
  aspect = "3/4",
  button = false,
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, speed: 5 });
  const [selectedImage, setSelectedImage] = useState(null);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const FLEX_MAP = {
    "25%": "flex-[0_0_25%]",
    "30%": "flex-[0_0_30%]",
    "33%": "flex-[0_0_33.33%]",
    "50%": "flex-[0_0_50%]",
    "100%": "flex-[0_0_100%]",
  };
  
  const ASPECT_MAP = {
    "1/1": "aspect-[1/1]",
    "3/4": "aspect-[3/4]",
    "4/3": "aspect-[4/3]",
    "16/9": "aspect-[16/9]",
    "9/16": "aspect-[9/16]",
  };

  return (
    <div className="relative">
      {/* Image Box */}
      <div className="overflow-hidden px-6" ref={emblaRef}>
        <div className="flex">
          {images.map((img, idx) => (
            <div
              key={idx}
              className={cn(
                "flex-shrink-0",
                ASPECT_MAP[aspect] || "aspect-[3/4]",
                FLEX_MAP[itemFlex] || "flex-[0_0_30%]",
                "md:px-2 px-1 cursor-pointer"
              )}
              onClick={() => setSelectedImage(img)}
            >
              <img
                src={img}
                alt={`slide-${idx}`}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Arrow Buttons */}
      {button && (
      <button
        onClick={scrollPrev}
        aria-label="Scroll previous"
        className={cn(
          "hidden md:flex absolute left-36 top-1/2 -translate-y-1/2",
          "opacity-80 hover:opacity-100 cursor-pointer"
        )}
      >
        <SlArrowLeftCircle size="36" />
      </button>
      )}

      {button && (
      <button
        onClick={scrollNext}
        aria-label="Scroll next"
        className={cn(
          "hidden md:flex absolute right-36 top-1/2 -translate-y-1/2",
          "opacity-80 hover:opacity-100 cursor-pointer"
        )}
      >
        <SlArrowRightCircle size="36" />
      </button>
      )}

      {/* Modal */}
      {selectedImage && (
        <div
          className={cn(
            "fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          )}
        >
          <div className="relative">
            <img
              src={selectedImage}
              alt="Preview"
              className={cn("w-full max-h-[80vh] object-contain")}
            />

            {/* Close Button */}
            <button
              className={cn(
                "absolute top-4 right-2",
                "text-red-400 hover:text-red-200 cursor-pointer z-20"
              )}
              onClick={() => setSelectedImage(null)}
            >
              <IoClose size={32} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
