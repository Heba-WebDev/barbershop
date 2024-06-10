
export interface service {
    id: string;
    name : string;
    avatar: string;
    price: number;
    is_active: boolean;
}

export interface IAddService {
    name: string;
    price: number;
}

export interface Services {
    id: string;
    name: string;
    price: string;
    avatar: string;
    is_active: boolean;
}