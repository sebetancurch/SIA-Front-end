import { create } from "zustand";
import { persist, PersistStorage, StorageValue } from "zustand/middleware";
import { User } from "@/types/user";
import { getUserDataByToken, logout } from "@/services/user";
import { Navigation } from "@/types/navigation";

interface AuthState {
  userData: User | null;
  navigationData: Navigation[] | null;
  // accessToken: string | null;
  setUserData: (data: User) => void;
  setNavigationData: (data: Navigation[]) => void;
  // setAccessToken: (token: string) => void;
  setLogin: (user: User, navigation: Navigation[], accessToken?: string) => void;
  clearAuth: () => void;
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

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      userData: null,
      // accessToken: null,
      navigationData: null,
      setUserData: (data) => set({ userData: data }),
      setNavigationData: (data) => set({ navigationData: data }),
      // setAccessToken: (token) => set({ accessToken: token }),
      setLogin: (user, navigation, accessToken?) => {
        set({
          userData: user,
          navigationData: navigation,
          // accessToken: accessToken,
        });
      },
      clearAuth: () => set({ userData: null, navigationData: null, 
        // accessToken: null 
        }),
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
          set({ userData: null, navigationData: null });
          logout();
        }
      },
    }),
    {
      name: "auth-storage", // changed to be more specific
      storage: typeof window !== "undefined" ? customStorage : undefined,
    },
  ),
);

export default useAuthStore;