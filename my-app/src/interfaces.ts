export interface Name {
    firstName: string;
    lastName: string;
}

export interface ChildData extends Name {
    age: number;
}

export interface DBChildData extends Name {
    birthYear: number | null;
    ageGroup: string;
}

export interface Visitor {
    title: string;
    visitorName: Name;
    visitorAge: number;
    address: string;
    city: string;
    state: string;
    phone: string;
    email: string;
    contactMethod: string;
    interests: string[];
    prayerRequest: string;
    spouseName: Name;
    spouseAge: number;
    children: ChildData[];
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

export interface States {
    state: string,
}

export interface StateData {
    id: Number, 
    state_name: string,
    state_abbreviation: string
}

export interface APIResponse<Type> {
    message: string,
    data: Type[], 
    error: string
}

export interface InterestData {
    id: number;
    interest: string;
}

export interface AttendantData {
	id: number;
	firstName: string;
	lastName: string;
	age: string;
	memberType: string;
	active: number;
}

export interface NeededFamilyData {
	primary: AttendantData;
	spouse: AttendantData;
	children: AttendantData[];
}

export interface AllVisitorData {
	visitorData: Visitor;
	attendantData: NeededFamilyData;
}

export interface Validate {
    contact: boolean;
}

export interface RequiredFields{
    name: boolean;
    title: boolean;
    address: boolean;
    contact: boolean;
    contactMethod: boolean;
    state: boolean;
}

export interface GrecapthaRes {
	success: boolean;
	challenge_ts: string;
	hostname: string;
	score: number;
	action: string;
}

export interface CaptchaAPI {
    message: string;
    error: string;
	data: GrecapthaRes;
}

export interface CaptchaToken {
    tokenString: string;
}