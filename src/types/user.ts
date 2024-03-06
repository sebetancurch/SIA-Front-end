export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  birthday: Date;
  gender: "Male" | "Female";
  email: string;
  phone?: number;
  role: "ADMIN" | "PROFESSOR" | "STUDENT";
  program?: string;
  active?: boolean;
}

export interface Session {
  session?: string;
  user?: User;
}
