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
            return (
                <div key={`${x.visitorKey}_${y}`} className={vertical ? 'flex flex-row grow gap-2' : 'flex flex-col grow gap-2'}>
                    <label htmlFor={x.id}>{x.label}</label>
                    <input id={x.id} type={x.type} placeholder={x.placeHolder} onChange={(event) => changeHandler(event, x.visitorKey)}></input>
                </div>
            );
        });

        return elements;
    }

    return (
       <div className="fields_wrapper flex flex-col gap-2">
            <p className="text-lg font-bold">{title}</p>
            <div className="flex flex-row flex-wrap">
                {createFormFields(dataArray)}
            </div>
       </div>
    )
}