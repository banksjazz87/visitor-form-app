import React from "react";
import { ChildData } from "../../interfaces.ts";
import AgeField from "./AgeField.tsx";

interface ChildrenFieldsProps {
	count: number;
	names: ChildData[];
	nameHandler: Function;
	ageHandler: Function;
}

export default function ChildrenFields({ count, names, nameHandler, ageHandler }: ChildrenFieldsProps) {
	const fields: JSX.Element[] = names.map((x: ChildData, y: number): JSX.Element => {
		return (
			<div
				key={`child_${y}_fields`}
				className="mt-2 border border-slate-800 rounded-sm py-4 pb-6 px-4"
			>
				<p className="text-xl font-normal text-left mr-2">{`Child ${y + 1}`}</p>
				<div className="flex flex-col mt-2 gap-0">
					<div
						className="grid grid-cols-1 md:grid-cols-5 gap-2"
						key={`child_${y + 1} `}
					>
						<div className="flex flex-col grow relative md:col-span-2">
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

						<div className="flex flex-col grow relative md:col-span-2">
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

						<AgeField
							index={y}
							changeHandler={ageHandler}
							fieldId={`child_age_${y}`}
							childField={true}
						/>
					</div>
				</div>
			</div>
		);
	});

	if (count > 0) {
		return <div className="flex flex-col gap-6 grow">{fields}</div>;
	}
}
