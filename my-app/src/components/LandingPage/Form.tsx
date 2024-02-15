import React, {useState} from "react";
import {Visitor} from "../../interfaces.ts";
import FormConstructor from "../../Lib/FormConstructor.ts";
import InputField from "./InputField.tsx";
import ButtonGroup from "./ButtonGroup.tsx";


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
        interests: ["Men's Group"], 
        prayerRequest: ''
    });

    const form = new FormConstructor();

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>, key: string): void => {
        let currentKey = key as keyof Visitor;
        setVisitorDetails({...visitorDetails, [currentKey]: (e.target as HTMLInputElement).value});
        console.log(visitorDetails);
    }
    

    const nameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>, key: string): void => {
        let currentKey = key as keyof Visitor;
        setVisitorDetails({
                ...visitorDetails, 
                visitorName: {
                ...visitorDetails.visitorName,
                [currentKey]: (e.target as HTMLInputElement).value}
    });
    }

    const checkIfExists = (array: string[], value: string): boolean => {
        if (array.indexOf(value) > -1) {
            return true;
        } else {
            return false;
        }
    }

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

    const buttonGroupChangeHandler = (e: React.MouseEvent<HTMLButtonElement>, dataPoint: string): void => {
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
        <div className="flex flex-col gap-8 w-6/12 m-auto">
            <form>
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
                    dataArray={form.getInterests()}
                    values={visitorDetails.interests}
                    changeHandler={buttonGroupChangeHandler}
                />
            </form>

        </div>
    );
}