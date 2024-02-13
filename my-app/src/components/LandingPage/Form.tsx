import React, {useState} from "react";
import {Visitor} from "../../interfaces.ts";
import FormConstructor from "../../Lib/FormConstructor.ts";
import InputField from "./InputField.tsx";
import express from 'express';

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
                <InputField 
                    dataArray={form.getInterests()}
                    title="I am interested in learning more about:"
                    changeHandler={() => console.log(test)}
                    vertical={true}
                />
            </form>

        </div>
    );
}