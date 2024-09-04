export interface Subject {
  id: number;
  name: string;
  schedule: Date[];
  academicLevel: "Undergraduate" | "Graduate" | "Non-Credit" | "High School";
  active: boolean;
  professorId: number;
  courseId: number;
}
