import React, { useState, useEffect } from "react";
import { Visitor, FormFields, BtnGroup, APIResponse } from "../../interfaces.ts";
import SetupForm from "../../lib/form/constructors.ts";
import postCall from "../../lib/methods/API/postCall.ts";
import FormConstructor from "../../lib/FormConstructor.ts";
import InputField from "./InputField.tsx";
import ButtonGroup from "./ButtonGroup.tsx";
import SelectField from "./SelectField.tsx";
import MathFunctions from "../../lib/methods/MathFunctions.ts";

interface AttendantData {
	id: number;
	firstName: string;
	lastName: string;
	age: string;
	memberType: string;
	active: number;
}

interface AllVisitorData {
	visitorData: Visitor;
	attendantData: AttendantData;
}

interface Validate {
    title: boolean;
    name: boolean;
    address: boolean;
    contact: boolean;
    preferredContact: boolean;
}

export default function Form() {
	const initForm = new SetupForm();
	const form = new FormConstructor();

	const [visitorDetails, setVisitorDetails] = useState<Visitor>(initForm.getInitVisitor());
	const [states, setStates] = useState<FormFields[]>([initForm.getInitStates()]);
	const [interestList, setInterestList] = useState<BtnGroup[]>([initForm.getInitInterests()]);
    const [validateMessage, setShowValidateMessage] = useState<Validate>({
        title: false,
        name: false,
        address: false,
        contact: false,
        preferredContact: false,
    });

	const [attendantDetails, setAttendantDetails] = useState<AttendantData>({
		id: 0,
		firstName: "",
		lastName: "",
		age: "adult",
		memberType: "visitor",
		active: 1,
	});

	useEffect(() => {
		initForm.getStateData().then((data) => {
			if (typeof data === "object") {
				setStates(data);
			}
		});
		initForm.getInterests().then((data) => {
			if (typeof data === "object") {
				setInterestList(data);
			}
		});
	}, []);

    
	//Change handler for the input and select fields.
	const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>, key: string): void => {
		let currentKey = key as keyof Visitor;

        if (currentKey === 'phone') {
            phoneNumberChangeHandler(e, key);
        } else if (currentKey === 'email') {
            emailChecker(e);
        } else {
            setVisitorDetails({ ...visitorDetails, [currentKey]: (e.target as HTMLInputElement).value.trim() });
        }
	};

	//Change handler for the name field.
	const nameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>, key: string): void => {
		let currentKey = key as keyof Visitor;
		setVisitorDetails({
			...visitorDetails,
			visitorName: {
				...visitorDetails.visitorName,
				[currentKey]: (e.target as HTMLInputElement).value.trim(),
			},
		});
	};

    const phoneNumberChangeHandler = (e: React.ChangeEvent<HTMLInputElement>, key: string): void => {
        const currentKey = key as keyof Visitor;
        const prevValue = visitorDetails[currentKey] as string;
        const newValue = (e.target as HTMLInputElement).value;
        const newEntry = newValue[newValue.length -1];
        
        if (newValue.length > prevValue.length) {
            if (isNaN(parseInt(newEntry))) {
                alert('Please insert a valid number');
                e.target.value = e.target.value.slice(0, -1);

            } else {
                let phoneNum = MathFunctions.createPhoneNumber(newValue);
                e.target.value = phoneNum;
                setVisitorDetails({ ...visitorDetails, [currentKey]: phoneNum });
            }

        } else {
            setVisitorDetails({...visitorDetails, [currentKey]: newValue});
        } 
	};


    const emailChecker = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const validator = () => {
            const emailRegex: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            const currentValue: string = (e.target as HTMLInputElement).value;

            if (!emailRegex.test(currentValue)) {
                setShowValidateMessage({...validateMessage, contact: true});
                clearInterval(validatorInterval);

            } else {
                setShowValidateMessage({...validateMessage, contact: false});
                clearInterval(validatorInterval);
            }
        };

        const validatorInterval = setInterval(validator, 2000);    
    }


	/**
	 *
	 * @param array string[]
	 * @param value string
	 * @returns boolean
	 * @description checks to see if a value exists in an array.
	 */
	const checkIfExists = (array: string[], value: string): boolean => {
		if (array.indexOf(value) > -1) {
			return true;
		} else {
			return false;
		}
	};

	/**
	 *
	 * @param value string
	 * @returns string[]
	 * @description returns a new array that either has the value added, or removed depending on if it already exists.
	 */
	const updatedInterests = (value: string): string[] => {
		const currentInterests = visitorDetails.interests.slice();

		if (currentInterests[0].length === 0) {
			const newInterest = [value];
			const newArray = newInterest;
			return newArray;
		} else if (!checkIfExists(currentInterests, value)) {
			const newInterest = [value];
			const newArray = currentInterests.concat(newInterest);
			return newArray;
		} else {
			const indexOfInterest = currentInterests.indexOf(value);
			currentInterests.splice(indexOfInterest, 1);
			return currentInterests;
		}
	};

	/**
	 *
	 * @param e HTML Event
	 * @returns void
	 * @description the button click handler for the button group.
	 */
	const buttonGroupClickHandler = (e: React.MouseEvent<HTMLButtonElement>): void => {
		const selectedItem = e.target;

		if (selectedItem instanceof HTMLButtonElement) {
			const selectedValue = selectedItem.dataset.value as string;

			setVisitorDetails({ ...visitorDetails, interests: updatedInterests(selectedValue).length > 0 ? updatedInterests(selectedValue) : [""] });
		} else {
			return;
		}
	};

	//Used for updating the prayer request information.
	const textAreaChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
		setVisitorDetails({ ...visitorDetails, prayerRequest: (event.target as HTMLTextAreaElement).value.trim() });
	};

	//Get the data from an endpoint.
	const getRecords = async (url: string): Promise<APIResponse<AttendantData> | undefined> => {
		try {
			const record: Response = await fetch(`${url}`);
			const recordJSON: APIResponse<AttendantData> = await record.json();
			return recordJSON;
		} catch (e) {
			console.error(`The following error occurred with the ${url} endpoint: ${e}`);
		}
	};

    const verifyNoneEmpty = (obj: Visitor, required: String[]): boolean => {
        let valid: boolean = true;
        
        for (const key in obj) {
            if (required.indexOf(key) > -1) {
                let currentKey = key as keyof Visitor;
                
                if (((obj[currentKey] as string).length === 0 )) {
                    let validateKey = key as keyof Validate;
                    setShowValidateMessage({...validateMessage, [validateKey]: true});

                    console.log(validateMessage[validateKey]);
                    valid = false;
               }
            }
        }

        return valid;
    }

	const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
		e.preventDefault();
        if (verifyNoneEmpty(visitorDetails, ['address'])) {
            console.log('Success');
        } else {
            console.log('Can you please provide information for the required fields?');
        }

       
        

		// getRecords(`/get-person/${visitorDetails.visitorName.firstName}/${visitorDetails.visitorName.lastName}`).then((data: APIResponse<AttendantData> | undefined): void => {
		// 	if (typeof data !== "undefined" && data.data.length === 0) {
		// 		postCall("/add-attendant", visitorDetails).then((data: APIResponse<Visitor>): void => {
		// 			if (data.message === "Success") {
		// 				getRecords(`/get-person/${visitorDetails.visitorName.firstName}/${visitorDetails.visitorName.lastName}`).then((data: APIResponse<AttendantData> | undefined): void => {
		// 					if (typeof data !== "undefined" && data.data.length > 0) {
		// 						setAttendantDetails({ ...attendantDetails, id: data.data[0].id, firstName: data.data[0].firstName, lastName: data.data[0].lastName });

		// 						//Get the values needed and put them in an object.
		// 						const neededAttendantData = {
		// 							id: data.data[0].id,
		// 							firstName: data.data[0].firstName,
		// 							lastName: data.data[0].lastName,
		// 							age: "adult",
		// 							memberType: "visitor",
		// 							active: 1,
		// 						};

		// 						//This is the object that will be sent over for the post.
		// 						const allVisitorData: AllVisitorData = {
		// 							visitorData: visitorDetails,
		// 							attendantData: neededAttendantData,
		// 						};

		// 						postCall("/add-visitor-to-all", allVisitorData).then((data: APIResponse<Visitor>): void => {
		// 							if (data.message === "Success") {
		// 								alert(`${attendantDetails.firstName} ${attendantDetails.lastName} has been added to the group table`);
		// 							} else {
		// 								alert(`The following error has occurred while inserting ${attendantDetails.firstName} ${attendantDetails.lastName} into the group table: ${data.error}`);
		// 							}
		// 						});
		// 					} else {
		// 						console.error("There was an error in retrieving the newly created visitor.");
		// 					}
		// 				});
		// 			} else {
		// 				alert("This failed!");
		// 			}
		// 		});
		// 	} else {
		// 		alert("This person is already in the database");
		// 	}
		// });
	};

	return (
		<div className="flex flex-col gap-8 lg:w-9/12 sm:w-11/12 m-auto mt-14 mb-14">
			<form
				className="shadow-md p-4 sm:mx-10 shadow-slate-900 rounded-lg"
				onSubmit={submitHandler}
			>
				<InputField
					dataArray={form.getTitleFields()}
					title="Title"
					changeHandler={inputChangeHandler}
					vertical={false}
                    showValidMessage={validateMessage.title}
				/>
				<InputField
					dataArray={form.getNameFields()}
					title="Name"
					changeHandler={nameChangeHandler}
					vertical={false}
                    showValidMessage={validateMessage.name}
				/>
				<InputField
					dataArray={form.getAddressFields()}
					title="Address"
					changeHandler={inputChangeHandler}
					vertical={false}
                    showValidMessage={validateMessage.address}
				/>

				<SelectField
					dataArray={states}
					changeHandler={inputChangeHandler}
					label="State"
					selectID="states_dropdown"
				/>
				<InputField
					dataArray={form.getContactFields()}
					title="Contact"
					changeHandler={inputChangeHandler}
					vertical={false}
                    showValidMessage={validateMessage.contact}
				/>
				<InputField
					dataArray={form.getContactMethodFields()}
					title="Preferred Contact Method"
					changeHandler={inputChangeHandler}
					vertical={false}
                    showValidMessage={validateMessage.preferredContact}
				/>

				<ButtonGroup
					title="I am interested in learning more about"
					subTitle="(please click on all that apply)"
					dataArray={interestList}
					values={visitorDetails.interests}
					clickHandler={buttonGroupClickHandler}
				/>

				<div className="fields_wrapper flex flex-col justify-center justify-items-center gap-x-2 mt-12 mb-6 gap-y-2">
					<p className="text-lg font-bold text-center">Prayer Request</p>
					<p className="text-center">
						We will be glad to join you in praying for your specific needs.
						<br />
						How can we pray for you?
					</p>
					<textarea
						className="border border-slate-700 rounded-sm w-11/12 h-60 mt-2 m-auto p-2"
						data-value="prayer-request"
						onChange={textAreaChangeHandler}
					></textarea>
				</div>

				<div className="flex justify-center">
					<input
						type="submit"
						value="Submit"
						className="bg-sky-700 hover:bg-sky-900 transition-colors text-white ease-in-out delay-200  py-2 px-10 rounded-sm shadow-sm shadow-slate-700 m-auto"
					></input>
				</div>
			</form>
		</div>
	);
}
