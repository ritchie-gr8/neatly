import React, { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import ImageUploader from "@/components/global/image-uploader";
import RoomImagesUploader from "./room-images-uploader";
import { arrayMove } from "@dnd-kit/sortable";
import AmenitiesInput from "./amenities-input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import api from "@/lib/axios";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import LoadingOverlay from "@/components/global/loading-overlay";

const createRoomTypeSchema = z
  .object({
    name: z.string().min(1, "Room type name is required"),
    roomSize: z.coerce
      .number()
      .refine((value) => value > 0, "Room size must be greater than 0"),
    bedTypeId: z.string().min(1, "Bed type is required"),
    capacity: z.coerce
      .number()
      .refine((value) => value > 0, "Capacity must be greater than 0"),
    pricePerNight: z.coerce
      .number()
      .refine((value) => value > 0, "Price per night must be greater than 0"),
    isPromotion: z.boolean().default(false),
    promotionPrice: z.coerce
      .number()
      .optional()
      .refine(
        (value) => !value || value > 0,
        "Promotion price must be greater than 0"
      ),
    roomDescription: z.string().min(1, "Room description is required"),
    mainImage: z.string().optional(),
    mainImagePublicId: z.string().optional(),
  })
  .refine(
    (data) =>
      !data.isPromotion ||
      (data.promotionPrice !== undefined && data.promotionPrice > 0),
    {
      message: "Promotion price is required",
      path: ["promotionPrice"],
    }
  );

const EditorMode = ({ setMode, selectedRoomTypeId, setLastAction }) => {
  const [previewImage, setPreviewImage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [roomImages, setRoomImages] = useState([]);
  const [originalRoomImages, setOriginalRoomImages] = useState([]);
  const [isRoomImagesValid, setIsRoomImagesValid] = useState(true);
  const [amenities, setAmenities] = useState([]);
  const [bedTypes, setBedTypes] = useState([]);
  const [isLoadingBedTypes, setIsLoadingBedTypes] = useState(false);
  const [roomTypeName, setRoomTypeName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [mainImageError, setMainImageError] = useState("");
  const [roomImagesError, setRoomImagesError] = useState("");
  const minRoomImages = 4;

  const form = useForm({
    resolver: zodResolver(createRoomTypeSchema),
    defaultValues: {
      name: "",
      roomSize: "",
      bedTypeId: "",
      capacity: "",
      pricePerNight: "",
      isPromotion: false,
      promotionPrice: "",
      roomDescription: "",
      mainImage: "",
      mainImagePublicId: "",
    },
  });

  const isPromotion = form.watch("isPromotion");

  const handleImageChange = ({ url, file }) => {
    setPreviewImage(url);
    setImageFile(file);
  };

  const handleRoomImageUpload = (imageData) => {
    const newImage = {
      id: `img-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      src: imageData.src,
      file: imageData.file,
    };
    const updatedImages = [newImage, ...roomImages];
    setRoomImages(updatedImages);
    setIsRoomImagesValid(updatedImages.length >= minRoomImages);

    if (updatedImages.length >= minRoomImages) {
      setRoomImagesError("");
    }
  };

  const handleRoomImageRemove = (imageId) => {
    const updatedImages = roomImages.filter((img) => img.id !== imageId);
    setRoomImages(updatedImages);
    setIsRoomImagesValid(updatedImages.length >= minRoomImages);

    if (updatedImages.length < minRoomImages) {
      setRoomImagesError(`At least ${minRoomImages} room images are required`);
    }
  };

  const handleRoomImagesReorder = (oldIndex, newIndex) => {
    const updatedImages = arrayMove([...roomImages], oldIndex, newIndex);
    setRoomImages(updatedImages);
  };

  const handleAmenitiesChange = useCallback((newAmenities) => {
    setAmenities(newAmenities);
  }, []);

  const handleDeleteRoomType = async () => {
    if (!selectedRoomTypeId) return;

    try {
      setIsDeleting(true);

      const mainImagePublicId = form.getValues("mainImagePublicId");
      if (mainImagePublicId) {
        api
          .post("/images/delete", { public_id: mainImagePublicId })
          .catch((error) => {
            console.error("Error deleting main image:", error);
          });
      }

      if (originalRoomImages.length > 0) {
        originalRoomImages.forEach((image) =>
          api
            .post("/images/delete", {
              public_id: image.publicId,
            })
            .catch((error) => {
              console.error("Error deleting image:", error);
            })
        );
      }

      await api.delete(`/admin/room-type/${selectedRoomTypeId}`);

      toast.success("Room type deleted successfully");

      setLastAction("delete");
      setMode("view");
    } catch (error) {
      console.error("Error deleting room type:", error);
      toast.error(
        error.response?.data?.message || "Failed to delete room type"
      );
    } finally {
      setIsDeleting(false);
    }
  };

  const onSubmit = async (data) => {
    const isValid = await form.trigger();

    if (
      data.isPromotion &&
      (!data.promotionPrice || data.promotionPrice <= 0)
    ) {
      form.setError("promotionPrice", {
        message: "Promotion price is required",
      });
      return;
    }

    if (!isValid) return;

    let hasImageErrors = false;
    if (!selectedRoomTypeId && !imageFile) {
      setMainImageError("Main image is required");
      hasImageErrors = true;
    } else if (selectedRoomTypeId && !imageFile && !previewImage) {
      setMainImageError("Main image is required");
      hasImageErrors = true;
    } else {
      setMainImageError("");
    }

    if (roomImages.length < minRoomImages) {
      setRoomImagesError(`At least ${minRoomImages} room images are required`);
      hasImageErrors = true;
    } else {
      setRoomImagesError("");
    }

    if (hasImageErrors) return;

    setIsSubmitting(true);
    try {
      let roomTypeId = selectedRoomTypeId;

      if (selectedRoomTypeId) {
        const updateResponse = await api.put(
          `/admin/room-type/${selectedRoomTypeId}`,
          {
            ...data,
          }
        );
        // console.log("Room type updated:", updateResponse.data);
      } else {
        const createResponse = await api.post("/admin/room-type/create", {
          ...data,
        });
        // console.log("Room type created:", createResponse.data);

        roomTypeId = createResponse.data.id;
      }

      if (imageFile && roomTypeId) {
        try {
          const mainImageFormData = new FormData();
          mainImageFormData.append("image", imageFile);
          mainImageFormData.append("roomTypeId", roomTypeId);

          const mainImageResponse = await api.post(
            "/admin/room-image/upload-main",
            mainImageFormData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

          // console.log("Main image uploaded:", mainImageResponse.data);
        } catch (mainImageError) {
          console.error("Error uploading main image:", mainImageError);
        }
      }

      if (roomImages.length >= minRoomImages && roomTypeId) {
        try {
          const uploadPromises = roomImages.map(async (image) => {
            try {
              // Case 1: Already uploaded image
              if (!image.file && image.src) {
                return {
                  url: image.src,
                  publicId: image.publicId || "",
                };
              }

              // Case 2: New image to upload
              if (image.file) {
                const formData = new FormData();
                formData.append("image", image.file);
                formData.append("folder", "room-types");

                const response = await api.post("/images/upload", formData, {
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                });

                const result = response.data;

                return {
                  url: result.url,
                  publicId: result.public_id,
                };
              }

              // Case 3: Invalid image
              return null;
            } catch (error) {
              console.error("Image upload failed:", error);
              return null;
            }
          });

          const roomImagesData = (await Promise.all(uploadPromises)).filter(
            Boolean
          );

          if (selectedRoomTypeId) {
            const removedImages = originalRoomImages.filter((origImg) => {
              return !roomImages.some(
                (currentImg) => currentImg.id === origImg.id
              );
            });

            removedImages.forEach((image) => {
              if (image.publicId) {
                api
                  .post("/images/delete", { public_id: image.publicId })
                  .catch((error) => {
                    console.error("Error deleting Cloudinary image:", error);
                  });
              }
            });
          }

          if (roomImagesData.length > 0) {
            const batchImagesResponse = await api.post(
              "/admin/room-image/upload-batch",
              {
                roomTypeId,
                images: roomImagesData,
                replaceExisting: true,
              }
            );
            console.log(
              "Room images uploaded successfully:",
              batchImagesResponse.data
            );
          }
        } catch (roomImagesError) {
          console.error("Error uploading room images:", roomImagesError);
        }
      }

      if (roomTypeId && amenities.length > 0) {
        try {
          const amenityResponse = await api.post("/admin/room-amenity/create", {
            roomTypeId: roomTypeId,
            amenities: amenities,
          });
          console.log("Room amenities created:", amenityResponse.data);
        } catch (amenityError) {
          console.error("Error creating room amenities:", amenityError);
        }
      }

      toast.success(
        selectedRoomTypeId
          ? "Room type updated successfully"
          : "Room type created successfully"
      );

      setLastAction(selectedRoomTypeId ? "update" : "create");
      setMode("view");
    } catch (error) {
      console.error("Error in form submission:", error);
      toast.error("Error saving room type. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchBedTypes = async () => {
      try {
        setIsLoadingBedTypes(true);
        const response = await api.get("/admin/bed-type");
        setBedTypes(response?.data?.bedTypes || []);
      } catch (error) {
        console.error("Error fetching bed types:", error);
        toast.error("Failed to load bed types");
      } finally {
        setIsLoadingBedTypes(false);
      }
    };

    fetchBedTypes();
  }, []);

  useEffect(() => {
    if (selectedRoomTypeId) {
      form.reset();
      setIsLoading(true);

      const fetchRoomTypeData = async () => {
        try {
          const response = await api.get(
            `/admin/room-type/${selectedRoomTypeId}`
          );
          const roomTypeData = response.data;

          setRoomTypeName(roomTypeData.name);
          form.setValue("name", roomTypeData.name || "");
          form.setValue("roomSize", roomTypeData.roomSize?.toString() || "");
          form.setValue("bedTypeId", roomTypeData.bedTypeId?.toString() || "");
          form.setValue("capacity", roomTypeData.capacity?.toString() || "");
          form.setValue(
            "pricePerNight",
            roomTypeData.pricePerNight?.toString() || ""
          );
          form.setValue("isPromotion", roomTypeData.isPromotion || false);
          form.setValue(
            "promotionPrice",
            roomTypeData.promotionPrice?.toString() || ""
          );
          form.setValue("roomDescription", roomTypeData.description || "");

          if (roomTypeData.roomImages && roomTypeData.roomImages.length > 0) {
            const mainImage = roomTypeData.roomImages.find(
              (img) => img.imageDefault === true
            );
            if (mainImage) {
              form.setValue("mainImage", mainImage.imageUrl || "");
              form.setValue("mainImagePublicId", mainImage.imagePublicId || "");
              setPreviewImage(mainImage.imageUrl || "");
            }

            const otherImages = roomTypeData.roomImages.filter(
              (img) => !img.imageDefault
            );

            if (otherImages.length > 0) {
              const formattedImages = otherImages
                .map((img) => ({
                  id: img.id,
                  src: img.imageUrl,
                  publicId: img.imagePublicId,
                  order: img.imageOrder,
                }))
                .sort((a, b) => a.order - b.order);

              setRoomImages(formattedImages);
              setOriginalRoomImages(formattedImages);
              setIsRoomImagesValid(formattedImages.length >= minRoomImages);
            }
          }

          if (roomTypeData.roomAmniety && roomTypeData.roomAmniety.length > 0) {
            setAmenities(
              roomTypeData.roomAmniety.map((amenity) => ({
                id: amenity.id,
                name: amenity.name,
                order: amenity.order,
              }))
            );
          }
        } catch (error) {
          console.error("Error fetching room type data:", error);
          toast.error("Failed to load room type data");
        } finally {
          setIsLoading(false);
        }
      };

      fetchRoomTypeData();
    }
  }, [selectedRoomTypeId, form, minRoomImages]);

  return (
    <>
      <LoadingOverlay
        isLoading={isLoading || isSubmitting}
        message={isSubmitting ? "Saving changes..." : "Loading room data..."}
      />
      <div className="flex justify-between items-center mb-6 border-b border-brown-300 px-16 py-4 bg-white">
        <h5 className="text-h5 font-semibold text-gray-900">
          {selectedRoomTypeId ? (
            <div className="flex items-center gap-2 ">
              <ArrowLeft
                onClick={() => setMode("view", null)}
                className="size-4 cursor-pointer"
              />
              {roomTypeName}
            </div>
          ) : (
            "Create New Room Type"
          )}
        </h5>
        <div className="flex items-center gap-4">
          {selectedRoomTypeId ? (
            <>
              <Button
                type="submit"
                onClick={form.handleSubmit(onSubmit)}
                className="btn-primary font-open-sans text-base font-semibold text-util-white"
              >
                Update
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={() => setMode("view")}
                className="btn-outline font-open-sans text-base font-semibold text-util-white"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                onClick={form.handleSubmit(onSubmit)}
                className="btn-primary font-open-sans text-base font-semibold text-util-white"
              >
                Create
              </Button>
            </>
          )}
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div
            className={cn(
              "mx-16 mt-10 px-20 pt-10 pb-16 bg-util-white flex flex-col gap-10 text-gray-900",
              !selectedRoomTypeId && "mb-36"
            )}
          >
            <h5 className="text-h5 font-semibold text-gray-600">
              Basic Information
            </h5>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Room Type *</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <div className="flex items-center gap-4">
              <FormField
                control={form.control}
                name="roomSize"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Room size(sqm) *</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(e.target.value)}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bedTypeId"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Bed Type *</FormLabel>
                    <FormControl>
                      <Select
                        disabled={isLoadingBedTypes}
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full bg-util-white">
                          <SelectValue placeholder="Select bed type" />
                        </SelectTrigger>
                        <SelectContent>
                          {bedTypes.map((bedType) => (
                            <SelectItem
                              key={bedType.id}
                              value={bedType.id.toString()}
                            >
                              {bedType.bedDescription}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="capacity"
              render={({ field }) => (
                <FormItem className="max-w-[440px]">
                  <FormLabel>Guest(s) *</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="pricePerNight"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Price per night *</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <div className="flex-1 flex items-center gap-4 mt-6">
                <FormField
                  control={form.control}
                  name="isPromotion"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="cursor-pointer text-gray-700 font-normal">
                        Promotion Price
                      </FormLabel>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="promotionPrice"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) => field.onChange(e.target.value)}
                          disabled={!isPromotion}
                          className="disabled:bg-gray-200"
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="roomDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Room Description *</FormLabel>
                  <FormControl>
                    <Textarea {...field} className="h-24" />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <Separator />

            <h5 className="text-h5 font-semibold text-gray-600">Room Image</h5>

            <FormField
              control={form.control}
              name="mainImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Main Image *</FormLabel>
                  <FormControl>
                    <>
                      <ImageUploader
                        imageUrl={previewImage}
                        onChange={(data) => {
                          handleImageChange(data);
                          field.onChange(data.url || "");
                          setMainImageError("");
                        }}
                        width={240}
                        height={240}
                      />
                      {mainImageError && (
                        <div className="text-destructive text-xs mt-1">
                          {mainImageError}
                        </div>
                      )}
                    </>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="roomImages"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Room Images *</FormLabel>
                  <FormControl>
                    <>
                      <RoomImagesUploader
                        value={roomImages}
                        minImages={minRoomImages}
                        isValid={isRoomImagesValid}
                        onUpload={(imageData) => {
                          handleRoomImageUpload(imageData);
                          setRoomImagesError("");
                        }}
                        onRemove={handleRoomImageRemove}
                        onReorder={handleRoomImagesReorder}
                      />
                      {roomImagesError && (
                        <div className="text-destructive text-xs mt-1">
                          {roomImagesError}
                        </div>
                      )}
                    </>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <Separator />

            <h5 className="text-h5 font-semibold text-gray-600">
              Room Amenities
            </h5>
            <FormField
              control={form.control}
              name="amenities"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <AmenitiesInput
                      value={amenities}
                      onChange={handleAmenitiesChange}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
      {selectedRoomTypeId && (
        <Dialog>
          <DialogTrigger asChild>
            <div
              className="flex items-center justify-end gap-2 mt-10 mb-16
            cursor-pointer text-gray-700 font-open-sans mx-16 hover:underline"
            >
              Delete room
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete room</DialogTitle>
              <DialogDescription>
                Do you want to delete this room?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                className="btn-outline"
                onClick={handleDeleteRoomType}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Yes, I want to delete"}
              </Button>
              <DialogClose asChild>
                <Button onClick={() => {}} className="btn-primary">
                  No, I don’t
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default EditorMode;
