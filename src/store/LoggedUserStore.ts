import { create } from "zustand";
import { persist, PersistStorage, StorageValue } from "zustand/middleware";
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

const customStorage: PersistStorage<AuthState> = {
  getItem: (key: string) => {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as StorageValue<AuthState>) : null;
  },
  setItem: (key: string, value: StorageValue<AuthState>) => {
    window.localStorage.setItem(key, JSON.stringify(value));
  },
  removeItem: (key: string) => {
    window.localStorage.removeItem(key);
  },
};

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
      storage: typeof window !== "undefined" ? customStorage : undefined,
    },
  ),
);

export default useStore;
