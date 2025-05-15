import { errorResponse, successResponse } from "@/lib/response-utils"; 
import { HTTP_STATUS } from "@/constants/http-status"; 
import { db } from "@/lib/prisma"; 

export default async function handler(req, res) {
    if(req.method !== "GET"){
        return errorResponse({
            res,
            message: "Method not allowed",
            status: HTTP_STATUS.METHOD_NOT_ALLOWED,
        })
    }
    
    try{
        const { checkIn, checkOut, rooms, guests } = req.query;
        const roomsCount = parseInt(rooms) || 1;
        const guestsCount = parseInt(guests) || 1;
        
        const allRoomTypes = await db.roomType.findMany({
            select: {
                capacity: true
            }
        });
        
        const maxCapacity = Math.max(...allRoomTypes.map(room => room.capacity || 0), 1);
        
        const whereCondition = {};
        
        if (guestsCount > 0 && roomsCount > 0) {
            const guestsPerRoom = Math.ceil(guestsCount / roomsCount);
            whereCondition.capacity = {
                gte: guestsPerRoom 
            };
        }
        
        const roomTypes = await db.roomType.findMany({
            where: whereCondition,
            include: {
                roomImages: true,
                bedType: true
            }
        });
        
        if (roomTypes.length === 0) {
            return successResponse({
                res,
                message: "There are no rooms that fit your search parameters.",
                data: [],
                maxCapacity: maxCapacity
            });
        }
        
        const formattedRooms = roomTypes.map(roomType => {
            return {
                id: roomType.id,
                roomType: {
                    ...roomType,
                    capacity: roomType.capacity || 2,
                    roomSize: roomType.roomSize || "N/A"
                }
            };
        });
        
        return successResponse({
            res,
            message: "The room search has successfully finished.",
            data: formattedRooms,
            maxCapacity: maxCapacity,
            searchParams: { rooms: roomsCount, guests: guestsCount }
        });
    }
    catch(error){
        return errorResponse({
            res,
            message: "There was a mistake in the system.",
            error: error.message
        });
    }
}