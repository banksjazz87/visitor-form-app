import React from "react";
import {BtnGroup} from "../../interfaces.ts";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

interface ButtonGroupProps {
    dataArray: BtnGroup[];
    values: String[];
    changeHandler: Function;
}

export default function ButtonGroup({dataArray, values, changeHandler}: ButtonGroupProps): JSX.Element {


    const buttonElements: JSX.Element[] = dataArray.map((x: BtnGroup, y: number): JSX.Element => {

        if (values.indexOf(x.value) > -1) {
            return (
                <div key={`btnGroupItem_${y}`}>
                <FontAwesomeIcon
                    icon={faCheck}
                />
                <button 
                    type="button" 
                    data-value={x.value} 
                    onClick={(event: React.MouseEvent<HTMLButtonElement>): void => changeHandler(event, x.value)}
                >
                    {x.value}
                </button>
            </div>
            )
        } else {
        return (
            <div key={`btnGroupItem_${y}`}>
                <button 
                    type="button" 
                    data-value={x.value}
                    onClick={(event: React.MouseEvent<HTMLButtonElement>): void => changeHandler(event, x.value)}
            >
                {x.value}
            </button>
            </div>
        );
        }
    });

    return (
        <div>
            {buttonElements}
        </div>
    )
}