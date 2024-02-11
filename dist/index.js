"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 4900;
//All middleware functions
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});
app.use(express_1.default.static(path_1.default.join(__dirname, "../my-app/build")));
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../my-app/build/index.html"));
});
