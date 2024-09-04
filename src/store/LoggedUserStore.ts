import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Navigation } from "@/types/navigation";
import { User } from "@/types/user";
import { getUserDataByToken } from "@/services/user";

interface AuthState {
  navigationData: Navigation[] | null;
  userData: User | null;
  setNavigationData: (data: Navigation[]) => void;
  setUserData: (data: User) => void;
  fetchUserData: () => Promise<void>;
}

const useStore = create<AuthState>()(
  persist(
    (set) => ({
      navigationData: null,
      userData: null,
      setNavigationData: (data) => set({ navigationData: data }),
      setUserData: (data) => set({ userData: data }),
      fetchUserData: async () => {
        try {
          const data = await getUserDataByToken();
          set({
            userData: data.content?.user,
            navigationData: data.content?.navigation,
          });
        } catch (error) {
          console.error("Failed to fetch user data", error);
          // Optionally, you could clear the state here if the fetch fails
          // set({ userData: null, navigationData: null });
        }
      },
    }),
    {
      name: "auth-storage", // changed to be more specific
      storage: typeof window !== "undefined" ? window.localStorage : undefined,
    },
  ),
);

export default useStore;
