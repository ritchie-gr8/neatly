import { useCallback, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
//icons
import { SlArrowLeftCircle, SlArrowRightCircle } from "react-icons/sl";
import { IoClose } from "react-icons/io5";

export default function ImageSlider({
  images,
  itemFlex = "30%",
  aspect = "3/4",
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, speed: 5 });
  const [selectedImage, setSelectedImage] = useState(null);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="relative">
      {/* Image Box */}
      <div className="overflow-hidden px-6" ref={emblaRef}>
        <div className="flex">
          {images.map((img, idx) => (
            <div
              key={idx}
              className={`flex-shrink-0 aspect-[${aspect}] flex-[0_0_${itemFlex}] px-2 cursor-pointer`}
              onClick={() => setSelectedImage(img)}
            >
              <img
                src={img}
                alt={`slide-${idx}`}
                loading="lazy"
                className={`w-full h-full object-cover`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Arrow Buttons */}
      <button
        onClick={scrollPrev}
        aria-label="Scroll previous"
        className="absolute left-36 top-1/2 -translate-y-1/2 opacity-80 hover:opacity-100 cursor-pointer"
      >
        <SlArrowLeftCircle size="36" />
      </button>

      <button
        onClick={scrollNext}
        aria-label="Scroll next"
        className="absolute right-36 top-1/2 -translate-y-1/2 opacity-80 hover:opacity-100 cursor-pointer"
      >
        <SlArrowRightCircle size="36" />
      </button>

      {/* Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="relative">
            <img
              src={selectedImage}
              alt="Preview"
              className="w-full max-h-[80vh] object-contain"
            />

            {/* Close Button */}
            <button
              className="absolute top-4 right-2 text-red-400 hover:text-red-200 cursor-pointer z-20"
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
