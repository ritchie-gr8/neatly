import React from "react";
import SearchRoom from "../../components/search-result/search-room";
import RoomLists from "../../components/search-result/room-lists";
import DefaultLayout from "@/layouts/default.layout";
const index = () => {
  return (
    <DefaultLayout title="Search Result" showFooter={true}>
      <div className="bg-gray-200">
        <SearchRoom />
        <RoomLists />
      </div>
    </DefaultLayout>
  );
};

export default index;
