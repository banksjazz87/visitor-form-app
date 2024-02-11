"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Hero_tsx_1 = __importDefault(require("../components/LandingPage/Hero.tsx"));
require("../../src/index.css");
function LandingPage() {
    return (<div id="landing-page">
            <Hero_tsx_1.default />
        </div>);
}
exports.default = LandingPage;
