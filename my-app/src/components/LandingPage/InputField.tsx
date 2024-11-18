import React from "react";
import { FormFields } from "../../interfaces.ts";
import AgeField from "./AgeField.tsx";

interface FormFieldProps {
	dataArray: FormFields[];
	title: string;
	changeHandler: Function;
	vertical: boolean;
	showValidMessage?: boolean;
	required: boolean;
	nameAgeFields: boolean;
	ageHandler?: Function;
}

export default function InputField({ dataArray, title, vertical, changeHandler, showValidMessage, required, nameAgeFields, ageHandler }: FormFieldProps) {
	const createFormFields = (arr: FormFields[]): JSX.Element[] => {
		const elements = arr.map((x: FormFields, y: number) => {
			if (x.type === "radio") {
				return (
					<div
						key={`${x.visitorKey}_${y}`}
						className={vertical ? "flex flex-col gap-2 w-full" : "flex flex-row items-center first:ml-0 first:mr-0 md:ml-3 gap-2 ml-0 mr-0"}
					>
						<label
							className="text-xl font-thin"
							htmlFor={x.id}
						>
							{x.label}
						</label>
						<input
							id={x.id}
							type={x.type}
							placeholder={x.placeHolder}
							name={x.name}
							onChange={(event) => changeHandler(event, x.visitorKey)}
							value={x.value}
							className="form-radio border border-fuchsia-900 rounded-sm focus:border-fuchsia-800 accent-fuchsia-800 focus:accent-fuchsia-900"
						></input>
					</div>
				);
			} else {
				return (
					<div
						key={`${x.visitorKey}_${y}`}
						className={vertical ? "flex flex-row grow relative" : "flex flex-col grow gap-2 relative"}
					>
						<label
							className="text-xl sr-only"
							htmlFor={x.id}
						>
							{x.label}
						</label>
						<input
							id={x.id}
							type={x.type}
							placeholder={x.label}
							name={x.label}
							onChange={(event) => changeHandler(event, x.visitorKey)}
							className="border border-slate-800 rounded-sm pl-2 focus:outline-fuchsia-800 text-xl font-normal text-black leading-8 py-1 tracking-wider placeholder:text-slate-800 placeholder:font-light"
						></input>
						<p
							className="absolute -bottom-5 text-rose-900 text-sm"
							style={showValidMessage && x.id === "email" ? { display: "" } : { display: "none" }}
						>{`*Please provide a valid ${x.id}.`}</p>
					</div>
				);
			}
		});

		return elements;
	};

	const createNameAgeFields = (arr: FormFields[]): JSX.Element[] => {
		return arr.map((x: FormFields, y: number): JSX.Element => {
			if (x.name === 'age' && ageHandler) {
				return (
					<AgeField
						index={y}
						changeHandler={(event: React.ChangeEvent<HTMLInputElement>): void => ageHandler(event, x.visitorKey)}
						fieldId={`${x.visitorKey}_${y}`}
						childField={false}
					/>
				)
			} else {
				return (
					<div
						key={`${x.visitorKey}_${y}`}
						className={vertical ? "flex flex-row grow relative md:col-span-2" : "flex flex-col grow gap-2 relative md:col-span-2"}
					>
						<label
							className="text-xl sr-only"
							htmlFor={x.id}
						>
							{x.label}
						</label>
						<input
							id={x.id}
							type={x.type}
							placeholder={x.label}
							name={x.label}
							onChange={(event: React.ChangeEvent<HTMLInputElement>) => changeHandler(event, x.visitorKey)}
							className="border border-slate-800 rounded-sm pl-2 focus:outline-fuchsia-800 text-xl font-normal text-black leading-8 py-1 tracking-wider placeholder:text-slate-800 placeholder:font-light"
						></input>
						<p
							className="absolute -bottom-5 text-rose-900 text-sm"
							style={showValidMessage && x.id === "email" ? { display: "" } : { display: "none" }}
						>{`*Please provide a valid ${x.id}.`}</p>
					</div>
				);
			}
		});
	}

	return (
		<div className="fields_wrapper flex flex-col gap-x-2 mt-8 gap-y-1">
			<p className="text-xl font-medium text-left mb-1">
				{title}
				<span className={required ? "inline text-fuchsia-800 text-xl font-medium ml-1" : "hidden"}>*</span>
			</p>

			{nameAgeFields ?
				(
					<div className="grid grid-cols-1 md:grid-cols-5 gap-2">
					{createNameAgeFields(dataArray)}
					</div>
				)
				:
				(
					<div className="grid grid-cols-1 md:flex md:flex-row md:flex-wrap gap-2 md:justify-start">{createFormFields(dataArray)}</div>
				)
			}
		</div>
	);
}
