import React, {useState} from "react";
import {Visitor} from "../../interfaces.ts";
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
    

    return (
        <div>
            
        </div>
    )
}