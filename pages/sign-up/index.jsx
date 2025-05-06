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
import api, { authApi } from "@/lib/axios";
import { useForm } from "react-hook-form";
import ImageUploader from "@/components/global/image-uploader";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const signUpSchema = z
  .object({
    firstName: z
      .string()
      .min(2, "First name must be at least 2 characters long"),
    lastName: z.string().min(2, "Last name must be at least 2 characters long"),
    username: z.string().min(2, "Username must be at least 2 characters long"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters long"),
    phone: z
      .string()
      .min(10, "Phone number must be at least 10 characters long"),
    dateOfBirth: z
      .string()
      .transform((date) => new Date(date))
      .refine(
        (date) => {
          const today = new Date();
          const twentyYearsAgo = new Date(
            today.getFullYear() - 20,
            today.getMonth(),
            today.getDate()
          );
          return date <= twentyYearsAgo;
        },
        {
          message: "You must be at least 20 years old",
        }
      ),
    country: z.string().min(2, "Country must be at least 2 characters long"),
    profilePicture: z.string().optional(),
    profilePicturePublicId: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const SignUpPage = () => {
  const [previewImage, setPreviewImage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      dateOfBirth: "",
      country: "",
      profilePicture: "",
      profilePicturePublicId: "",
    },
  });

  const handleImageChange = ({ url, file }) => {
    setPreviewImage(url);
    setImageFile(file);
  };

  const onSubmit = async (data) => {
    let public_id = null;

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
      } catch (error) {
        console.error("Error uploading image:", error);
        return;
      }
    }

    try {
      const { data: user } = await authApi.signup(data);

      if (user) {
        toast.success("Register successfully");
        router.push("/sign-in");
      }
    } catch (error) {
      toast.error(error?.message || "An error occurred during signup");
      if (public_id) {
        try {
          await api.post("/images/delete", {
            public_id: public_id,
          });
        } catch (deleteError) {
          console.error("Error deleting image:", deleteError);
        }
      }
    }
  };

  return (
    <DefaultLayout title="Sign Up | Neatly">
      <div className="bg-[url('/images/auth/signup-bg.jpg')] bg-cover bg-center h-full flex items-center justify-center">
        <div className="h-full sm:h-fit bg-util-bg w-full max-w-5xl mx-auto px-4 py-10 sm:p-20 sm:mx-40 sm:my-16">
          <h2 className="text-h2 text-green-800 mb-10 sm:mb-16 font-medium">
            Register
          </h2>
          <Form {...form}>
            <form
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
                      <FormLabel>First name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter your first name"
                          className="placeholder:text-gray-600"
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
                      <FormLabel>Last name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter your last name"
                          className="placeholder:text-gray-600"
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter your username"
                          className="placeholder:text-gray-600"
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
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter your email"
                          className="placeholder:text-gray-600"
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="Enter your password"
                          className="placeholder:text-gray-600"
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="Confirm your password"
                          className="placeholder:text-gray-600"
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
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter your phone number"
                          className="placeholder:text-gray-600"
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date of Birth</FormLabel>

                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter your country"
                          className="placeholder:text-gray-600"
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
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
              <Button
                type="submit"
                className="mt-5 btn-primary max-w-[446px] w-full max-h-12"
              >
                Register
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default SignUpPage;
