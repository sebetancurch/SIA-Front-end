import { z } from "zod";
import { FilterObject } from "@/components/common/Filters";

export const filterSchema = z.object({
  filter: z.enum(["firstName", "lastName", "email", "role", ""]),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().optional(),
  role: z.enum(["ADMIN", "PROFESSOR", "STUDENT", ""]).optional(),
});

export const filterSelections: FilterObject[] = [
  {
    name: "firstName",
    label: "First name",
    type: "input",
  },
  {
    name: "lastName",
    label: "Last name",
    type: "input",
  },
  {
    name: "email",
    label: "Email",
    type: "input",
  },
];

export const defaultFilterValues = {
  filter: "",
  firstName: "",
  lastName: "",
  email: "",
};
