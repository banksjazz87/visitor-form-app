export interface Name {
    firstName: string;
    lastName: string;
}

export interface Visitor {
    title: string;
    name: Name;
    address: string;
    city: string;
    state: string;
    phone: string;
    email: string;
    contactMethod: string;
}