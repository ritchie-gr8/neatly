import React, { useState } from "react";
import SearchRoom from "../../components/search-result/search-room";
import RoomLists from "../../components/search-result/room-lists";
import DefaultLayout from "@/layouts/default.layout";
import LoadingOverlay from "../../components/global/loading-overlay";

const index = () => {
  const [isBooking, setIsBooking] = useState(false);
  return (
    <DefaultLayout title="Search Result" showFooter={true}>
      <LoadingOverlay isLoading={isBooking} message="Booking..." />
      <div className="bg-util-bg">
        <SearchRoom/>
        <RoomLists isBooking={isBooking} setIsBooking={setIsBooking} />
      </div>
    </DefaultLayout>
  );
};

export default index;
