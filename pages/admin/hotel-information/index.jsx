import { z } from "zod";
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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import ImageUploader from "@/components/global/image-uploader";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import api from "@/lib/axios";
import AdminLayout from "@/layouts/admin.layout";

const hotelInfoSchema = z.object({
  hotelName: z.string().min(2, "Hotel name must be at least 2 characters"),
  hotelDescription: z.string().min(10, "Description must be at least 10 characters"),
  hotelUrl: z.string().optional(),
  hotelUrlPublicId: z.string().optional(),
});

const HotelInfoPage = () => {
  const [previewImage, setPreviewImage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const form = useForm({
    resolver: zodResolver(hotelInfoSchema),
    defaultValues: {
      hotelName: "",
      hotelDescription: "",
      hotelUrl: "",
      hotelUrlPublicId: "",
    },
  });

  const handleImageChange = ({ url, file }) => {
    setPreviewImage(url);
    setImageFile(file);
  };

  useEffect(() => {
    const fetchHotelInfo = async () => {
      try {
        const response = await api.get("/admin/hotel");
        const hotelData = response.data;

        form.reset({
          hotelName: hotelData.hotelName || "",
          hotelDescription: hotelData.hotelDescription || "",
          hotelUrl: hotelData.hotelUrl || "",
          hotelUrlPublicId: hotelData.hotelUrlPublicId || "",
        });

        if (hotelData.hotelUrl) {
          setPreviewImage(hotelData.hotelUrl);
        }
      } catch (error) {
        console.error("Error fetching hotel information:", error);
        toast.error("Failed to load hotel information");
      } finally {
        setInitialLoading(false);
      }
    };

    fetchHotelInfo();
  }, []);

  const onSubmit = async (data) => {
    setIsLoading(true);
    let public_id = data.hotelUrlPublicId;

    try {
      // Upload new image if changed
      if (imageFile) {
        try {
          const formData = new FormData();
          formData.append("image", imageFile);

          const response = await api.post("/images/upload", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          const result = response.data;
          data.hotelUrl = result.url;
          data.hotelUrlPublicId = result.public_id;
          public_id = result.public_id;

          if (form.getValues("hotelUrlPublicId")) {
            await api.post("/images/delete", {
              public_id: form.getValues("hotelUrlPublicId"),
            });
          }
        } catch (error) {
          console.error("Error uploading image:", error);
          toast.error("Failed to upload hotel logo");
          setIsLoading(false);
          return;
        }
      }

      // Update hotel information
      const response = await api.put("/admin/hotel", {
        hotelName: data.hotelName,
        hotelDescription: data.hotelDescription,
        hotelUrl: data.hotelUrl,
        hotelUrlPublicId: data.hotelUrlPublicId,
      });

      if (response.status === 200) {
        toast.success("Hotel information updated successfully");
      }
    } catch (error) {
      toast.error(error?.message || "An error occurred while updating hotel information");
      // If new image was uploaded but update failed, delete the new image
      if (imageFile && public_id !== form.getValues("hotelUrlPublicId")) {
        try {
          await api.post("/images/delete", {
            public_id: public_id,
          });
        } catch (deleteError) {
          console.error("Error deleting image:", deleteError);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminLayout title="Hotel Information | Admin">
      <div className="flex justify-between items-center mb-6 border-b border-brown-300 px-16 py-4 bg-util-white">
        <h5 className="text-h5 font-semibold text-gray-900">Hotel Information</h5>
        <Button
          type="submit"
          form="hotel-info-form"
          className="btn-primary font-open-sans text-base font-semibold text-util-white"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "Update"
          )}
        </Button>

      </div>

      <div className="w-full px-16 pt-10">
        {initialLoading ? (
          <div className="flex justify-center items-center h-60">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <Form {...form}>
            <form
              id="hotel-info-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="font-inter text-gray-900 w-full flex flex-col gap-6 bg-white p-6 rounded-lg shadow-sm"
            >
              <FormField
                control={form.control}
                name="hotelName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>Hotel name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter hotel name"
                        className="placeholder:text-gray-600 bg-util-white"
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="hotelDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>Hotel description</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Enter hotel description"
                        className="placeholder:text-gray-600 bg-util-white min-h-32"
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="hotelUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hotel logo</FormLabel>
                    <FormControl>
                      <ImageUploader
                        imageUrl={previewImage}
                        onChange={handleImageChange}
                        isContain={true}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        )}
      </div>
    </AdminLayout>
  );
};

export default HotelInfoPage;
