import { FormFields } from "../interfaces.ts";

export default class FormConstructor {
	titleFields: FormFields[] = [
		{
			type: "radio",
			name: "title",
			placeHolder: "",
			label: "Mr.",
			id: "titleChoice1",
			value: "Mr.",
			visitorKey: "title",
		},
		{
			type: "radio",
			name: "title",
			placeHolder: "",
			label: "Mrs.",
			id: "titleChoice2",
			value: "Mrs.",
			visitorKey: "title",
		},
		{
			type: "radio",
			name: "title",
			placeHolder: "",
			label: "Ms.",
			id: "titleChoice3",
			value: "Ms.",
			visitorKey: "title",
		},
	];

	nameFields: FormFields[] = [
		{
			type: "text",
			name: "name",
			placeHolder: "",
			label: "First Name",
			id: "first-name",
			value: "",
			visitorKey: "firstName",
		},
		{
			type: "text",
			name: "name",
			placeHolder: "",
			label: "Last Name",
			id: "last-name",
			value: "",
			visitorKey: "lastName",
		},
	];

	addressFields: FormFields[] = [
		{
			type: "text",
			name: "address",
			placeHolder: "",
			label: "Street Address",
			id: "street-address",
			value: "",
			visitorKey: "address",
		},
		{
			type: "text",
			name: "address",
			placeHolder: "",
			label: "City",
			id: "city",
			value: "",
			visitorKey: "city",
		},
	];

	contactFields: FormFields[] = [
		{
			type: "text",
			name: "contact",
			placeHolder: "",
			label: "Phone Number",
			id: "phone",
			value: "",
			visitorKey: "phone",
		},
		{
			type: "text",
			name: "contact",
			placeHolder: "",
			label: "Email",
			id: "email",
			value: "",
			visitorKey: "email",
		},
	];

	contactMethodFields: FormFields[] = [
		{
			type: "radio",
			name: "contact-method",
			placeHolder: "",
			label: "Phone Call",
			id: "contact-request-phone-call",
			value: "phone call",
			visitorKey: "contactMethod",
		},
		{
			type: "radio",
			name: "contact-method",
			placeHolder: "",
			label: "Text",
			id: "contact-request-text",
			value: "text",
			visitorKey: "contactMethod",
		},
		{
			type: "radio",
			name: "contact-method",
			placeHolder: "",
			label: "Email",
			id: "contact-request-email",
			value: "email",
			visitorKey: "contactMethod",
		},
	];

	

	getTitleFields() {
		return this.titleFields;
	}

	getNameFields() {
		return this.nameFields;
	}

	getAddressFields() {
		return this.addressFields;
	}

	getContactFields() {
		return this.contactFields;
	}

	getContactMethodFields() {
		return this.contactMethodFields;
	}

}
