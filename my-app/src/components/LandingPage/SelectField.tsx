import React from "react";
import {FormFields} from "../../interfaces.ts";

interface SelectFieldProps{
    dataArray: FormFields[];
    changeHandler: Function;
    label: string;
    selectID: string;
}

export default function SelectField({dataArray, changeHandler, label, selectID}: SelectFieldProps) {

    const returnOptions = dataArray.map((x: FormFields, y: number): JSX.Element => {
        return (
            <option id={x.id} key={`state_option_${y}`} value={x.value}>{x.value}</option>
        );
    });

    const selectHandler = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        changeHandler(e, dataArray[0].visitorKey);
    }

    return (
        <div className="fields_wrapper flex flex-col gap-x-2 mt-2 sm:mt-6 gap-y-2">
            <div className="flex flex-col gap-2 flex-1 justify-start">
                <label className="text-white sr-only" htmlFor={selectID}>{label}</label>
                <select 
                    id={selectID} 
                    name={selectID} 
                    className="border border-slate-800 text-slate-600 focus:outline-fuchsia-800 text-xl font-light tracking-wider leading-relaxed rounded-sm pl-2 min-h-8" 
                    onChange={selectHandler}
                >
                <option>State</option>
                {returnOptions}
            </select>
            </div>
       </div>
    );
}