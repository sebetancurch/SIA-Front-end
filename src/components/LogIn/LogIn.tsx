"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { EmailIcon, PasswordIcon } from "@/components/SvgIcons/SvgIcons";
import ReactLoading from "react-loading";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useColorMode from "@/hooks/useColorMode";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import useAuthStore from "@/store/LoggedUserStore";
import { login } from "@/services/user";
import { User } from "@/types/user";
import { Navigation } from "@/types/navigation";
import { useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";

const schema = z.object({
  email: z.string().trim().email({
    message: "Invalid email address.",
  }),
  password: z.string().trim().min(8, {
    message: "At least 8 characters",
  }),
});

type FormFields = z.infer<typeof schema>;

const LogInForm = () => {
  const [colorMode] = useColorMode();
  const { setLogin } = useAuthStore();
  const router = useRouter();

  const form = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    control,
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const loginResponse = await login(data);
      if (loginResponse.success) {
        setLogin(
          loginResponse.content?.user as User,
          loginResponse.content?.navigation as Navigation[],
          // loginResponse.content?.accessToken as string,
        );
        router.push("/");
      } else {
        setError("root", {
          message: loginResponse.message,
        });
      }
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="my-2.5 block font-medium text-black dark:text-white">
                Email
              </FormLabel>
              <FormControl>
                <Input
                  {...register("email")}
                  type="text"
                  placeholder="Enter your email"
                  iconComponent={EmailIcon}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="my-2.5 block font-medium text-black dark:text-white">
                Password
              </FormLabel>
              <FormControl>
                <Input
                  {...register("password")}
                  type="password"
                  placeholder="Enter your password"
                  iconComponent={PasswordIcon}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {errors.root && (
          <div className="mb-3 font-semibold text-[#B45454]">
            {errors.root.message}
          </div>
        )}

        <div className="my-5">
          {!isSubmitting ? (
            <input
              type="submit"
              value="Sign In"
              className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
            />
          ) : (
            <div className="bg-gray-500 flex w-full cursor-not-allowed justify-center rounded-lg opacity-70">
              <ReactLoading
                type="spin"
                color={colorMode === "dark" ? "#fff" : "#e0e0e0"}
                height={20}
                width={20}
              />
            </div>
          )}
        </div>

        <button className="flex w-full items-center justify-center gap-3.5 rounded-lg border border-stroke bg-gray p-4 hover:bg-opacity-50 dark:border-strokedark dark:bg-meta-4 dark:hover:bg-opacity-50">
          <span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_191_13499)">
                <path
                  d="M19.999 10.2217C20.0111 9.53428 19.9387 8.84788 19.7834 8.17737H10.2031V11.8884H15.8266C15.7201 12.5391 15.4804 13.162 15.1219 13.7195C14.7634 14.2771 14.2935 14.7578 13.7405 15.1328L13.7209 15.2571L16.7502 17.5568L16.96 17.5774C18.8873 15.8329 19.9986 13.2661 19.9986 10.2217"
                  fill="#4285F4"
                />
                <path
                  d="M10.2055 19.9999C12.9605 19.9999 15.2734 19.111 16.9629 17.5777L13.7429 15.1331C12.8813 15.7221 11.7248 16.1333 10.2055 16.1333C8.91513 16.1259 7.65991 15.7205 6.61791 14.9745C5.57592 14.2286 4.80007 13.1801 4.40044 11.9777L4.28085 11.9877L1.13101 14.3765L1.08984 14.4887C1.93817 16.1456 3.24007 17.5386 4.84997 18.5118C6.45987 19.4851 8.31429 20.0004 10.2059 19.9999"
                  fill="#34A853"
                />
                <path
                  d="M4.39899 11.9777C4.1758 11.3411 4.06063 10.673 4.05807 9.99996C4.06218 9.32799 4.1731 8.66075 4.38684 8.02225L4.38115 7.88968L1.19269 5.4624L1.0884 5.51101C0.372763 6.90343 0 8.4408 0 9.99987C0 11.5589 0.372763 13.0963 1.0884 14.4887L4.39899 11.9777Z"
                  fill="#FBBC05"
                />
                <path
                  d="M10.2059 3.86663C11.668 3.84438 13.0822 4.37803 14.1515 5.35558L17.0313 2.59996C15.1843 0.901848 12.7383 -0.0298855 10.2059 -3.6784e-05C8.31431 -0.000477834 6.4599 0.514732 4.85001 1.48798C3.24011 2.46124 1.9382 3.85416 1.08984 5.51101L4.38946 8.02225C4.79303 6.82005 5.57145 5.77231 6.61498 5.02675C7.65851 4.28118 8.9145 3.87541 10.2059 3.86663Z"
                  fill="#EB4335"
                />
              </g>
              <defs>
                <clipPath id="clip0_191_13499">
                  <rect width="20" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </span>
          Sign in with Google
        </button>
      </form>
    </Form>
  );
};

export default LogInForm;
