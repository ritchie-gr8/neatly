import Link from "next/link";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import DefaultLayout from "@/layouts/default.layout";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ROLES } from "@/constants/roles";
import { PATHS } from "@/constants/paths";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const loginSchema = z.object({
  identifier: z.string().min(2, "Username or email is required"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const SignInPage = () => {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const res = await login(data.identifier, data.password);

      if (!res?.success) {
        throw new Error(res?.error || "An error occurred during login");
      }

      const user = res?.user;

      if (user) {
        toast.success("Login successful, redirecting...");
        if (user.role === ROLES.ADMIN) {
          router.push(PATHS.ADMIN.CUSTOMER_BOOKING);
        } else {
          router.push(PATHS.PUBLIC.HOME);
        }
      }
    } catch (error) {
      toast.error(error?.message || "An error occurred during login");
      setLoading(false);
    }
  };

  return (
    <DefaultLayout title="Sign In | Neatly">
      <div className="h-screen flex flex-col sm:grid sm:grid-cols-2">
        <div className="h-[25%] sm:h-full bg-[url('/images/auth/signin-bg-mb.png')] sm:bg-[url('/images/auth/signin-bg.jpg')] bg-cover bg-center"></div>
        <div className="h-full bg-util-bg w-full px-4 sm:px-12 lg:px-32 pt-10 sm:pt-40 text-gray-900">
          <h2 className="text-h2 text-green-800 font-medium mb-10 sm:mb-16">
            Log In
          </h2>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="font-inter flex flex-col gap-10"
            >
              <FormField
                control={form.control}
                name="identifier"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>Username or email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter your username or email"
                        className="placeholder:text-gray-600 p-3 h-fit"
                        disabled={loading}
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
                    <FormLabel required>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="Enter your password"
                        className="placeholder:text-gray-600 p-3 h-fit"
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="btn-primary py-4 h-fit text-base"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  "Log In"
                )}
              </Button>
            </form>
          </Form>
          <p className="text-gray-700 mt-4">
            Don't have an account yet?{" "}
            <Link
              href="/sign-up"
              className="text-orange-500 font-open-sans font-semibold"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default SignInPage;
