import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export interface Company {
    id: string;
    name: string;
    address: string;
    phone_number: string;
    avatar: string;
    user_id: string;
}

interface Services {
    id: string;
    name: string;
    price: string;
    avatar: string;
    is_active: boolean;
}

interface Hours {
    id: number,
    day: string,
    initial_start_date: string,
    initial_end_date: string,
    final_start_date: string,
    final_end_date: string,
    interval: number,
    company_id: string,
    state: boolean
}

interface User {
    id: string;
    name: string;
    email: string;
    phone_number: string;
    is_active: boolean;
    is_verified: boolean;
    avatar: string;
    role: string[];
    company?: Company;
}



export interface Store {
    is_loggedin: boolean;
    token: string | null;
    user: User | null;
    service: Services[] | null;
    company: Company[] | [];
    hours: Hours[] | null;
    setLoggedin: (logged: boolean) => void;
    setToken: (token: string) => void;
    setUser: (user: User) => void;
    setCompany: (company: Company[]) => void;
    setService: (service: Services[]) => void;
    setHours: (hours: Hours[]) => void;
    logout: () => void;
}

export const userState = create<Store>()(
    persist(
        (set) => ({
            is_loggedin: false,
            user: null,
            token: null,
            service: null,
            company: [],
            hours: null,
            setLoggedin: (payload: boolean) => set((state: Store) =>({ ...state, is_loggedin: payload})),
            setUser: (payload: User) => set((state: Store) => ({ ...state, user: payload })),
            setToken: (token: string) => set((state: Store) => ({ ...state, token })),
            setCompany: (company: Company[]) => set((state: Store) => ({ ...state, company})),
            setService: (service: Services[]) => set((state) => ({ ...state, service})),
            setHours: (hours: Hours[]) => set((state) => ({ ...state, hours })),
            logout: () => set({ is_loggedin: false, user: null, token: null, service: null, company: [] }),
        }),
        {
            name: 'token',
            storage: createJSONStorage(() => sessionStorage),
        }
    )
)
