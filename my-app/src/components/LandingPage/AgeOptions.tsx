import React from "react";


interface AgeOptionsProps {
    index: number;
    changeHandler: Function;
    buttonGroupName: string;
}
export default function AgeOptions({index, changeHandler, buttonGroupName}: AgeOptionsProps) {

    const ages: string[] = ['Child', 'Teen', 'Adult'];

   const ageFields = ages.map((x: string, y: number): JSX.Element => {
        return (
            <div 
            key={`age_${y}`} 
            className="flex flex-row items-center first:ml-0 first:mr-0 md:ml-3 gap-2 ml-4 mr-0"
           
            >
            <label 
                className="text-xl font-thin" 
                htmlFor={`${x}_${index}`}
            >
                {x}
            </label>
            <input 
                id={`${x}_${index}`} 
                type="radio"
                name={buttonGroupName} 
                value={x.toLowerCase()} 
                onChange={(event) => changeHandler(event, index)}
                className="border border-slate-700 rounded-sm focus:border-fuchsia-800"></input>
        </div>
        )
    });

    return (
        <div className="fields_wrapper flex flex-row align-middle items-center mt-2 px-0">
        <p className="text-xl font-normal text-left mr-2">
            Age:
        </p>
        <div className="flex felx-row md:flex md:flex-row md:flex-wrap gap-0 md:justify-start">
            {ageFields}
        </div>
   </div>
    );
}