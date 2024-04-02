import { FormFields, Visitor, BtnGroup, APIResponse, StateData, InterestData } from "../../interfaces.ts";

export default class SetupForm {
	public initStates: FormFields = {
		type: "select",
		name: "",
		placeHolder: "",
		label: "",
		id: "",
		value: "",
		visitorKey: "state",
	};

	public initVisitor: Visitor = {
		title: "",
		visitorName: {
			firstName: "Burt",
			lastName: "",
		},
		address: "",
		city: "",
		state: "",
		phone: "",
		email: "",
		contactMethod: "",
		interests: [""],
		prayerRequest: "",
		spouseName: {
			firstName: "",
			lastName: "",
		},
		childrenNames: [
			{
				firstName: "",
				lastName: "",
			},
		],
	};

	public initInterest: BtnGroup = {
		value: "",
		visitorKey: "",
	};

	public getInitStates() {
		return this.initStates;
	}

	public getInitVisitor() {
		return this.initVisitor;
	}

	public getInitInterests() {
		return this.initInterest;
	}

	public async getStateData(): Promise<any> {
		const stateData: Response = await fetch("/all-states");
		const stateDataJSON: APIResponse<StateData> = await stateData.json();

		try {
			if (stateDataJSON.message === "Success") {
				const stateValues: FormFields[] = stateDataJSON.data.map((x: StateData, y: number): FormFields => {
					let currentObj: FormFields = {
						type: "select",
						name: x.state_name,
						placeHolder: "",
						label: x.state_name,
						id: `${x.state_name}_option`,
						value: x.state_name,
						visitorKey: "state",
					};
					return currentObj;
				});
				return stateValues;
			} else {
				alert(`The following error has occurred ${stateDataJSON.error}`);
			}
		} catch (error: unknown) {
			console.error(`Error with getting /all-states, ${error}`);
		}
	}

	public async getInterests(): Promise<any> {
		const allInterests: Response = await fetch("/all-interests");
		const interestsJSON: APIResponse<InterestData> = await allInterests.json();

		try {
			if (interestsJSON.message === "Success") {
				const createInterests: BtnGroup[] = interestsJSON.data.map((x: InterestData, y: number): BtnGroup => {
					let currentObj = {
						value: x.interest,
						visitorKey: "interests",
					};

					return currentObj;
				});
				return createInterests;
			} else {
				alert(`The following error occured while accessing all interests: ${interestsJSON.error}`);
			}
		} catch (error: unknown) {
			console.error(`Error getting the interests, ${error}`);
		}
	}
}
