import React from "react";
import {Name} from "../../interfaces.ts";


interface ChildrenFieldsProps {
    count: number;
    names: Name[];
}


export default function ChildrenFields({count, names}: ChildrenFieldsProps) {
    
    const fields: JSX.Element[] = names.map((x: Name, y: number): JSX.Element => {
        return (
            <div key={`child_${y + 1}`}>
                <h3>{`Child number: ${y + 1}`}</h3>
            </div>
        );
    });
    
    
    if (count > 0) {
        return (
            <div>
                {fields}
            </div>
        )
    }
}