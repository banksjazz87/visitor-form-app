import React from "react";
import { FormFields } from "../../interfaces.ts";

interface FormFieldProps {
    dataArray: FormFields[];
    title: string;
    changeHandler: Function;
    vertical: boolean;
}

export default function InputField({dataArray, title, vertical, changeHandler}: FormFieldProps) {

    const createFormFields = (arr: FormFields[]): JSX.Element[] => {
        const elements = arr.map((x: FormFields, y: number) => {
            if (x.type === "radio") {
                return (
                <div key={`${x.visitorKey}_${y}`} className={vertical ? 'flex flex-row grow' : 'flex flex-col grow gap-2'}>
                    <label htmlFor={x.id}>{x.label}</label>
                    <input id={x.id} type={x.type} placeholder={x.placeHolder} name={x.name} onChange={(event) => changeHandler(event, x.visitorKey)} value={x.value} className="border border-slate-700 rounded-sm"></input>
                </div>
                );
            } else {
                return (
                    <div key={`${x.visitorKey}_${y}`} className={vertical ? 'flex flex-row grow' : 'flex flex-col grow gap-2'}>
                        <label htmlFor={x.id}>{x.label}</label>
                        <input id={x.id} type={x.type} placeholder={x.placeHolder} name={x.name} onChange={(event) => changeHandler(event, x.visitorKey)} className="border border-slate-700 rounded-sm pl-2"></input>
                    </div>
                );
            }
        });

        return elements;
    }

    return (
       <div className="fields_wrapper flex flex-col gap-x-2 mt-6 gap-y-2">
            <p className="text-lg font-bold text-center">{title}</p>
            <div className="flex flex-row flex-wrap gap-2 justify-center">
                {createFormFields(dataArray)}
            </div>
       </div>
    )
}