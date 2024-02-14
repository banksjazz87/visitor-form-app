export interface Name {
    firstName: string;
    lastName: string;
}

export interface Visitor {
    title: string;
    visitorName: Name;
    address: string;
    city: string;
    state: string;
    phone: string;
    email: string;
    contactMethod: string;
    interests: string[];
    prayerRequest: string;
}

export interface FormFields {
    type: string;
    name: string;
    placeHolder: string;
    label: string;
    id: string;
    value: string;
    visitorKey: string;
}

export interface BtnGroup {
    value: string;
    visitorKey: string;
}