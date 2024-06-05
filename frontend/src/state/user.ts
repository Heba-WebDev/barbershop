import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
    id: string;
    name: string;
    email: string;
    phone_number: string;
    is_active: string;
    is_verified: string;
    avatar: string;
    role: string;
}

interface Store {
    token: string | null;
    user: User | null;
    setToken: (token: string) => void;
    setUser: (user: User) => void;
    logout: () => void;
}

export const userStore = create<Store>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            setUser: (payload: User) => set((state: Store) => ({ ...state, user: payload })),
            setToken: (token: string) => set((state: Store) => ({ ...state, token })),
            logout: () => set({ user: null, token: null }),
        }),
        {
            name: 'token',
        }
    )
)
