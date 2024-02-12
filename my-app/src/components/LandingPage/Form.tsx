import React, {useState} from "react";
import {Visitor} from "../../interfaces.ts";
import FormConstructor from "../../Lib/FormConstructor.ts";
import FormField from "../../components/LandingPage/FormField.tsx";

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
        <div className="flex flex-col gap-8 w-6/12 m-auto">
            <FormField 
                dataArray={form.getTitleFields()}
                title="Title"
                changeHandler={() => console.log(test)}
                vertical={true}
            />
            <FormField 
                dataArray={form.getNameFields()}
                title="Title"
                changeHandler={() => console.log(test)}
                vertical={false}
            />
            <FormField 
                dataArray={form.getAddressFields()}
                title="Title"
                changeHandler={() => console.log(test)}
                vertical={false}
            />
            <FormField 
                dataArray={form.getContactFields()}
                title="Title"
                changeHandler={() => console.log(test)}
                vertical={false}
            />
            <FormField 
                dataArray={form.getContactMethodFields() }
                title="Title"
                changeHandler={() => console.log(test)}
                vertical={true}
            />
            <FormField 
                dataArray={form.getInterests()}
                title="Title"
                changeHandler={() => console.log(test)}
                vertical={true}
            />

        </div>
    );
}