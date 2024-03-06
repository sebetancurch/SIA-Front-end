import { z } from "zod";
import { FilterObject } from "@/components/common/Filters";

export const filterSchema = z.object({
  filter: z.enum(["firstName", "lastName", "email", "role"]),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().optional(),
  role: z.enum(["ADMIN", "PROFESSOR", "STUDENT"]).optional(),
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
  {
    name: "role",
    label: "Role",
    type: "select",
    selectValues: [
      {
        name: "Administrator",
        value: "ADMIN",
      },
      {
        name: "Professor",
        value: "PROFESSOR",
      },
      {
        name: "Student",
        value: "STUDENT",
      },
    ],
  },
];

export const defaultFilterValues = {
  firstName: "",
  lastName: "",
  email: "",
};
