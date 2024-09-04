"use client";

import * as React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Check, ChevronsUpDown, Loader } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useDebounce } from "@/hooks/useDebounce";
import { ListRequest, ListResponse } from "@/types/list-request";
import { useEffect, useState } from "react";
import { Response } from "@/types/response";

interface CustomComboboxFieldProps {
  name: string;
  label: string;
  placeholder: string;
  emptyText: string;
  description?: string;
  fieldValue: string;
  selectionLabelItems: string[];
  fetchOptions: (
    listRequest: ListRequest,
  ) => Promise<Response<ListResponse<any>>>;
}

export function FetchCombobox({
  name,
  label,
  placeholder,
  emptyText,
  description,
  fieldValue,
  selectionLabelItems,
  fetchOptions,
}: CustomComboboxFieldProps) {
  const { control } = useFormContext();
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const debouncedInputValue = useDebounce(inputValue, 300);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchOptions({
          page: 0,
          size: 10,
          direction: "ASC",
          sort: "id",
          filters: [
            {
              attribute: "firstName",
              value: debouncedInputValue,
            },
          ],
        });
        setOptions(data.content);
      } catch (error) {
        console.error("Error fetching options:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [debouncedInputValue, fetchOptions]);

  const joinSelectionLabels = (object: any) => {
    let selectionLabel: string = "";

    selectionLabelItems.forEach((item) => {
      selectionLabel = selectionLabel + " " + object[item].toString();
    });

    return selectionLabel;
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{label}</FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className={cn(
                    "justify-between",
                    !field.value && "text-muted-foreground",
                  )}
                >
                  {field.value
                    ? options.find(
                        (option) =>
                          option[fieldValue].toString() === field.value,
                      )?.firstName
                    : placeholder}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <Command>
                <CommandInput
                  placeholder={placeholder}
                  onValueChange={(search) => setInputValue(search)}
                />
                {loading && <Loader />}
                {!loading && options.length === 0 && (
                  <CommandEmpty>{emptyText}</CommandEmpty>
                )}
                <CommandGroup>
                  {options.map((option) => (
                    <CommandItem
                      key={option[fieldValue]}
                      value={option[fieldValue].toString()}
                      onSelect={(currentValue) => {
                        field.onChange(
                          currentValue === field.value ? "" : currentValue,
                        );
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          field.value === option[fieldValue].toString()
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />
                      {joinSelectionLabels(option)}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
