import React from "react";
import {FormFields} from "../../interfaces.ts";

interface SelectFieldProps{
    dataArray: FormFields[];
    changeHandler: Function;
    label: string;
    selectID: string;
    showRequired: boolean;
}

export default function SelectField({dataArray, changeHandler, label, selectID, showRequired}: SelectFieldProps) {

    const returnOptions = dataArray.map((x: FormFields, y: number): JSX.Element => {
        return (
            <option id={x.id} key={`state_option_${y}`} value={x.value}>{x.value}</option>
        );
    });

    const selectHandler = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        changeHandler(e, dataArray[0].visitorKey);
    }

    return (
        <div className="fields_wrapper flex flex-col gap-x-2 mt-6 gap-y-2">
            <div className="flex flex-col gap-2 flex-1 justify-start">
                <label htmlFor={selectID}>{label}</label>
                <select 
                    id={selectID} 
                    name={selectID} 
                    className={!showRequired ? "border border-slate-700 rounded-sm pl-2" : "border border-rose-400 rounded-sm pl-2"} 
                    onChange={selectHandler}
                >
                {returnOptions}
            </select>
            </div>
       </div>
    );
}