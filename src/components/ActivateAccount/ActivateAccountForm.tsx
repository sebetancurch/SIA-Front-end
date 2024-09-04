"use client";
import React from "react";
import { navigate } from "@/actions/login-actions";
import { Input } from "@/components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  EmailIcon,
  PasswordIcon,
  ProfileIcon,
} from "@/components/SvgIcons/SvgIcons";
import ReactLoading from "react-loading";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useColorMode from "@/hooks/useColorMode";
import { toast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { activateUser } from "@/services/user";
import { Button } from "@/components/ui/button";

const schema = z.object({
  password: z.string().trim().min(8, {
    message: "At least 8 characters",
  }),
  confirmPassword: z.string().trim().min(8, {
    message: "At least 8 characters",
  }),
});

type FormFields = z.infer<typeof schema>;

const ActivateAccountForm = ({ token }: { token: string }) => {
  const [colorMode] = useColorMode();

  const form = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      password: "",
      confirmPassword: "",
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
      const loginResponse = await activateUser(data, token);
      if (loginResponse.success) {
        await navigate("/login");
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
          name="password"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="my-2.5 block font-medium text-black dark:text-white">
                New password
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

        <FormField
          control={control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="my-2.5 block font-medium text-black dark:text-white">
                Confirm password
              </FormLabel>
              <FormControl>
                <Input
                  {...register("confirmPassword")}
                  type="password"
                  placeholder="Confirm password"
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
            <Button
              type="submit"
              value="Sign In"
              className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
            >
              Activate
            </Button>
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
      </form>
    </Form>
  );
};

export default ActivateAccountForm;
