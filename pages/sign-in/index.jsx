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

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const SignInPage = () => {
  const { login } = useAuth();
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const { user } = await login(data.email, data.password);

      if (user) {
        console.log("User logged in successfully", user);
        router.push("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DefaultLayout title="Sign In | Neatly">
      <div className="h-screen grid grid-cols-2">
        <div className="bg-[url('/images/auth/signin-bg.jpg')] bg-cover"></div>
        <div className="h-full bg-util-bg w-full px-32 pt-40 text-gray-900">
          <h2 className="text-h2 text-green-800 font-medium mb-16">Log In</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="font-inter flex flex-col gap-10">
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
              <Button type="submit" className="btn-primary">Log In</Button>
            </form>
          </Form>
          <p className="text-gray-700 mt-4">
            Don't have an account yet?{" "}
            <Link href="/sign-up" className="text-orange-500 font-open-sans">
              Register
            </Link>
          </p>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default SignInPage;
