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

// const localStorageS: PersistStorage<TokenStoreState> = {
//   getItem: (name: string) => {
//     const item = localStorage.getItem(name);
//     return item
//   },
//   setItem: (name: string, value: StorageValue<TokenStoreState>) => {
//     localStorage.setItem(name, value);
//   },
//   removeItem: (name: string) => {
//     localStorage.removeItem(name);
//   },
// };

export const useAppStore = create<AppStoreState>(set => ({
  isAuthenticated: localStorage.getItem("token") !== null,
  setIsAuthenticated: (isAuthenticated: boolean) => set({isAuthenticated}),
}));

export const useTokenStore = create(
  persist<TokenStoreState>(
    (set) => ({
      token: localStorage.getItem('token') as unknown as string || null,
      setToken: (token: string) => set({ token }),
    }),
    {
      name: 'token',
    }
  )
);

export const logout = () => {
  localStorage.removeItem("token");
}
