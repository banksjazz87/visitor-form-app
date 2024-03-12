import React from "react";
import {BtnGroup} from "../../interfaces.ts";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

interface ButtonGroupProps {
    title: string;
    subTitle: string;
    dataArray: BtnGroup[];
    values: String[];
    clickHandler: Function;
}

export default function ButtonGroup({dataArray, values, clickHandler, title, subTitle}: ButtonGroupProps): JSX.Element {


    const buttonElements: JSX.Element[] = dataArray.map((x: BtnGroup, y: number): JSX.Element => {

        if (values.indexOf(x.value) > -1) {
            return (
                <div key={`btnGroupItem_${y}`} className="pb-4 flex flex-row justify-center gap-0 md:justify-start md:gap-2">
                <FontAwesomeIcon
                    icon={faCheck}
                    style={{color: '#c026d3', marginTop: '4px'}}
                    className="text-xl"
                />
                <button 
                    type="button" 
                    data-value={x.value} 
                    onClick={(event: React.MouseEvent<HTMLButtonElement>): void => clickHandler(event, x.value)}
                    className="text-xl font-light"
                >
                    {x.value}
                </button>
            </div>
            )
        } else {
        return (
            <div key={`btnGroupItem_${y}`} className="pb-4 flex flex-row justify-center gap-0 md:justify-start md:gap-2">
                <FontAwesomeIcon
                    icon={faCheck}
                    style={{opacity: '0', marginTop: '4px'}}
                    className="text-xl"
                />
                <button 
                    type="button" 
                    data-value={x.value}
                    className="text-xl font-light"
                    onClick={(event: React.MouseEvent<HTMLButtonElement>): void => clickHandler(event, x.value)}
            >
                {x.value}
            </button>
            </div>
        );
        }
    });

    return (
        <div className="mt-24">
            <p className="text-center font-medium text-xl">{title}</p>
            <p className="text-center italic">{subTitle}</p>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 md:place-items-center">
                {buttonElements}
            </div>
        </div>
    )
}