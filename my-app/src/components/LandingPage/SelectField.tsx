import React from "react";
import {FormFields} from "../../interfaces.ts";

interface SelectFieldProps{
    dataArray: FormFields[];
    changeHandler: Function;
}

export default function SelectField({dataArray, changeHandler}: SelectFieldProps) {

    const returnOptions = dataArray.map((x: FormFields, y: number): JSX.Element => {
        return (
            <option id={x.id} key={`state_option_${y}`} value={x.value}>{x.value}</option>
        );
    });

    return (
        <div className="fields_wrapper flex flex-col gap-x-2 mt-6 gap-y-2">
            <div className="flex flex-row flex-wrap gap-2 justify-center">
                <select className="border border-slate-700 rounded-sm pl-2" onChange={() => changeHandler()}>
                {returnOptions}
            </select>
            </div>
       </div>
    );
}