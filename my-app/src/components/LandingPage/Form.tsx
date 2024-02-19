import React, {useState, useEffect} from "react";
import {Visitor, States, StateData, APIResponse, FormFields, BtnGroup} from "../../interfaces.ts";
import FormConstructor from "../../lib/FormConstructor.ts";
import InputField from "./InputField.tsx";
import ButtonGroup from "./ButtonGroup.tsx";
import SelectField from "./SelectField.tsx";

interface InterestData {
    id: number;
    interest: string;
}

export default function Form() {

    const [visitorDetails, setVisitorDetails] = useState<Visitor>({
        title: '',
        visitorName: {
            firstName: 'Burt', 
            lastName: ''
        },
        address: '',
        city: '',
        state: '',
        phone: '',
        email: '',
        contactMethod: '', 
        interests: [''], 
        prayerRequest: ''
    });

    const [states, setStates] = useState<FormFields[]>([
        {
            type: "select",
            name: "",
            placeHolder: '',
            label: '',
            id: "",
            value: "",
            visitorKey: 'state'
        }
    ]);

    const [interestList, setInterestList] = useState<BtnGroup[]>([
        {
            value: '', 
            visitorKey: ''
        }
    ]);

    

    const getStateData = async(): Promise<any> => {
        const stateData: Response = await fetch('/all-states');
        const stateDataJSON: APIResponse<StateData> = await stateData.json();

        try {
            if (stateDataJSON.message === 'Success') {
                const stateValues = stateDataJSON.data.map((x: StateData, y: number): FormFields => {
                    let currentObj: FormFields = {
                        type: "select",
                        name: x.state_name,
                        placeHolder: '',
                        label: x.state_name,
                        id: `${x.state_name}_option`,
                        value: x.state_name,
                        visitorKey: 'state'
                    };
                    return currentObj;
                });
                setStates(stateValues);
            } else {
                alert(`The following error has occurred ${stateDataJSON.error}`);
            }
            } catch(error: unknown) {
                console.error(`Error with getting /all-states, ${error}`);
            }
        }

    const getInterests = async(): Promise<any> => {
        const allInterests: Response = await fetch('/all-interests');
        const interestsJSON: APIResponse<InterestData> = await allInterests.json();

        try {
            console.log(interestsJSON);

            if (interestsJSON.message === 'Success') {
                const createInterests: BtnGroup[] = interestsJSON.data.map((x: InterestData, y: number ): BtnGroup => {
                    let currentObj = {
                        value: x.interest,
                        visitorKey: 'interests'
                    };

                    return currentObj;
                });
                
                setInterestList(createInterests);
            } else {
                alert(`The following error occured while accessing all interests: ${interestsJSON.error}`);
            }
        } catch (error: unknown) {
            console.log(`Error getting the interests, ${error}`);
        }
    }


    useEffect(() => {
        getStateData();
        getInterests();
    }, []);

    
    const form = new FormConstructor();

    //Change handler for the input and select fields.
    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>, key: string): void => {
        let currentKey = key as keyof Visitor;
        setVisitorDetails({...visitorDetails, [currentKey]: (e.target as HTMLInputElement).value});
        console.log(visitorDetails);
    }
    

    //Change handler for the name field.
    const nameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>, key: string): void => {
        let currentKey = key as keyof Visitor;
        setVisitorDetails({
                ...visitorDetails, 
                visitorName: {
                ...visitorDetails.visitorName,
                [currentKey]: (e.target as HTMLInputElement).value}
    });
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
    }


    /**
     * 
     * @param value string
     * @returns string[]
     * @description returns a new array that either has the value added, or removed depending on if it already exists.
     */
    const updatedInterests = (value: string): string[] => {
        const currentInterests = visitorDetails.interests.slice();

        if (!checkIfExists(currentInterests, value)) {
            const newInterest = [value];
            const newArray = currentInterests.concat(newInterest);
            return newArray;

        } else {
            const indexOfInterest = currentInterests.indexOf(value);
            currentInterests.splice(indexOfInterest, 1);
            return currentInterests;
        }  
    }


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
            setVisitorDetails({...visitorDetails, 
                    interests: updatedInterests(selectedValue)
                });
            
        } else {
            return;
        }
    }


    return (
        <div className="flex flex-col gap-8 lg:w-9/12 sm:w-screen m-auto mt-14 mb-14">
            <form className='shadow-md p-4 sm:mx-10 shadow-slate-900 rounded-lg'>
                <InputField 
                    dataArray={form.getTitleFields()}
                    title="Title"
                    changeHandler={inputChangeHandler}
                    vertical={true}
                />
                <InputField 
                    dataArray={form.getNameFields()}
                    title="Name"
                    changeHandler={nameChangeHandler}
                    vertical={false}
                />
                <InputField 
                    dataArray={form.getAddressFields()}
                    title="Address"
                    changeHandler={inputChangeHandler}
                    vertical={false}
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
                    changeHandler={() => console.log(test)}
                    vertical={false}
                />
                <InputField 
                    dataArray={form.getContactMethodFields() }
                    title="Preferred Contact Method"
                    changeHandler={() => console.log(test)}
                    vertical={true}
                />
                
                <ButtonGroup
                    title="I am interested in learning more about"
                    subTitle="(please click on all that apply)"
                    dataArray={form.getInterests()}
                    values={visitorDetails.interests}
                    clickHandler={buttonGroupClickHandler}
                />

                <div className="flex justify-center">
                    <input type="submit" value="Submit" className="bg-sky-700 hover:bg-sky-900 transition-colors text-white ease-in-out delay-200  py-2 px-10 rounded-sm shadow-sm shadow-slate-700 m-auto"></input>
                </div>
               
            </form>

        </div>
    );
}