import { Form } from "@/components/ui/form";
import React, { Suspense, useEffect, useState } from "react";
import OptionForm from "./forms/options-form";
import RoomTypeForm from "./forms/roomtype-form";
import MessageForm from "./forms/message-form";
import api from "@/lib/axios";

const ResponseForm = ({ replyFormat, className }) => {
  const [roomTypes, setRoomTypes] = useState([]);

  useEffect(() => {
    const fetchRoomTypes = async () => {
      const response = await api.get("/room-type");
      const { data: roomTypes } = response.data;
      setRoomTypes(roomTypes);
    };
    fetchRoomTypes();
  }, []);

  return (
    <Form>
      <form>
        {replyFormat === "room-type" && (
          <Suspense fallback={<div>Loading...</div>}>
            <RoomTypeForm className={className} roomTypes={roomTypes} />
          </Suspense>
        )}
        {replyFormat === "message" && <MessageForm className={className} />}
        {replyFormat === "option" && <OptionForm className={className} />}
      </form>
    </Form>
  );
};

export default ResponseForm;
