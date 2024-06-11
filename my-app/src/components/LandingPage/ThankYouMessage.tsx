import React from "react";
import logo from "../../assets/images/chapel-no-background-logo-min.png";


interface ThankYouProps {
    show: boolean;
}
export default function ThankYouMessage({show}: ThankYouProps) {
    if (show) {
        return (
            <div className="bg-gradient-to-br from-slate-900 to-gray-800 text-white h-screen flex flex-col items-center justify-center min-h-full md:justify-center">
                <div className="flex flex-col w-11/12 mt-5 md:w-8/12">
                    <img src={logo} alt="Chapel on the Hill logo" className="mx-auto h-28 w-auto md:h-60 md:w-auto" width="300" height="163"></img>
                    <h2 className="text-4xl font-extrabold text-center mb-0 mt-14 md:text-5xl">Thank You!</h2>
                    <p className="text-center text-lg m-auto mt-5 font-thin tracking-wider leading-8 md:text-xl">
                        Thank you so much for taking the time to complete our church visitor form! We look forward to seeing you again soon and continuing to grow together in faith and
                        fellowship. Feel free to check out our Facebook page and website to keep up to date for upcoming events.
                    </p>

                    <div className="flex flex-col justify-center mx-auto mt-14 gap-8 max-w-72 md:flex-row md:max-w-full">
                        <a
                            href="https://www.facebook.com/chapelonthhill"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-block bg-fuchsia-800 hover:bg-fuchsia-900 transition-colors ease-in-out delay-200 py-4 px-20 text-xl rounded-full  capitalize tracking-wider text-white text-center w-full"
                        >
                            Facebook
                        </a>
                        <a
                            href="https://www.chapelonthehillag.com/"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-block bg-fuchsia-800 hover:bg-fuchsia-900 transition-colors ease-in-out delay-200 py-4 px-20 text-xl rounded-full  capitalize tracking-wider text-white text-center w-full"
                        >
                            Website
                        </a>
                    </div>
                </div>
            </div>
        );
        }
}
