import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface Company {
    id: string;
    name: string;
    address: string;
    phone_number: string;
    avatar: string;
}

interface Services {
    name: string;
    price: string;
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



export interface Store {
    token: string | null;
    user: User | null;
    service: Services[] | null;
    company: Company[] | null;
    setToken: (token: string) => void;
    setUser: (user: User) => void;
    setCompany: (company: Company[]) => void;
    setService: (service: Services[]) => void;
    logout: () => void;
}

export const userState = create<Store>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            service: null,
            company: null,
            setUser: (payload: User) => set((state: Store) => ({ ...state, user: payload })),
            setToken: (token: string) => set((state: Store) => ({ ...state, token })),
            setCompany: (company: Company[]) => set((state: Store) => ({ ...state, company})),
            setService: (service: Services[]) => set((state) => ({ ...state, service})),
            logout: () => set({ user: null, token: null, service: null }),
        }),
        {
            name: 'token',
            storage: createJSONStorage(() => sessionStorage),
        }
    )
)
