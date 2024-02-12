import { FormFields } from "../../src/interfaces.ts";

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
		{
			type: "select",
			name: "address",
			placeHolder: "",
			label: "State",
			id: "state",
			value: "",
			visitorKey: "state",
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

	interests: FormFields[] = [
		{
			type: "radio",
			name: "interests",
			placeHolder: "",
			label: "Salvation",
			id: "interest-salvation",
			value: "Salvation",
			visitorKey: "interests",
		},
		{
			type: "radio",
			name: "interests",
			placeHolder: "",
			label: "Baptism/Water Baptism",
			id: "interest-water-baptism",
			value: "Baptism/Water Baptism",
			visitorKey: "interests",
		},
		{
			type: "radio",
			name: "interests",
			placeHolder: "",
			label: "Baby Dedication",
			id: "interest-baby-dedication",
			value: "Baby Dedication",
			visitorKey: "interests",
		},
		{
			type: "radio",
			name: "interests",
			placeHolder: "",
			label: "Joining the Church/Membership",
			id: "interest-join-church",
			value: "Joining the Church/Membership",
			visitorKey: "interests",
		},
		{
			type: "radio",
			name: "interests",
			placeHolder: "",
			label: "Small Groups/Bible Studies",
			id: "interest-small-group-bible-studies",
			value: "Small Groups/Bible Studies",
			visitorKey: "interests",
		},
		{
			type: "radio",
			name: "interests",
			placeHolder: "",
			label: "Men's Group",
			id: "interest-mens-group",
			value: "Men's Group",
			visitorKey: "interests",
		},
		{
			type: "radio",
			name: "interests",
			placeHolder: "",
			label: "Women's Group",
			id: "interest-womens-group",
			value: "Women's Group",
			visitorKey: "interests",
		},
		{
			type: "radio",
			name: "interests",
			placeHolder: "",
			label: "Nursery (0-2 years)",
			id: "interest-nursery",
			value: "Nursery (0-2 years)",
			visitorKey: "interests",
		},
		{
			type: "radio",
			name: "interests",
			placeHolder: "",
			label: "Pre-school (3-5 years)",
			id: "interest-pre-school",
			value: "Pre-school (3-5 years)",
			visitorKey: "interests",
		},
		{
			type: "radio",
			name: "interests",
			placeHolder: "",
			label: "Kid's Church (K-6th grade)",
			id: "interest-kids-church",
			value: "Kid's Church (K - 6th grade)",
			visitorKey: "interests",
		},
		{
			type: "radio",
			name: "interests",
			placeHolder: "",
			label: "Youth",
			id: "interest-youth",
			value: "Youth (7th-12th grade)",
			visitorKey: "interests",
		},
		{
			type: "radio",
			name: "interests",
			placeHolder: "",
			label: "Mom's Group",
			id: "interest-moms-group",
			value: "Mom's Group",
			visitorKey: "interests",
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

	getInterests() {
		return this.interests;
	}
}
