import React, {useState} from "react";
import {Visitor, FormFields} from "../../interfaces.ts";
import FormConstructor from "../../Lib/FormConstructor.ts";

export default function Form() {

    const [visitorDetails, setVisitorDetails] = useState<Visitor>({
        title: '',
        name: {
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

    const createFormFieldsVerticalLabel = (arr: FormFields[]): JSX.Element[] => {
        const elements = arr.map((x: FormFields, y: number) => {
            return (
                <div key={`${x.visitorKey}_${y}`}>
                    <label htmlFor={x.id}>{x.label}</label>
                    <input id={x.id} type={x.type} placeholder={x.placeHolder}></input>
                </div>
            );
        });

        return elements;
    }
    

    return (
        <div>
            {createFormFieldsVerticalLabel(form.getContactFields())}
        </div>
    )
}