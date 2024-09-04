import { User } from "@/types/user";

export interface Faculty {
  id?: number;
  name: string;
  code: string;
  dean?: User | number;
  contactEmail: string;
  contactPhone: number;
  state?: "ACTIVE" | "INACTIVE" | "PENDING";
}
