import React from "react";
import logo from "../../assets/images/chapel-no-background-logo.png";

interface HeroProps {
    show: boolean;
}
export default function Hero({show}: HeroProps) {

    const clickHandler = (e: React.MouseEvent<HTMLButtonElement>): void => {
        const form = document.getElementById('visitor-form');
        form?.scrollIntoView({behavior: 'smooth'});
    }
    
    if (show) {
    return (
    <div id="landing-page-screen" className="bg-gradient-to-br from-slate-900 to-gray-800 text-white h-screen flex flex-col items-center justify-start min-h-full">
        <div className="h-10 flex flex-col mt-8 w-11/12 md:mt-32 md:w-full">
        <img src={logo} alt="Chapel on the Hill logo" className="mx-auto w-100" width="300" height="163"></img>
            <h1 className="text-5xl text-center font-extrabold text-white mt-10">Welcome to our Church!</h1>
            <p className="text-center text-xl m-auto mt-5 font-thin tracking-wider leading-8">We're so glad you've come to worship with us this morning! <br/> Help us get to know you by filling out this form.</p>
            <div className="flex justify-center mt-10">
                <button 
                    className="bg-fuchsia-800 hover:bg-fuchsia-900 transition-colors ease-in-out delay-200 py-4 px-20 text-2xl rounded-full  capitalize tracking-wider"
                    onClick={clickHandler}
                >Fill out form</button>
            </div>
        </div>
    </div>
    );
    }
}