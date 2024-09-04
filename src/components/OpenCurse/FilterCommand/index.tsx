import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Checkbox } from "@/components/ui/checkbox";

export const FilterCommand = ({ items }: { items: string[] }) => {
  return (
    <Command className="rounded-lg border border-strokedark shadow-md">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {items?.map((item) => (
            <CommandItem className="flex justify-between aria-selected:bg-white dark:aria-selected:bg-boxdark">
              <span>{item}</span>
              <Checkbox />
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
};
