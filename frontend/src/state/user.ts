import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Company {
    id: string;
    name: string;
    address: string;
    phone_number: string;
    avatar: string;
}

interface User {
    id: string;
    name: string;
    email: string;
    phone_number: string;
    is_active: string;
    is_verified: string;
    avatar: string;
    role: string;
    company?: Company;
}



interface Store {
    token: string | null;
    user: User | null;
    setToken: (token: string) => void;
    setUser: (user: User) => void;
    setCompany: (company: Company) => void;
    logout: () => void;
}

export const userState = create<Store>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            setUser: (payload: User) => set((state: Store) => ({ ...state, user: payload })),
            setToken: (token: string) => set((state: Store) => ({ ...state, token })),
            setCompany: (company: Company) => set((state: Store) => ({ ...state, company})),
            logout: () => set({ user: null, token: null }),
        }),
        {
            name: 'token',
        }
    )
)
