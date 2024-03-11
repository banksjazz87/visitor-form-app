import React from "react";
import { FormFields } from "../../interfaces.ts";

interface FormFieldProps {
    dataArray: FormFields[];
    title: string;
    changeHandler: Function;
    vertical: boolean;
    showValidMessage?: boolean;
}

export default function InputField({dataArray, title, vertical, changeHandler, showValidMessage}: FormFieldProps) {

    const createFormFields = (arr: FormFields[]): JSX.Element[] => {
        const elements = arr.map((x: FormFields, y: number) => {
            if (x.type === "radio") {
                return (
                <div 
                    key={`${x.visitorKey}_${y}`} 
                    className={vertical ? 'flex flex-col gap-2': 'flex flex-row first:ml-0 first:mr-0 ml-10 mr-10 gap-2' }
                >
                    <label className="text-xl text-slate-700" htmlFor={x.id}>{x.label}</label>
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
                            className="border border-slate-800 rounded-sm pl-2 text-slate-900 focus:outline-fuchsia-800 text-xl font-light leading-8 placeholder:text-slate-600"></input>
                            <p className="absolute -bottom-7 text-amber-400 text-sm"style={showValidMessage && x.id === 
                            'email' ? {"display": ''} : {"display": "none"}}>{`*Please provide a valid ${x.id}.`}</p>
                    </div>
                );
            }
        });

        return elements;
    }

    return (
       <div className="fields_wrapper flex flex-col gap-x-2 mt-12 gap-y-2">
            <p className="text-xl font-bold text-left mb-2">{title}</p>
            <div className="flex flex-row flex-wrap gap-2 justify-start">
                {createFormFields(dataArray)}
            </div>
       </div>
    )
}