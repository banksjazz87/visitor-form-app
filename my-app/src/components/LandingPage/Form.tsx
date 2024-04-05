import React, { useState, useEffect } from "react";
import { Visitor, FormFields, BtnGroup, APIResponse, AttendantData, AllVisitorData, Validate, Name } from "../../interfaces.ts";
import SetupForm from "../../lib/form/constructors.ts";
import postCall from "../../lib/methods/API/postCall.ts";
import FormConstructor from "../../lib/form/FormConstructor.ts";
import InputField from "./InputField.tsx";
import ButtonGroup from "./ButtonGroup.tsx";
import SelectField from "./SelectField.tsx";
import MathFunctions from "../../lib/methods/MathFunctions.ts";
import FormChecker from "../../lib/form/FormChecker.ts";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import ChildrenFields from "../../components/LandingPage/ChildrenFields.tsx";


interface FormProps {
	show: boolean;
	showHandler: Function;
	startLoading: Function;
	stopLoading: Function;
}

export default function Form({ show, showHandler, startLoading, stopLoading }: FormProps) {
	const initForm = new SetupForm();
	const form = new FormConstructor();

	const [visitorDetails, setVisitorDetails] = useState<Visitor>(initForm.getInitVisitor());
	const [states, setStates] = useState<FormFields[]>([initForm.getInitStates()]);
	const [interestList, setInterestList] = useState<BtnGroup[]>([initForm.getInitInterests()]);
	const [validateMessage, setShowValidateMessage] = useState<Validate>({
		contact: false,
	});
	const [childCount, setChildCount] = useState<number>(0);
	

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

	useEffect(():void => {

	})

	//Change handler for the input and select fields.
	const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>, key: string): void => {
		let currentKey = key as keyof Visitor;

		if (currentKey === "phone") {
			phoneNumberChangeHandler(e, key);
		} else if (currentKey === "email") {
			emailChecker(e);
			setVisitorDetails({ ...visitorDetails, [currentKey]: (e.target as HTMLInputElement).value.trim() });
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


	//Change handler for the child age.
	const childAgeChangeHandler = (e: React.ChangeEvent<HTMLInputElement>, index: number): void => {
		let copyOfChildArray = visitorDetails.children.slice();
		copyOfChildArray[index]['age'] = e.target.value as string;

		setVisitorDetails({
			...visitorDetails, children: copyOfChildArray,
		});
	}


	//Change handler for the child's name.
	const childNameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>, index: number, nameType: "firstName" | "lastName"): void => {
		let copyOfChildArray = visitorDetails.children.slice();
		copyOfChildArray[index][nameType] = e.target.value as string;

		setVisitorDetails({
			...visitorDetails, children: copyOfChildArray,
		});
	}


	//Change handler for the spouse name field.
	const spouseNameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>, key: string): void => {
		let currentKey  = key as keyof Visitor; 
		setVisitorDetails({
			...visitorDetails,
			spouseName: {
				...visitorDetails.spouseName,
				[currentKey]: (e.target as HTMLInputElement).value.trim(),
			},
		});
	}



	/**
	 *
	 * @param e Change Event on an HTML Input Element
	 * @param key string pertaining to the relevant key of the visitorDetails.
	 * @returns void
	 * @description changeHandler for the phone number field.
	 */
	const phoneNumberChangeHandler = (e: React.ChangeEvent<HTMLInputElement>, key: string): void => {
		const currentKey = key as keyof Visitor;
		const prevValue = visitorDetails[currentKey] as string;
		const newValue = (e.target as HTMLInputElement).value;
		const newEntry = newValue[newValue.length - 1];

		if (newValue.length > prevValue.length) {
			if (isNaN(parseInt(newEntry))) {
				alert("Please insert a valid number");
				e.target.value = e.target.value.slice(0, -1);
			} else {
				let phoneNum = MathFunctions.createPhoneNumber(newValue);
				e.target.value = phoneNum;
				setVisitorDetails({ ...visitorDetails, [currentKey]: phoneNum });
			}
		} else {
			setVisitorDetails({ ...visitorDetails, [currentKey]: newValue });
		}
	};

	/**
	 *
	 * @param e Change event on an HTML Input Element
	 * @returns void
	 * @description checks to make sure an email is vaild as the user fills in the field.
	 */
	const emailChecker = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const validator = () => {
			const emailRegex: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
			const currentValue: string = (e.target as HTMLInputElement).value;

			if (!emailRegex.test(currentValue)) {
				setShowValidateMessage({ ...validateMessage, contact: true });
				clearInterval(validatorInterval);
			} else {
				setShowValidateMessage({ ...validateMessage, contact: false });
				clearInterval(validatorInterval);
			}
		};
		const validatorInterval = setInterval(validator, 2000);
	};

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


	const childCountIncrement = (e: React.MouseEvent<HTMLButtonElement>): void => {
		setChildCount(childCount + 1);

		if (childCount !== 0) {
			const currentChildList = visitorDetails.children.slice();
			const newObj = [{
			firstName: '', 
			lastName: '', 
			age: ''
			}];
			const newArray = currentChildList.concat(newObj);
			setVisitorDetails({...visitorDetails, 
				children: newArray,
			});
		} 
		
	}

	const childCountDecrement = (e: React.MouseEvent<HTMLButtonElement>): void => {
		if (childCount !== 0) {
			setChildCount(childCount -1);

			if (visitorDetails.children.length > 1) {
				const newList = visitorDetails.children.slice(0, -1);
				setVisitorDetails({...visitorDetails, 
				children: newList,
			});
			}
		} 
	}


	


	/**
	 * @returns void
	 * @description this is the function that is called as long as if none of the required fields are empty.
	 */
	const submitForm = (): void => {
		startLoading();

		//Check if the user is already in the database
		getRecords(`/get-person/${visitorDetails.visitorName.firstName}/${visitorDetails.visitorName.lastName}`).then((data: APIResponse<AttendantData> | undefined): void => {
			if (typeof data !== "undefined" && data.data.length === 0) {
				//Add the user only if they don't already exist.
				postCall("/add-attendant", visitorDetails).then((data: APIResponse<Visitor>): void => {
					if (data.message === "Success") {
						//Get the records for the newly created user.
						getRecords(`/get-person/${visitorDetails.visitorName.firstName}/${visitorDetails.visitorName.lastName}`).then((data: APIResponse<AttendantData> | undefined): void => {
							if (typeof data !== "undefined" && data.data.length > 0) {
								//Get the values needed and put them in an object.
								const neededAttendantData = {
									id: data.data[0].id,
									firstName: data.data[0].firstName,
									lastName: data.data[0].lastName,
									age: "adult",
									memberType: "visitor",
									active: 1,
								};

								//This is the object that will be sent over for the post.
								const allVisitorData: AllVisitorData = {
									visitorData: visitorDetails,
									attendantData: neededAttendantData,
								};

								//Add visitor to all of the needed tables.
								postCall("/add-visitor-to-all", allVisitorData).then((data: APIResponse<Visitor>): void => {
									const firstName = visitorDetails.visitorName.firstName;
									const lastName = visitorDetails.visitorName.lastName;

									if (data.message === "Success") {
										//This is called to hide all content with the exception of the thank you message.
										stopLoading();
										showHandler();
										
									} else {
										stopLoading();
										alert(`The following error has occurred while inserting ${firstName} ${lastName} into the group table: ${data.error}`);
									}
								});
							} else {
								//Error in the getRecords function for the newly created user.
								stopLoading();
								alert("There was an error in retrieving the newly created visitor.");
							}
						});
					} else {
						//Error in adding the visitor
						stopLoading();
						alert("This failed!");
					}
				});
			} else {
				//Alert that this person already exists in the database.
				stopLoading();
				alert("This person is already in the database");
			}
		});
	};

	//Submit handler for the form
	const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
		e.preventDefault();
		const FormCheck = new FormChecker(["streetAddress", "first-name", "last-name", "phone", "city", "email", "states_dropdown"]);

		//Check to see if any required fields are empty and also check for a valid email address.
		if (!FormCheck.verifyNoneRequiredEmpty() || validateMessage.contact) {
			FormCheck.showRequired();
		} else {
			submitForm();
		}
	};

	if (show) {
		return (
			<div
				id="visitor-form"
				className="flex flex-col gap-8 max-w-screen-lg lg:w-9/12 sm:w-11/12 m-auto pt-14 pb-14"
			>
				<form
					id="captcha-form"
					className="shadow-2xl p-6 pb-10 pt-10 sm:mx-10 shadow-slate-900 rounded-lg"
					onSubmit={submitHandler}
				>
					<h2 className="text-4xl font-medium text-center mb-6">Visitor Form</h2>

					<InputField
						dataArray={form.getNameFields()}
						title="Name"
						changeHandler={nameChangeHandler}
						vertical={false}
						required={true}
					/>

					<InputField
						dataArray={form.getSpouseNameFields()}
						title="Spouse"
						changeHandler={spouseNameChangeHandler}
						vertical={false}
						required={false}
					/>

					<div className="mt-8 flex flex-row gap-6 items-center pb-2">
						<p className="text-xl font-medium text-left">Number of children</p>
						<div className="flex flex-row gap-2">
						<button 
								type="button"
								onClick={childCountDecrement}
							>
								<FontAwesomeIcon
									icon={faMinus}
								/>
							</button>
							<p className="text-xl font-medium">{childCount}</p>
							<button 
								type="button"
								onClick={childCountIncrement}
							>
								<FontAwesomeIcon
									icon={faPlus}
								/>
							</button>
						</div>
					</div>

					<ChildrenFields
						count={childCount}
						names={visitorDetails.children}
						nameHandler={childNameChangeHandler}
						ageHandler={childAgeChangeHandler}
					/>
					
					<InputField
						dataArray={form.getAddressFields()}
						title="Address"
						changeHandler={inputChangeHandler}
						vertical={false}
						required={true}
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
						required={true}
					/>

					<div className="grid sm:grid-cols-2">
						<InputField
							dataArray={form.getTitleFields()}
							title="Title"
							changeHandler={inputChangeHandler}
							vertical={false}
							required={true}
						/>

						<InputField
							dataArray={form.getContactMethodFields()}
							title="Preferred Contact Method"
							changeHandler={inputChangeHandler}
							vertical={false}
							required={true}
						/>
					</div>

					<ButtonGroup
						title="I am interested in learning more about"
						subTitle="(please click on all that apply)"
						dataArray={interestList}
						values={visitorDetails.interests}
						clickHandler={buttonGroupClickHandler}
					/>

					<div className="fields_wrapper flex flex-col justify-center justify-items-center gap-x-2 mt-12 mb-6 gap-y-2">
						<p className="text-xl font-medium text-center">Prayer Request</p>
						<p className="text-xl font-thin text-center">
							We will be glad to join you in praying for your specific needs.
							<br />
							How can we pray for you?
						</p>
						<textarea
							className=" text-xl font-normal text-black leading-8 tracking-wider border border-slate-700 rounded-sm w-11/12 h-60 mt-2 m-auto p-2 focus:outline-fuchsia-800"
							data-value="prayer-request"
							onChange={textAreaChangeHandler}
						></textarea>
					</div>

					<div className="flex justify-center">
						<input
							type="submit"
							value="Submit"
							className="bg-fuchsia-800 hover:bg-fuchsia-900 cursor-pointer transition-colors ease-in-out delay-200 py-4 px-20 text-2xl rounded-full  capitalize tracking-wider m-auto text-white"
						></input>
					</div>
				</form>
			</div>
		);
	}
}
