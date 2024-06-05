
export interface service {
    id: string;
    name : string;
    is_active: boolean;
    price: number;
    company_id: string;
}

export interface IAddService {
    name: string;
    price: string;
}