import React from "react";
import logo from "../../assets/images/chapel-no-background-logo.png";


interface ThankYouProps {
    show: boolean;
}
export default function ThankYouMessage({show}: ThankYouProps) {
    if (show) {
        return (
            <div className="bg-gradient-to-br from-slate-900 to-gray-800 text-white h-screen flex flex-col items-center justify-start min-h-full">
                <div className="flex flex-col w-6/12 md:mt-16 md:w-8/12">
                    <img src={logo} alt="Chapel on the Hill logo" className="mx-auto w-100" width="300" height="163"></img>
                    <h2 className="text-5xl font-extrabold text-center mb-6 mt-20">Thank You!</h2>
                    <p className="text-center text-xl m-auto mt-5 font-thin tracking-wider leading-8">
                        Thank you so much for taking the time to complete our church visitor form! We are truly grateful for your presence and the opportunity to connect with you. We look forward to seeing you again soon and continuing to grow together in faith and
                        fellowship. Feel free to check out our Facebook page and website to keep up to date for upcoming events.
                    </p>

                    <div className="flex flex-col md:flex-row justify-center gap-8 mt-12">
                        <a
                            href="https://www.facebook.com/chapelonthhill"
                            target="_blank"
                            rel="noreferrer"
                            className="bg-fuchsia-800 hover:bg-fuchsia-900 transition-colors ease-in-out delay-200 py-4 px-20 text-xl rounded-full  capitalize tracking-wider text-white"
                        >
                            Facebook
                        </a>
                        <a
                            href="https://www.chapelonthehillag.com/"
                            target="_blank"
                            rel="noreferrer"
                            className="bg-fuchsia-800 hover:bg-fuchsia-900 transition-colors ease-in-out delay-200 py-4 px-20 text-xl rounded-full  capitalize tracking-wider text-white"
                        >
                            Website
                        </a>
                    </div>
                </div>
            </div>
        );
        }
}
