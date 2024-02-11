"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
function Hero() {
    return (<div id="landing-page-screen" className="bg-slate-900 text-white h-screen flex items-center">
        <div className="h10 flex-col justify-center">
            <h1 className="text-5xl text-center font-extrabold text-fuchsia-600">Welcome to our Church!</h1>
            <p className="text-center w-9/12 m-auto mt-5 font-light">We're so glad you've come to worship with us this morning!  Help us get to know you by filling out this form.</p>
            <div className="flex justify-center mt-10">
                <button className="bg-sky-700 hover:bg-sky-900 transition-colors ease-in-out delay-200 py-2 px-10 rounded-sm shadow-sm shadow-slate-700"><a href="/">Fill out form</a></button>
            </div>
        </div>
    </div>);
}
exports.default = Hero;
