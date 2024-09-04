import { Subject } from "@/types/subject";
import { Faculty } from "@/types/faculty";

export interface Course {
  id?: number;
  name: string;
  description: string;
  code: string;
  active?: boolean;
  topics?: string[];
  faculty: Faculty | number;
  subjectsList?: Subject[];
}
