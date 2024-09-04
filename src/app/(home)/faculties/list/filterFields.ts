import { z } from "zod";
import { FilterObject } from "@/components/common/Filters";

export const filterSchema = z.object({
  filter: z.enum(["name", "code", "contactEmail", ""]),
  name: z.string().optional(),
  code: z.string().optional(),
  contactEmail: z.string().optional(),
});

export const filterSelections: FilterObject[] = [
  {
    name: "name",
    label: "Faculty name",
    type: "input",
  },
  {
    name: "code",
    label: "Code",
    type: "input",
  },
  {
    name: "contactEmail",
    label: "Contact Email",
    type: "input",
  },
];

export const defaultFilterValues = {
  filter: "",
  name: "",
  code: "",
  contactEmail: "",
};
