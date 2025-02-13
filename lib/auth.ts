// store/auth.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthState = {
  token: string | null;
  userId: string | null;
  isAuthenticated: boolean;
  login: (token: string, userId: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      userId: null,
      isAuthenticated: false,
      login: (token, userId) => set({ token, userId, isAuthenticated: true }),
      logout: () => set({ token: null, userId: null, isAuthenticated: false }),
    }),
    {
      name: "auth-storage",
    }
  )
);
