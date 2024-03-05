import React from "react";
import { FormFields } from "../../interfaces.ts";

interface FormFieldProps {
    dataArray: FormFields[];
    title: string;
    changeHandler: Function;
    vertical: boolean;
    showValidMessage?: boolean;
    showRequired: boolean;
}

export default function InputField({dataArray, title, vertical, changeHandler, showValidMessage, showRequired}: FormFieldProps) {

    const createFormFields = (arr: FormFields[]): JSX.Element[] => {
        const elements = arr.map((x: FormFields, y: number) => {
            if (x.type === "radio") {
                return (
                <div 
                    key={`${x.visitorKey}_${y}`} 
                    className={vertical ? 'flex flex-col gap-2': 'flex flex-row mr-10 ml-10 gap-2' }
                >
                    <label htmlFor={x.id}>{x.label}</label>
                    <input 
                        id={x.id} type={x.type} 
                        placeholder={x.placeHolder} name={x.name} 
                        onChange={(event) => changeHandler(event, x.visitorKey)} 
                        value={x.value} 
                        className="border border-slate-700 rounded-sm"></input>
                </div>
                );
            } else {
                return (
                    <div 
                        key={`${x.visitorKey}_${y}`} 
                        className={vertical ? 'flex flex-row grow relative' : 'flex flex-col grow gap-2 relative'}
                    >
                        <label htmlFor={x.id}>{x.label}</label>
                        <input 
                            id={x.id} 
                            type={x.type} 
                            placeholder={x.placeHolder} 
                            name={x.name} 
                            onChange={(event) => changeHandler(event, x.visitorKey)} 
                            className={showRequired ? "border-2 border-rose-400 rounded-sm pl-2" : "border border-slate-700 rounded-sm pl-2"}></input>
                            {/* <p className="absolute -bottom-7"style={showValidMessage && x.id === 
                            'email' ? {"display": ''} : {"display": "none"}}>{`Please provide a valid ${x.id}.`}</p> */}
                    </div>
                );
            }
        });

        return elements;
    }

    return (
       <div className="fields_wrapper flex flex-col gap-x-2 mt-12 gap-y-2">
            <p className="text-lg font-bold text-center">{title}</p>
            <p className={ showRequired ? "text-sm font-bold text-center text-rose-900" : "hidden"}>*Please provide a response for each item in this section.</p>
            <div className="flex flex-row flex-wrap gap-2 justify-center">
                {createFormFields(dataArray)}
            </div>
       </div>
    )
}