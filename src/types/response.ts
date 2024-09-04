import { User } from "@/types/user";
import { Navigation } from "@/types/navigation";

export interface Response<T> {
  success: boolean;
  localDateTime: Date;
  status: number;
  message: string;
  content?: T;
  error?: string;
}

export interface LoginResponse {
  user: User;
  navigation: Navigation[];
  token: string;
  refreshToken: string;
}
