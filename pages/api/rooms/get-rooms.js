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
    
    try {
        const roomTypes = await db.roomType.findMany({
            include: {
                roomImages: true,
                bedType: true
            }
        });
        
        if (roomTypes.length === 0) {
            return successResponse({
                res,
                message: "No room types found",
                data: [],
                maxCapacity: 0
            });
        }
        
        const capacities = roomTypes.map(room => {
            const capacity = parseInt(room.capacity || 0);
            return isNaN(capacity) ? 0 : capacity;
        });
        
        const maxCapacity = Math.max(...capacities);
        
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
        
        const finalMaxCapacity = maxCapacity > 0 ? maxCapacity : 10;
        
        return successResponse({
            res,
            message: "Room types fetched successfully",
            data: formattedRooms,
            maxCapacity: finalMaxCapacity
        });
    } catch (error) {
        return errorResponse({
            res,
            message: "Internal server error",
        });
    }
}