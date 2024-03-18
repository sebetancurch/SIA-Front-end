"use client";

import { Input } from "@/components/ui/input";
import { EmailIcon, ProfileIcon } from "@/components/SvgIcons/SvgIcons";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { FaEdit } from "react-icons/fa";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import {
  DialogPopoverContent,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "@/components/ui/use-toast";
import { User } from "@/types/user";
import { createUser, updateUser } from "@/services/user";

const formSchema = z.object({
  firstName: z.string().trim().min(1, {
    message: "A name is required.",
  }),
  lastName: z.string().trim().min(1, {
    message: "A last name is required.",
  }),
  phone: z.number().min(1, {
    message: "Write a phone number",
  }),
  email: z.string().trim().email({
    message: "Write a correct email",
  }),
  // program: z.string(),
  role: z.enum(["ADMIN", "PROFESSOR", "STUDENT"]),
  gender: z.enum(["Male", "Female"]),
  birthday: z.date({
    required_error: "A date of birth is required.",
  }),
});
// .refine(
//   (values) => {
//     return values.role == "STUDENT" && !values.program;
//   },
//   {
//     message: "Please select a program",
//     path: ["program"],
//   },
// );

const UserForm = ({ user }: { user?: User }) => {
  const [isEdition, setIsEdition] = useState(!user);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
  });

  const { control } = form;

  // const roleWatcher = useWatch({ control, name: "role" });

  useEffect(() => {
    if (user) {
      form.reset({
        ...user,
        birthday: new Date(user.birthday),
      });
      form.setValue("gender", user.gender);
    }
  }, []);

  // useEffect(() => {
  //   form.setValue("program", "");
  // }, [roleWatcher]);

  const handleEdit = () => {
    setIsEdition(!isEdition);
  };

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      let response: any = {};
      if (!user) {
        response = await createUser(data);
      } else {
        response = await updateUser(data, user.id as number);
      }
      if (response.success) {
        toast({
          variant: "success",
          title: `User ${user ? "updated" : "created"} successfully!!`,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: response.message,
        });
      }
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
            "py-0": !user,
          },
        )}
      >
        <h3
          className={cn("font-medium text-black dark:text-white", {
            hidden: !user,
          })}
        >
          User Information
        </h3>
        <Button
          className={cn({
            hidden: !user,
          })}
          variant="ghost"
          size="icon"
          onClick={handleEdit}
        >
          <FaEdit size={20} />
        </Button>
      </div>
      <div className="flex justify-between"></div>
      <div className="p-7">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <fieldset disabled={!isEdition}>
              <div className="grid grid-cols-2 gap-5.5">
                <FormField
                  control={form.control}
                  name="firstName"
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
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="mb-2.5 block font-medium text-black dark:text-white">
                        Last name
                      </FormLabel>
                      <FormControl>
                        <Input
                          iconComponent={ProfileIcon}
                          placeholder="Last name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="mb-2.5 block font-medium text-black dark:text-white">
                        Phone number
                      </FormLabel>
                      <FormControl>
                        <Input
                          // type="text"
                          inputMode="numeric"
                          placeholder="Phone number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="mb-2.5 block font-medium text-black dark:text-white">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Email"
                          iconComponent={EmailIcon}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="mb-2.5 block font-medium text-black dark:text-white">
                        Role
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select the role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="ADMIN">Administrator</SelectItem>
                          <SelectItem value="PROFESSOR">Professor</SelectItem>
                          <SelectItem value="STUDENT">Student</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/*<FormField*/}
                {/*  control={form.control}*/}
                {/*  name="program"*/}
                {/*  render={({ field }) => (*/}
                {/*    <FormItem*/}
                {/*      className={cn("w-full", {*/}
                {/*        hidden: roleWatcher !== "STUDENT",*/}
                {/*      })}*/}
                {/*    >*/}
                {/*      <FormLabel className="mb-2.5 block font-medium text-black dark:text-white">*/}
                {/*        Program*/}
                {/*      </FormLabel>*/}
                {/*      <Select onValueChange={field.onChange}>*/}
                {/*        <FormControl>*/}
                {/*          <SelectTrigger className="w-full">*/}
                {/*            <SelectValue placeholder="Select the program" />*/}
                {/*          </SelectTrigger>*/}
                {/*        </FormControl>*/}
                {/*        <SelectContent>*/}
                {/*          <SelectItem value="1">*/}
                {/*            Electronics Engineering*/}
                {/*          </SelectItem>*/}
                {/*          <SelectItem value="2">Civil Engineering</SelectItem>*/}
                {/*          <SelectItem value="3">*/}
                {/*            Mechanical Engineering*/}
                {/*          </SelectItem>*/}
                {/*          <SelectItem value="4">*/}
                {/*            Chemical Engineering*/}
                {/*          </SelectItem>*/}
                {/*          <SelectItem value="5">Systems Engineering</SelectItem>*/}
                {/*        </SelectContent>*/}
                {/*      </Select>*/}
                {/*      <FormMessage />*/}
                {/*    </FormItem>*/}
                {/*  )}*/}
                {/*/>*/}

                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="mb-2.5 block font-medium text-black dark:text-white">
                        Gender
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="birthday"
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col">
                      <FormLabel className="block font-medium text-black dark:text-white">
                        Date of birth
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "h-full w-full rounded-lg border border-stroke bg-transparent py-4 pr-6 text-black outline-none focus:border-primary focus-visible:shadow-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>

                        {user ? (
                          <PopoverContent align="start" className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              captionLayout="dropdown-buttons"
                              fromYear={1900}
                              toYear={new Date().getFullYear()}
                            />
                          </PopoverContent>
                        ) : (
                          <DialogPopoverContent
                            align="start"
                            className=" w-auto p-0"
                          >
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              captionLayout="dropdown-buttons"
                              fromYear={1900}
                              toYear={new Date().getFullYear()}
                            />
                          </DialogPopoverContent>
                        )}
                      </Popover>
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
                  >
                    {user ? "Save" : "Create"}
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

export default UserForm;
