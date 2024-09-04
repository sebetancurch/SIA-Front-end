import { Faculty } from "@/types/faculty";
import { User } from "@/types/user";

export interface Program {
  id?: number;
  name: string;
  code: string;
  coordinator: User | number;
  contactEmail: string;
  contactPhone: number;
  faculty?: Faculty | number;
  state?: "ACTIVE" | "INACTIVE" | "PENDING";
  active?: boolean;
}
