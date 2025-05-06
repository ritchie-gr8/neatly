import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { SlArrowLeftCircle, SlArrowRightCircle } from "react-icons/sl";

export default function ImageSlider({ images, itemFlex = "30%", aspect = "6/7" }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, speed: 5 });

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
            <div key={idx} className={`flex-shrink-0 flex-[0_0_${itemFlex}] px-2 `}>
              <img
                src={img}
                alt={`slide-${idx}`}
                className={`aspect-[${aspect}] object-cover`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Arrow Buttons */}
      <button
        onClick={scrollPrev}
        className="absolute left-30 top-1/2 -translate-y-1/2 opacity-80 hover:opacity-100 cursor-pointer"
      >
        <SlArrowLeftCircle size="36" />
      </button>

      <button
        onClick={scrollNext}
        className="absolute right-30 top-1/2 -translate-y-1/2 opacity-80 hover:opacity-100 cursor-pointer"
      >
        <SlArrowRightCircle size="36" />
      </button>
    </div>
  );
}
