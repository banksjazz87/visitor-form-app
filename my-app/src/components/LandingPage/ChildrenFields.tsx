import React from "react";
import {Name} from "../../interfaces.ts";


interface ChildrenFieldsProps {
    count: number;
    names: Name[];
}


export default function ChildrenFields({count, names}: ChildrenFieldsProps) {
    
    const fields: JSX.Element[] = names.map((x: Name, y: number): JSX.Element => {
        return (
            <div 
                className="flex flex-row gap-2"
                key={`child_${y + 1}`}
            >
                <div className="flex flex-col grow relative">
                    <label 
                        className="text-xl sr-only" 
                        htmlFor={`child_first_name_${y}`}
                    >
                        {`Child ${y + 1} first name`}</label>
                    <input 
                        id={`child_first_name_${y}`}
                        className="border border-slate-800 rounded-sm pl-2 focus:outline-fuchsia-800 text-xl font-normal text-black leading-8 tracking-wider placeholder:text-slate-800 placeholder:font-light" 
                        type="text" 
                        placeholder="First Name"
                        value={x.firstName}
                    />
                </div>

                <div className="flex flex-col grow relative">
                    <label 
                        className="text-xl sr-only" 
                        htmlFor={`child_last_name_${y}`}
                    >
                        {`Child ${y + 1} last name`}</label>
                    <input 
                        id={`child_last_name_${y}`}
                        className="border border-slate-800 rounded-sm pl-2 focus:outline-fuchsia-800 text-xl font-normal text-black leading-8 tracking-wider placeholder:text-slate-800 placeholder:font-light" 
                        type="text" 
                        placeholder="Last Name"
                        value={x.lastName}
                    />
                    
                </div>
            </div>
        );
    });
    
    
    if (count > 0 && names.length > 0) {
        return (
            <div className="flex flex-col gap-2 grow">
                {fields}
            </div>
        )
    }
}