import { create } from 'zustand';
import { PersistStorage, StorageValue, persist } from 'zustand/middleware';

export interface AppStoreState {
  isAuthenticated: boolean;
  setIsAuthenticated: (authStatus: boolean) => void;
}

export interface TokenStoreState {
  token: string | null;
  setToken: (token: string) => void;
}

export const useAppStore = create<AppStoreState>(set => ({
  isAuthenticated: false,
  setIsAuthenticated: (isAuthenticated: boolean) => set({isAuthenticated}),
}));

export const useTokenStore = create<TokenStoreState>((set) => ({
  token: null,
  setToken: (token: string) => {
    set({ token });
  },
}));
