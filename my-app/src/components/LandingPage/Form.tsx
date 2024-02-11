import React, {useState} from "react";
import {Visitor} from "../../interfaces.ts";

interface FormFields {
    type: string;
    placeHolder: string;
    label: string;
    id: string;
    value: string;
    visitorKey: string;
}

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
        contactMethod: ''
    });


    const formFields: FormFields[] = [
        {type: 'input', placeHolder: '', label: '', id: '', value: '', visitorKey: ''}, 
    ]

    return (
        <form method="/visitor-form" action="POST">
            
        </form>
    )
}