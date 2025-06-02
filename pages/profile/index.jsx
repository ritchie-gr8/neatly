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
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import DefaultLayout from "@/layouts/default.layout";
import api from "@/lib/axios";
import { useForm } from "react-hook-form";
import ImageUploader from "@/components/global/image-uploader";
import { useEffect, useState, useContext } from "react";
import { toast } from "sonner";
import { COUNTRY } from "@/constants/country";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CustomDatePicker from "@/components/global/date-picker";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { AuthContext } from "@/contexts/auth-context";

const profileSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters long"),
  lastName: z.string().min(2, "Last name must be at least 2 characters long"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters long"),
  dateOfBirth: z.date({ message: "Invalid date" }),
  country: z.string().min(2, "Country must be at least 2 characters long"),
  profilePicture: z.string().optional(),
  profilePicturePublicId: z.string().optional(),
});

const ProfilePage = () => {
  const { user, loading: authLoading, updateProfile } = useContext(AuthContext);
  const [previewImage, setPreviewImage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState(null);

  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dateOfBirth: "",
      country: "",
      profilePicture: "",
      profilePicturePublicId: "",
    },
  });

  const formState = form.formState;

  const disableDateUnder18 = (date) => {
    const today = new Date();
    const eighteenYearsAgo = new Date(
      today.getFullYear() - 18,
      today.getMonth(),
      today.getDate()
    );

    return date > today || date > eighteenYearsAgo;
  };

  const getMinAndMaxYear = () => {
    const today = new Date();
    const eighteenYearsAgo = new Date(
      today.getFullYear() - 18,
      today.getMonth(),
      today.getDate()
    );

    const seventyYearsAgo = new Date(
      today.getFullYear() - 70,
      today.getMonth(),
      today.getDate()
    );

    return {
      maxYear: eighteenYearsAgo.getFullYear(),
      minYear: seventyYearsAgo.getFullYear(),
      maxDate: eighteenYearsAgo,
      minDate: seventyYearsAgo,
    };
  };

  const handleDateChange = (date) => {
    setDateOfBirth(date);
    form.setValue("dateOfBirth", date);
  };

  const handleImageChange = ({ url, file }) => {
    setPreviewImage(url);
    setImageFile(file);
  };

  // Load user data from AuthContext
  useEffect(() => {
    if (user) {
      // Set form values from user context
      form.reset({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
        country: user.country || "",
        dateOfBirth: user.dateOfBirth ? new Date(user.dateOfBirth) : "",
        profilePicture: user.profilePicture || "",
        profilePicturePublicId: user.profilePicturePublicId || "",
      });

      // Set preview image if available
      if (user.profilePicture) {
        setPreviewImage(user.profilePicture);
      }

      // Set date of birth
      if (user.dateOfBirth) {
        setDateOfBirth(new Date(user.dateOfBirth));
      }

    }
  }, [user, form]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    let public_id = data.profilePicturePublicId;

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
          data.profilePicture = result.url;
          data.profilePicturePublicId = result.public_id;
          public_id = result.public_id;

          if (form.getValues("profilePicturePublicId")) {
            await api.post("/images/delete", {
              public_id: form.getValues("profilePicturePublicId"),
            });
          }
        } catch (error) {
          console.error("Error uploading image:", error);
          toast.error("Failed to upload profile image");
          setIsLoading(false);
          return;
        }
      } else if (!imageFile && public_id) {
        await api.post("/images/delete", {
          public_id: public_id,
        });
        data.profilePicture = "";
        data.profilePicturePublicId = "";
      }

      // Update profile
      const response = await api.put("/auth/update-profile", data);

      if (response.data && response.data.user) {
        // Update the user data in AuthContext
        updateProfile(response.data.user);
        toast.success("Profile updated successfully");
      }
    } catch (error) {
      toast.error(error?.message || "An error occurred while updating profile");
      // If new image was uploaded but profile update failed, delete the new image
      if (imageFile && public_id !== form.getValues("profilePicturePublicId")) {
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
    <DefaultLayout title="Profile | Neatly">
      <div className="w-full h-fit sm:h-screen mx-auto py-10 px-4 bg-util-bg md:px-64 md:py-20">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-h2 text-green-800 font-medium">Profile</h2>
          <Button
            type="submit"
            form="profile-form"
            className="btn-primary hidden sm:flex"
            disabled={isLoading || authLoading}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Update Profile"
            )}
          </Button>
        </div>

        {authLoading ? (
          <div className="flex justify-center items-center h-60">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <Form {...form}>
            <form
              id="profile-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="font-inter text-gray-900 w-full flex flex-col gap-10 h-fit"
            >
              <h5 className="text-gray-600 text-h5">Basic Information</h5>
              <div className="flex flex-col sm:grid sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>First name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter your first name"
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
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>Last name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter your last name"
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
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter your email"
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
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>Phone number</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter your phone number"
                          className="placeholder:text-gray-600 bg-util-white"
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                {dateOfBirth && (
                  <FormField
                    control={form.control}
                    name="dateOfBirth"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel required>Date of Birth</FormLabel>
                        <FormControl>
                          <CustomDatePicker
                            className={cn(
                              "mb-0 py-1 px-3 w-full border-1 border-input shadow-xs h-9 rounded-md",
                              formState.errors.dateOfBirth &&
                                "border border-red-500"
                            )}
                            value={dateOfBirth}
                            defaultValue={dateOfBirth}
                            disabledDate={disableDateUnder18}
                            onDateChange={(date) => {
                              handleDateChange(date);
                              field.onChange(date);
                            }}
                            minYear={getMinAndMaxYear().minYear}
                            maxYear={getMinAndMaxYear().maxYear}
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                )}
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel required>Country</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value} // Changed from defaultValue to value for controlled component
                        disabled={isLoading}
                      >
                        <FormControl>
                          <SelectTrigger
                            className={cn(
                              "w-full border border-gray-300 rounded-md p-3 h-[36px] cursor-pointer bg-white shadow-xs",
                              field.value ? "text-black" : "text-gray-600",
                              formState.errors.country && "border-red-500"
                            )}
                          >
                            <SelectValue placeholder="Select your country" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-white text-black">
                          {Object.entries(COUNTRY).map(([code, name]) => (
                            <SelectItem
                              key={code}
                              value={code}
                              className="text-black hover:bg-gray-100"
                            >
                              {name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-xs mt-1 text-red-500" />
                    </FormItem>
                  )}
                />
              </div>
              <Separator />
              <FormField
                control={form.control}
                name="profilePicture"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="!text-gray-600 text-h5 mb-10">
                      Profile Picture
                    </FormLabel>
                    <FormControl>
                      <ImageUploader
                        imageUrl={previewImage}
                        onChange={handleImageChange}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              {/* Mobile Update Button */}
              <Button
                type="submit"
                className="btn-primary w-full mt-5 sm:hidden"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Update Profile"
                )}
              </Button>
            </form>
          </Form>
        )}
      </div>
    </DefaultLayout>
  );
};

export default ProfilePage;
