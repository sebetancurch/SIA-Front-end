"use client";

import { Input } from "@/components/ui/input";
import { EmailIcon, ProfileIcon } from "@/components/SvgIcons/SvgIcons";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { format } from "date-fns";
import { CalendarIcon, ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { FaEdit } from "react-icons/fa";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { isDirty, z } from "zod";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";
import { Program } from "@/types/program";
import { createProgram, updateProgram } from "@/services/program";
import { Response } from "@/types/response";

const formSchema = z.object({
  name: z.string().trim().min(1, {
    message: "A name is required.",
  }),
  coordinator: z.string().trim().min(1, {
    message: "A coordinator is required.",
  }),
  contactPhone: z.coerce.number().min(1, {
    message: "Write a phone number",
  }),
  contactEmail: z.string().trim().email({
    message: "Write a correct email",
  }),
  code: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

const ProgramForm = ({
  program,
  refresh,
  setRefresh,
}: {
  program?: Program;
  refresh?: boolean;
  setRefresh?: Dispatch<SetStateAction<boolean>>;
}) => {
  const [isEdition, setIsEdition] = useState(!program);

  const isFirstRender = useRef(true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      coordinator: "",
      contactEmail: "",
      code: "",
    },
  });

  if (program && isFirstRender.current) {
    form.reset({ ...program, coordinator: program.coordinator.toString() });
    isFirstRender.current = false;
  }

  const handleEdit = () => {
    setIsEdition(!isEdition);
  };

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const fetch = async () => {
      let response: Response<Program>;
      if (!program) {
        response = await createProgram({
          ...data,
          coordinator: +data.coordinator,
        });
      } else {
        response = await updateProgram(
          { ...data, coordinator: +data.coordinator },
          program.id as number,
        );
      }
      return response;
    };
    try {
      fetch().then((response) => {
        toast({
          variant: response.success ? "success" : "destructive",
          title: response.message,
        });
        setRefresh && setRefresh(!refresh);
      });
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }
  }

  return (
    <>
      <div
        className={cn(
          "flex justify-between border-b border-stroke px-7 py-4 dark:border-strokedark",
          {
            "py-0": !program,
          },
        )}
      >
        <h3
          className={cn("font-medium text-black dark:text-white", {
            hidden: !program,
          })}
        >
          Program Information
        </h3>
        <Button
          className={cn({
            hidden: !program,
          })}
          variant="ghost"
          size="icon"
          onClick={handleEdit}
        >
          <FaEdit size={20} />
        </Button>
      </div>
      <div className="pt-7">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <fieldset disabled={!isEdition}>
              <div
                className={cn("gap-5.5", {
                  "grid grid-cols-2": program,
                  "flex flex-col": !program,
                })}
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="mb-2.5 block font-medium text-black dark:text-white">
                        Program name
                      </FormLabel>
                      <FormControl>
                        <Input
                          iconComponent={ProfileIcon}
                          placeholder="Program name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="coordinator"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="mb-2.5 block font-medium text-black dark:text-white">
                        Coordinator
                      </FormLabel>
                      <FormControl>
                        <Input
                          iconComponent={ProfileIcon}
                          placeholder="Coordinator"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contactEmail"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="mb-2.5 block font-medium text-black dark:text-white">
                        Contact email
                      </FormLabel>
                      <FormControl>
                        <Input
                          iconComponent={ProfileIcon}
                          placeholder="Contact email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contactPhone"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="mb-2.5 block font-medium text-black dark:text-white">
                        First name
                      </FormLabel>
                      <FormControl>
                        <Input
                          iconComponent={ProfileIcon}
                          placeholder="First name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>One-Time Password</FormLabel>
                      <FormControl>
                        <InputOTP maxLength={6} {...field}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormDescription>
                        Value must be unique and consistent with the program the
                        where the program belongs.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {form.formState.errors.root && (
                <div className="mb-3 font-semibold text-[#B45454]">
                  {form.formState.errors.root.message}
                </div>
              )}

              <div
                className={cn(
                  "relative bottom-0 mt-5 flex justify-end gap-4.5",
                  {
                    hidden: !isEdition,
                  },
                )}
              >
                {!form.formState.isSubmitting ? (
                  <Button
                    className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                    type="submit"
                  >
                    {program ? "Save" : "Create"}
                  </Button>
                ) : (
                  <Button disabled>
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </Button>
                )}
              </div>
            </fieldset>
          </form>
        </Form>
      </div>
    </>
  );
};

export default ProgramForm;
