"use client";

import { Input } from "@/components/ui/input";
import { ProfileIcon } from "@/components/SvgIcons/SvgIcons";
import React, { Dispatch, SetStateAction, use, useRef, useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { FaEdit } from "react-icons/fa";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Response } from "@/types/response";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { Course } from "@/types/course";
import { createCourse, updateCourse } from "@/services/course";
import { FacultyListDialog } from "@/components/Dialogs/FacultyListSelection";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  name: z.string().trim(),
  // .min(1, {
  //   message: "A name is required.",
  // }),
  description: z.string().trim(),
  // .min(1, {
  //   message: "A description is required.",
  // }),
  faculty: z.string().trim(),
  // .min(1, {
  //   message: "A faculty is required.",
  // }),
  code: z.string(),
  // .min(6, {
  //   message: "The course code must be 6 characters.",
  // }),
});

const CourseForm = ({
  course,
  refresh,
  setRefresh,
}: {
  course?: Course;
  refresh?: boolean;
  setRefresh?: Dispatch<SetStateAction<boolean>>;
}) => {
  const [isEdition, setIsEdition] = useState(!course);
  const isFirstRender = useRef(true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      code: "",
    },
  });

  if (course && isFirstRender.current) {
    form.reset({ ...course, faculty: (course.faculty as number).toString() });
    isFirstRender.current = false;
  }

  const handleEdit = () => {
    setIsEdition(!isEdition);
  };

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const fetch = async () => {
      let response: Response<Course>;
      if (!course) {
        response = await createCourse({
          ...data,
          faculty: Number(data.faculty),
        });
      } else {
        response = await updateCourse(
          { ...data, faculty: Number(data.faculty) },
          course.id as number,
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
            "py-0": !course,
          },
        )}
      >
        <h3
          className={cn("font-medium text-black dark:text-white", {
            hidden: !course,
          })}
        >
          Course Information
        </h3>
        <Button
          className={cn({
            hidden: !course,
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
                  "grid grid-cols-2": course,
                  "flex flex-col": !course,
                })}
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="mb-2.5 block font-medium text-black dark:text-white">
                        Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          iconComponent={ProfileIcon}
                          placeholder="Name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="mb-2.5 block font-medium text-black dark:text-white">
                        Description
                      </FormLabel>
                      <FormControl>
                        <Textarea placeholder="Description" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FacultyListDialog />

                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course code</FormLabel>
                      <FormControl>
                        <InputOTP
                          maxLength={6}
                          pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                          {...field}
                        >
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
                        Value must be unique and consistent with the program
                        where the course belongs.
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
                className={cn("mt-5 flex justify-end gap-4.5", {
                  hidden: !isEdition,
                })}
              >
                {!form.formState.isSubmitting ? (
                  <Button
                    className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                    type="submit"
                    disabled={!form.formState.isValid}
                  >
                    {course ? "Save" : "Create"}
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

export default CourseForm;
