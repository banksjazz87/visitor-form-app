import React from "react";
import {ChildData} from "../../interfaces.ts";
import AgeOptions from "../LandingPage/AgeOptions.tsx";


interface ChildrenFieldsProps {
    count: number;
    names: ChildData[];
    nameHandler: Function;
    ageHandler: Function;
}


export default function ChildrenFields({count, names, nameHandler, ageHandler}: ChildrenFieldsProps) {
    
    const fields: JSX.Element[] = names.map((x: ChildData, y: number): JSX.Element => {
        return (
					<div
						key={`child_${y}_fields`}
						className="flex flex-col mt-2 gap-0"
					>
						<div
							className="grid grid-cols-1 md:flex md:flex-row md:flex-wrap gap-2 md:justify-start"
							key={`child_${y + 1}`}
						>
							<div className="flex flex-col grow relative">
								<label
									className="text-xl sr-only"
									htmlFor={`child_first_name_${y}`}
								>
									{`Child ${y + 1} first name`}
								</label>
								<input
									id={`child_first_name_${y}`}
									className="border border-slate-800 rounded-sm pl-2 py-1 focus:outline-fuchsia-800 text-xl font-normal text-black leading-8 tracking-wider placeholder:text-slate-800 placeholder:font-light"
									type="text"
									placeholder="First Name"
									onChange={(event) => nameHandler(event, y, "firstName")}
									value={x.firstName}
								/>
							</div>

							<div className="flex flex-col grow relative">
								<label
									className="text-xl sr-only"
									htmlFor={`child_last_name_${y}`}
								>
									{`Child ${y + 1} last name`}
								</label>
								<input
									id={`child_last_name_${y}`}
									className="border border-slate-800 rounded-sm pl-2 py-1 focus:outline-fuchsia-800 text-xl font-normal text-black leading-8 tracking-wider placeholder:text-slate-800 placeholder:font-light"
									type="text"
									placeholder="Last Name"
									onChange={(event) => nameHandler(event, y, "lastName")}
									value={x.lastName}
								/>
							</div>
						</div>

						<div
							key={`child_age_${y}`}
							className="flex flex-row items-center gap-2 ml-1 mr-0 py-4"
						>
							<label
								className="text-xl font-medium text-left"
								htmlFor={`child_age_${y}`}
							>
								Age
							</label>
							<input
								id={`child_age_${y}`}
								type="text"
								name={`child_age_${y}`}
								onChange={(event) => ageHandler(event, y)}
								className="rounded-sm focus:border-fuchsia-800 outline-none border-b border-slate-700"
							></input>
						</div>

						{/* <AgeOptions
							index={y}
							changeHandler={ageHandler}
							buttonGroupName={`child_${y}`}
						/> */}
					</div>
				);
    });
    
    
    if (count > 0) {
        return (
            <div className="flex flex-col gap-6 grow">
                {fields}
            </div>
        )
    }
}