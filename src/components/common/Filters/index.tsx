"use client";

import { Input } from "@/components/ui/input";
import { ProfileIcon } from "@/components/SvgIcons/SvgIcons";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { User } from "@/types/user";
import { TiDelete } from "react-icons/ti";

export interface FilterObject {
  label: string;
  name: string;
  type: "input" | "select" | "switch";
  selectValues?: {
    name: string;
    value: string;
  }[];
}

export interface SentFilterObject {
  attribute: string;
  value: string;
}

const Filters = ({
  schema,
  filterSelections,
  defaultValues,
  handleFiltering,
}: {
  schema: z.ZodObject<any>;
  filterSelections: FilterObject[];
  defaultValues: any;
  handleFiltering(filters: SentFilterObject[]): void;
}) => {
  const [filters, setFilters] = useState<SentFilterObject[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<FilterObject>();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });

  const { control } = form;

  const filterWatch = useWatch({ control, name: "filter" });

  useEffect(() => {
    form.resetField(selectedFilter?.name as string);
    setSelectedFilter(
      filterSelections.find((filter) => filter.name === filterWatch),
    );
  }, [filterWatch]);

  function deleteFilter(filterName: string) {
    filters.splice(
      filters.findIndex((filter) => filter.attribute === filterName),
      1,
    );
    setFilters(filters);
    handleFiltering(filters);
  }

  function handleClose() {
    form.reset();
    setSelectedFilter(undefined);
  }

  function onSubmit(data: z.infer<typeof schema>) {
    const newList = [
      ...filters,
      { attribute: data.filter, value: data[data.filter] },
    ];
    setFilters(newList);
    handleFiltering(newList);
    console.log(form.getValues("filter"));
  }

  return (
    <div>
      <Popover onOpenChange={handleClose}>
        <PopoverTrigger asChild>
          <Button variant="outline">Filter</Button>
        </PopoverTrigger>
        <PopoverContent className="w-80" align="start">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="filter"
                render={({ field }) => (
                  <FormItem className="w-full py-3">
                    <FormLabel className="mb-2.5 block font-medium text-black dark:text-white">
                      Filter by
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select the filter" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {filterSelections
                          .filter((filter) => {
                            return !new Set(
                              filters.map((item) => item.attribute),
                            ).has(filter.name);
                          })
                          .map((filterItem) => {
                            return (
                              <SelectItem
                                key={filterItem.name}
                                value={filterItem.name}
                              >
                                {filterItem.label}
                              </SelectItem>
                            );
                          })}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {selectedFilter ? (
                <>
                  <FormField
                    control={form.control}
                    name={selectedFilter.name}
                    render={({ field }) => (
                      <FormItem
                        className={cn("w-full py-3", {
                          hidden: selectedFilter?.type !== "input",
                        })}
                      >
                        <FormLabel className="mb-2.5 block font-medium text-black dark:text-white">
                          {selectedFilter?.label}
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder={selectedFilter?.label}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={selectedFilter.name}
                    render={({ field }) => (
                      <FormItem
                        className={cn("w-full py-3", {
                          hidden: selectedFilter?.type !== "select",
                        })}
                      >
                        <FormLabel className="mb-2.5 block font-medium text-black dark:text-white">
                          {selectedFilter?.label}
                        </FormLabel>
                        <Select onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select the filter" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {selectedFilter?.selectValues?.map((item) => {
                              return (
                                <SelectItem key={item.value} value={item.value}>
                                  {item.name}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              ) : (
                <></>
              )}
              <Button
                className="flex justify-center rounded bg-primary px-6 py-3 font-medium text-gray hover:bg-opacity-90"
                disabled={!selectedFilter}
                type="submit"
                // onClick={() => {
                //   console.log(form.formState.errors);
                // }}
              >
                Add filter
              </Button>
            </form>
          </Form>
        </PopoverContent>
      </Popover>
      <div
        className={cn("mt-5 flex gap-3", {
          hidden: filters.length < 1,
        })}
      >
        {filters.map((filter) => {
          return (
            <div
              key={filter.attribute}
              className="flex items-center gap-1 rounded-full bg-primary px-2 py-1 text-sm text-white opacity-75"
            >
              <span>
                {filter.attribute}: {filter.value}
              </span>
              <Button
                className="h-5 w-5 rounded-full p-0"
                onClick={() => {
                  deleteFilter(filter.attribute);
                }}
              >
                <TiDelete className="h-5 w-5" />
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Filters;
