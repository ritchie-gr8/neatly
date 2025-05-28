import React from "react";
// import Image from 'next/image';
import { formatPrice } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

const RoomTypeCard = ({ room, buttonLabel }) => {
  const {
    name,
    imageUrl,
    pricePerNight,
    promotionPrice,
    isPromotion,
    id,
    description,
  } = room;

  return (
    <div className="flex-shrink-0 w-60 bg-white rounded-lg shadow-md overflow-hidden">
      <div className="h-36 bg-gray-200 relative">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No image available
          </div>
        )}
        {/* Next.js Image component for future use when using internal images:
            <Image
              src={imageUrl}
              alt={name}
              fill
              sizes="(max-width: 768px) 100vw, 256px"
              className="object-cover"
              priority={false}
            />
          */}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 line-clamp-1 font-inter">
          {name}
        </h3>
        <div>
          {isPromotion ? (
            <div className="flex items-center">
              <span className="text-orange-500 font-semibold">
                THB {formatPrice(promotionPrice)}
              </span>
              <span className="ml-2 text-gray-700 line-through text-sm">
                THB {formatPrice(pricePerNight)}
              </span>
            </div>
          ) : (
            <span className="font-semibold text-gray-700">
              THB {formatPrice(pricePerNight)}
            </span>
          )}
        </div>
        <p className="text-b2 font-medium text-gray-600 line-clamp-2">
          {description}
        </p>
      </div>
      <button
        className="cursor-pointer w-full bg-orange-100 text-orange-500 py-2 px-4 font-semibold
        flex items-center justify-between hover:bg-orange-600 hover:text-white"
        onClick={() => {
          console.log(`View details for room ${id}`);
        }}
      >
        {buttonLabel}
        <ChevronRight className="ml-2 size-5" />
      </button>
    </div>
  );
};

export default RoomTypeCard;
