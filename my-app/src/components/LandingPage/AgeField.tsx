import React from "react";


interface AgeFieldProps {
    index?: number;
    changeHandler: Function;
	fieldId: string;
	childField: boolean;
}
export default function AgeField({ index, changeHandler, fieldId, childField }: AgeFieldProps): JSX.Element {
	

	const changeEvent = (event: React.ChangeEvent<HTMLInputElement>): void => {
		if (childField && index) {
			changeHandler(event, index);
		} else {
			changeHandler(event, index);
		}
	};

	return (
		<div className="fields_wrapper flex flex-col grow max-w-24 items-start px-0 md:col-span-1 md:max-w-full md:flex-row md:align-middle md:items-center">
			<label
				className="text-xl font-normal text-left mr-2"
				htmlFor={`${fieldId}`}
			>
				Age
			</label>
			<input
				id={`${fieldId}`}
				type="text"
				name={`${fieldId}}`}
				onChange={changeEvent}
				className="rounded-sm focus:border-fuchsia-800 outline-none border border-slate-700 text-xl font-normal text-black leading-8 tracking-wider w-full py-1 pl-2"
			></input>
		</div>
	);
}