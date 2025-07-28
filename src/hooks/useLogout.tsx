import axiosInstance from "@/lib/axios";
import { logout } from "@/services/user";
import useAuthStore from "@/store/LoggedUserStore";

export const useLogout = async () => {
  useAuthStore.getState().clearAuth();
  await logout();
};
