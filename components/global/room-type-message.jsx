import React from 'react';
import RoomTypeCard from './room-type-card';

const RoomTypeMessage = ({ data }) => {
  const { replyTitle, roomTypes, buttonName } = data;

  return (
    <div className="w-full">
      <p className="mb-3 text-gray-700">{replyTitle}</p>
      <div className="flex overflow-x-auto pb-4 gap-4 hide-scrollbar">
        {roomTypes.map((room) => (
          <RoomTypeCard
            key={room.id}
            room={room}
            buttonLabel={buttonName}
          />
        ))}
        {/* Phantom element */}
        <div className="flex-shrink-0 w-52"></div>
      </div>
    </div>
  );
};

export default RoomTypeMessage;
