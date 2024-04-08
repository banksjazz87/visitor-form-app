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
            className="flex flex-row items-center first:ml-0 first:mr-0 md:ml-5 md:mr-5 gap-2 ml-0 mr-0"
           
            >
            <label 
                className="text-xl" 
                htmlFor={`x_${index}`}
            >
                {x}
            </label>
            <input 
                id={`x_${index}`} 
                type="radio"
                name={buttonGroupName} 
                value={x.toLowerCase()} 
                onChange={(event) => changeHandler(event, y)}
                className="border border-slate-700 rounded-sm focus:border-fuchsia-800"></input>
        </div>
        )
    });

    return (
        <div className="fields_wrapper flex flex-row align-middle items-center gap-x-2 mt-4 gap-y-2">
        <p className="text-xl font-medium text-left mr-4">
            Age:
        </p>
        <div className="grid grid-cols-1 md:flex md:flex-row md:flex-wrap gap-2 md:justify-start">
            {ageFields}
        </div>
   </div>
    );
}