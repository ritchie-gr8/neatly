import React from "react";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "./embla-carousel-arrow-btn";
import useEmblaCarousel from "embla-carousel-react";
import { cn } from "@/lib/utils";
import { FaArrowRight } from "react-icons/fa6";
import Link from "next/link";

const EmblaCarousel = (props) => {
  const { slides, options, flex = 85, roomTypes } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <section className="embla relative w-full">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {roomTypes &&
            roomTypes.map((roomType) => (
              <Link href={`/rooms/${roomType.id}`} key={`room-${roomType.id}`}>
                <div
                  className={cn(
                    "embla__slide",
                    `2xl:flex-[0_0_30%] xl:flex-[0_0_40%] lg:flex-[0_0_50%] md:flex-[0_0_60%] flex-[0_0_100%]`
                  )}
                >
                  <div
                    className={`h-[340px] w-[548px] relative overflow-hidden cursor-pointer mx-auto`}
                    data-aos="fade-up"
                  >
                    <img
                      src={roomType.defaultImage}
                      alt={roomType.name}
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/30 hover:bg-black/10 transition duration-300" />
                    <div className="flex flex-col absolute left-6 bottom-6 md:left-12 md:bottom-12 xl:left-18 xl:bottom-18 z-10 lg:gap-6 gap-3 text-white">
                      <h1 className="text-h4 md:text-[32px] line-clamp-1">
                        {roomType.name}
                      </h1>
                      <span className="flex text-base items-center justify-start gap-2">
                        Explore Room
                        <FaArrowRight size="18" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          {slides &&
            slides.map((index) => (
              <div
                className={`embla__slide embla__slide_room_images`}
                key={`room-${index}`}
              >
                {/* <div className="embla__slide__number">{index + 1}</div> */}
                <img
                  src={index}
                  alt={`slide-${index}`}
                  className={`object-cover embla__slide__number embla__slide__img rounded-sm w-full`}
                />
              </div>
            ))}
        </div>
      </div>

      {slides?.length > 1 && (
        <>
          <div
            className="absolute top-1/2 md:left-[100px] left-[0px] transform translate-x-1/2 -translate-y-1/2
          rounded-full border border-util-white"
          >
            <PrevButton
              onClick={onPrevButtonClick}
              disabled={prevBtnDisabled}
            />
          </div>

          <div
            className="absolute top-1/2 md:right-[160px] right-[60px] transform translate-x-1/2 -translate-y-1/2
          rounded-full border border-util-white"
          >
            <NextButton
              onClick={onNextButtonClick}
              disabled={nextBtnDisabled}
            />
          </div>
        </>
      )}

      {roomTypes?.length > 1 && (
        <>
          <div className="flex justify-between items-center w-[152px] mx-auto my-10">
            <div className="rounded-full border border-gray-600">
              <PrevButton
                onClick={onPrevButtonClick}
                disabled={prevBtnDisabled}
                className="text-gray-600"
              />
            </div>

            <div className="rounded-full border border-gray-600">
              <NextButton
                onClick={onNextButtonClick}
                disabled={nextBtnDisabled}
                className="text-gray-600"
              />
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default EmblaCarousel;
