import { Form } from "@/components/ui/form";
import React, { Suspense, useEffect, useState } from "react";
import OptionForm from "./forms/options-form";
import RoomTypeForm from "./forms/roomtype-form";
import MessageForm from "./forms/message-form";
import api from "@/lib/axios";
import { REPLY_FORMAT } from "@/constants/chatbot";

const ResponseForm = ({replyFormat, className, mode}) => {
  const [roomTypes, setRoomTypes] = useState([]);

  useEffect(() => {
    const fetchRoomTypes = async () => {
      try {
        const response = await api.get("/room-type");
        const { roomTypes } = response.data;
        setRoomTypes(roomTypes || []);
      } catch (error) {
        console.error("Error fetching room types:", error);
      }
    };

    if (replyFormat === REPLY_FORMAT.ROOMTYPES || roomTypes.length === 0) {
      fetchRoomTypes();
    }
  }, [replyFormat]);

  return (
    <Form>
      <form>
        {replyFormat === REPLY_FORMAT.ROOMTYPES && (
          <Suspense fallback={<div>Loading...</div>}>
            <RoomTypeForm
              className={className}
              roomTypes={roomTypes}
              mode={mode}
            />
          </Suspense>
        )}
        {replyFormat === REPLY_FORMAT.MESSAGE && (
          <MessageForm
            className={className}
            mode={mode}
          />
        )}
        {replyFormat === REPLY_FORMAT.OPTIONS && (
          <OptionForm
            className={className}
            mode={mode}
          />
        )}
      </form>
    </Form>
  );
};

export default ResponseForm;
