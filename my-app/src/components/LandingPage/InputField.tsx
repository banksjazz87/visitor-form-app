import React from "react";
import { FormFields } from "../../interfaces.ts";

interface FormFieldProps {
    dataArray: FormFields[];
    title: string;
    changeHandler: Function;
    vertical: boolean;
    showValidMessage?: boolean;
    required: boolean;
}

export default function InputField({dataArray, title, vertical, changeHandler, showValidMessage, required}: FormFieldProps) {

    const createFormFields = (arr: FormFields[]): JSX.Element[] => {
        const elements = arr.map((x: FormFields, y: number) => {
            if (x.type === "radio") {
                return (
                <div 
                    key={`${x.visitorKey}_${y}`} 
                    className={vertical ? 'flex flex-col gap-2 w-full': 'flex flex-row items-center first:ml-0 first:mr-0 md:ml-5 md:mr-5 gap-2 ml-0 mr-0' }
                   
                >
                    <label className="text-xl" htmlFor={x.id}>{x.label}</label>
                    <input 
                        id={x.id} type={x.type} 
                        placeholder={x.placeHolder} name={x.name} 
                        onChange={(event) => changeHandler(event, x.visitorKey)} 
                        value={x.value} 
                        className="border border-slate-700 rounded-sm focus:border-fuchsia-800"></input>
                </div>
                );
            } else {
                return (
                    <div 
                        key={`${x.visitorKey}_${y}`} 
                        className={vertical ? 'flex flex-row grow relative' : 'flex flex-col grow gap-2 relative'}
                    >
                        <label className="text-xl sr-only"htmlFor={x.id}>{x.label}</label>
                        <input 
                            id={x.id} 
                            type={x.type} 
                            placeholder={x.label} 
                            name={x.label} 
                            onChange={(event) => changeHandler(event, x.visitorKey)} 
                            className="border border-slate-800 rounded-sm pl-2 focus:outline-fuchsia-800 text-xl font-normal text-black leading-8 tracking-wider placeholder:text-slate-800 placeholder:font-light"></input>
                            <p className="absolute -bottom-5 text-rose-900 text-sm"style={showValidMessage && x.id === 
                            'email' ? {"display": ''} : {"display": "none"}}>{`*Please provide a valid ${x.id}.`}</p>
                    </div>
                );
            }
        });

        return elements;
    }

    return (
       <div className="fields_wrapper flex flex-col gap-x-2 mt-8 gap-y-2">
            <p className="text-xl font-medium text-left mb-2">
                {title}
                <span className={required ? "inline text-fuchsia-800 text-xl font-medium ml-1" : "hidden"}>*</span>
            </p>
            <div className="grid grid-cols-1 md:flex md:flex-row md:flex-wrap gap-2 md:justify-start">
                {createFormFields(dataArray)}
            </div>
       </div>
    )
}