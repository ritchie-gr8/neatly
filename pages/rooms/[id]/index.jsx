import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import DefaultLayout from "@/layouts/default.layout";
import api from "@/lib/axios";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import EmblaCarousel from "@/components/global/embla/embla-carousel";
import { Loader2 } from "lucide-react";
import { FaArrowRight } from "react-icons/fa";
import { Skeleton } from "@/components/ui/skeleton";

const RoomDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [roomType, setRoomType] = useState(null);
  const [roomTypes, setRoomTypes] = useState([]);
  const [roomImages, setRoomImages] = useState([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Only fetch data when id is available (after hydration)
    if (!id) return;

    const fetchRoomType = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/room-type/${id}`);
        const { roomType } = response.data;

        setRoomType(roomType);
        setRoomImages(roomType.images);
      } catch (err) {
        console.error("Error fetching room type:", err);
        setError("Failed to load room details");
      } finally {
        setLoading(false);
      }
    };

    fetchRoomType();
  }, [id]);

  useEffect(() => {
    const fetchRoomTypes = async () => {
      setLoading(true);
      try {
        const response = await api.get("/room-type");
        const data = response.data.roomTypes;
        setRoomTypes(data);
      } catch (error) {
        console.error("Error fetching room types:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRoomTypes();
  }, []);

  const formatPrice = (price, withCurrency = true) => {
    return new Intl.NumberFormat("en-US", {
      style: withCurrency ? "currency" : "decimal",
      currency: "THB",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <DefaultLayout
      title={roomType ? `${roomType.name} | Neatly` : "Room Details | Neatly"}
      showFooter={true}
    >
      <div className="mx-auto bg-util-bg flex flex-col">
        {loading || !roomType ? (
          <div className="h-fit flex flex-col">
            {/* Skeleton for image carousel */}
            <div className="w-full pt-0 md:pt-20">
              <div className="relative w-full">
                <Skeleton className="w-full h-[250px] md:h-[581px] bg-gray-300 rounded-none" />
                <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
                  <Skeleton className="w-10 h-10 bg-gray-300 rounded-full" />
                </div>
                <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
                  <Skeleton className="w-10 h-10 bg-gray-300 rounded-full" />
                </div>
              </div>
            </div>

            {/* Skeleton for room details */}
            <div className="px-6 py-8 md:w-[80%] lg:w-[60%] xl:w-[50%] mx-auto relative">
              <Skeleton className="h-10 w-3/4 mb-10 md:mb-16 bg-gray-300" />

              <div className="flex flex-col md:flex-row justify-between md:gap-20">
                <div className="flex flex-col gap-6 justify-between">
                  <Skeleton className="h-20 w-full bg-gray-300" />

                  <div className="flex flex-wrap gap-6">
                    <Skeleton className="h-6 w-20 bg-gray-300" />
                    <Skeleton className="h-6 w-32 bg-gray-300" />
                    <Skeleton className="h-6 w-20 bg-gray-300" />
                  </div>
                </div>

                <div className="mt-10 md:text-right flex md:flex-col items-center justify-between md:mt-0">
                  <div className="mb-6 flex flex-col items-end">
                    <Skeleton className="h-6 w-24 mb-2 bg-gray-300" />
                    <Skeleton className="h-8 w-32 bg-gray-300" />
                  </div>

                  <Skeleton className="h-10 w-[120px] bg-gray-300" />
                </div>
              </div>

              <Separator className="mt-6 md:mt-20 mb-10" />

              {/* Skeleton for amenities */}
              <div className="mt-6 mb-10 md:mb-30">
                <Skeleton className="h-8 w-40 mb-4 bg-gray-300" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-8">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Skeleton className="w-1 h-1 bg-gray-300 rounded-full" />
                      <Skeleton className="h-6 w-24 bg-gray-300" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Skeleton for other rooms */}
            <div className="w-full bg-green-200 pb-10">
              <Skeleton className="h-10 w-48 mx-auto my-10" />
              <div className="flex gap-4 px-6 overflow-hidden">
                {[...Array(3)].map((_, i) => (
                  <Skeleton
                    key={i}
                    className="flex-[0_0_100%] md:flex-[0_0_60%] lg:flex-[0_0_50%] xl:flex-[0_0_40%] 2xl:flex-[0_0_30%] h-[340px]"
                  />
                ))}
              </div>
            </div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 my-8">
            <p>{error}</p>
            <Button
              className="mt-4"
              variant="outline"
              onClick={() => router.back()}
            >
              Go Back
            </Button>
          </div>
        ) : (
          roomType && (
            <div className="h-fit flex flex-col bg-util-bg">
              {roomImages.length > 0 && (
                <div className="w-full pt-0 md:pt-20">
                  <EmblaCarousel slides={roomImages} options={{ loop: true }} />
                </div>
              )}

              {/* Room Details */}
              <div className="px-6 py-8 md:w-[80%] lg:w-[60%] xl:w-[50%] mx-auto relative">
                <h2 className="text-h2 font-medium text-green-800 mb-10 md:mb-16">
                  {roomType.name}
                </h2>

                <div className="flex flex-col md:flex-row justify-between md:gap-20">
                  <div className="flex flex-col gap-6 justify-between">
                    <p className="text-b1 text-gray-700">
                      Rooms ({roomType.roomSize}sqm) with full garden views,{" "}
                      {roomType.bedType?.bedDescription || "comfortable bed"},
                      bathroom with bathtub & shower.
                    </p>

                    <div className="flex flex-wrap gap-6 text-gray-700">
                      <div className="flex items-center gap-2">
                        <span>{roomType.capacity} Person</span>
                      </div>
                      <div className="flex items-center gap-2 border-r border-l border-gray-500 px-4">
                        <span>
                          {roomType.bedType?.bedDescription || "1 Double bed"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>{roomType.roomSize} sqm</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-10 md:text-right flex md:flex-col items-center justify-between md:mt-0">
                    {/* Price Section */}
                    <div className="mb-6">
                      {roomType.isPromotion && roomType.promotionPrice ? (
                        <div>
                          <p className="text-gray-700 line-through">
                            THB {formatPrice(roomType.pricePerNight, false)}
                          </p>
                          <p className="text-[24px] font-semibold text-gray-900">
                            THB {formatPrice(roomType.promotionPrice, false)}
                          </p>
                        </div>
                      ) : (
                        <div>
                          <p className="text-[24px] font-semibold text-gray-900">
                            THB {formatPrice(roomType.pricePerNight, false)}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Book Now Button */}
                    <Button
                      className="btn-primary rounded-sm py-2 px-6 w-[120px]"
                      onClick={() =>
                        router.push(
                          `/search-result?checkIn=${
                            new Date().toISOString().split("T")[0]
                          }&checkOut=${
                            new Date().toISOString().split("T")[0]
                          }&rooms=1&guests=1`
                        )
                      }
                    >
                      Book Now
                    </Button>
                  </div>
                </div>

                <Separator className="mt-6 md:mt-20 mb-10" />

                {/* Amenities */}
                {roomType.amenities && roomType.amenities.length > 0 && (
                  <div className="mt-6 mb-10 md:mb-36">
                    <h2 className="text-h5 text-util-black font-medium mb-4">
                      Room Amenities
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-8">
                      {roomType.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
                          <span className="text-gray-700 text-b1">
                            {amenity.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {roomTypes.length > 0 && (
                <div className="w-full bg-green-200">
                  <h3 className="text-green-800 text-h3 text-center my-10">
                    Other Rooms
                  </h3>
                  <EmblaCarousel
                    options={{ loop: true }}
                    roomTypes={roomTypes}
                  />
                </div>
              )}
            </div>
          )
        )}
      </div>
    </DefaultLayout>
  );
};

export default RoomDetailPage;
