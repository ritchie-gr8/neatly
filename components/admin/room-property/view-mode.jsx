import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import CustomPagination from "@/components/ui/custom-pagination";
import { formatPrice } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

const ViewMode = ({
  setMode,
  roomTypes,
  loading,
  currentPage,
  handlePageChange,
  handleSelectRoomType,
  searchTerm,
  handleSearchChange,
}) => {
  return (
    <>
      <div className="flex justify-between items-center mb-6 border-b border-brown-300 px-16 py-4">
        <h5 className="text-h5 font-semibold text-gray-900">Room & Property</h5>
        <div className="flex items-center gap-4">
          <div className="relative w-[320px] text-gray-900 text-b1">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2"
              size={16}
            />
            <Input
              className="pl-10 bg-white placeholder:text-gray-600"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => handleSearchChange("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>
          <Button
            onClick={() => setMode("create")}
            className="btn-primary font-open-sans text-base font-semibold text-util-white"
          >
            + Create Room
          </Button>
        </div>
      </div>

      <Card className="mx-16 p-0 overflow-hidden rounded-none">
        <CardContent className="p-0">
          <table className="w-full">
            <thead>
              <tr className="h-[42px]">
                <th className="text-left text-b2 font-medium text-gray-800 bg-gray-300 pl-4">
                  Image
                </th>
                <th className="text-left text-b2 font-medium text-gray-800 bg-gray-300">
                  Room type
                </th>
                <th className="text-left text-b2 font-medium text-gray-800 bg-gray-300">
                  Price
                </th>
                <th className="text-left text-b2 font-medium text-gray-800 bg-gray-300">
                  Promotion price
                </th>
                <th className="text-left text-b2 font-medium text-gray-800 bg-gray-300">
                  Guest(s)
                </th>
                <th className="text-left text-b2 font-medium text-gray-800 bg-gray-300">
                  Bed type
                </th>
                <th className="text-left text-b2 font-medium text-gray-800 bg-gray-300">
                  Room size
                </th>
              </tr>
            </thead>

            <tbody className="text-util-black">
              {loading ? (
                <>
                  {Array.from({ length: 3 }).map((_, index) => (
                    <tr
                      key={index}
                      className="py-6 h-[120px] border-b border-gray-300"
                    >
                      <td className="pl-4">
                        <Skeleton className="w-28 h-16 rounded-xl" />
                      </td>
                      {Array.from({ length: 6 }).map((_, index) => (
                        <td key={index}>
                          <Skeleton className="w-20 h-4 rounded-xl" />
                        </td>
                      ))}
                    </tr>
                  ))}
                </>
              ) : roomTypes.items?.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-4">
                    No room types found
                  </td>
                </tr>
              ) : (
                roomTypes.items?.map((roomType) => (
                  <tr
                    key={roomType.id}
                    className="py-6 h-[120px] border-b border-gray-300 cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                      handleSelectRoomType(roomType.id);
                      setMode("edit");
                    }}
                  >
                    <td className="pl-4">
                      <div className="rounded-sm overflow-hidden w-fit">
                        <img
                          src={roomType.defaultImage}
                          alt={roomType.name}
                          className="w-28 h-16 object-cover"
                        />
                      </div>
                    </td>
                    <td>{roomType.name}</td>
                    <td>{formatPrice(roomType.pricePerNight)}</td>
                    <td>{formatPrice(roomType.promotionPrice)}</td>
                    <td>{roomType.capacity}</td>
                    <td>{roomType.bedType?.bedDescription}</td>
                    <td>{`${roomType.roomSize} sqm`}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {roomTypes.totalPages > 0 && (
        <div className="flex justify-center py-4 mt-8">
          <CustomPagination
            currentPage={currentPage}
            totalPages={roomTypes.totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </>
  );
};

export default ViewMode;
