"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
require("../src/index.css");
function App() {
    return (<div className="bg-slate-700">
      <header>
        <h1 className="text-3xl font-bold underline">Hello World</h1>
      </header>
    </div>);
}
exports.default = App;
