import React from "react";
import ReCAPTCHA from "react-google-recaptcha";

interface CSProps {
    id: string;
}
export default function CaptchaSubmit({ id }: CSProps) {

    const captchaSubmit = (token: ReCAPTCHA): void => {
			const form = document.getElementById(id) as HTMLFormElement;
			if (form) {
				form.submit();
			}
    };
    
    return (
			<button
				className="g-recaptcha"
				data-sitekey="6LcXmaUpAAAAAM4L4xUctdBGTtnO3PCL9xnNGe46"
				data-callback="captchaSubmit"
				data-action="submit"
				style={{ opacity: 0 }}
			>
				Submit
			</button>
		);
}