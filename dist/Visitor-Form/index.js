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
const databaseMethods_1 = require("./dbQueries/databaseMethods");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 4900;
//All middleware functions
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.listen(port, () => {
    const Db = new databaseMethods_1.DBMethods(process.env.MYSQL_HOST, process.env.MYSQL_USER, process.env.MYSQL_DATABASE, process.env.MYSQL_PASSWORD);
    Db.connect();
    console.log(`CRpp is listening on port ${port}`);
});
app.use(express_1.default.static(path_1.default.join(__dirname, "../../my-app/build")));
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../../my-app/build/index.html"));
});
app.get('/all-states', (req, res) => {
    const Db = new databaseMethods_1.DBMethods(process.env.MYSQL_HOST, process.env.MYSQL_USER, process.env.MYSQL_DATABASE, process.env.MYSQL_PASSWORD);
    Db.getTable('States', 'ASC', 'state_name')
        .then((data) => {
        res.send({
            "message": "Success",
            "data": data
        });
        console.log(data);
    })
        .catch((err) => {
        console.log('error', Db.getSqlError(err));
        res.send({
            "message": "Failure",
            "error": err
        });
    });
});
app.get('/all-interests', (req, res) => {
    const Db = new databaseMethods_1.DBMethods(process.env.MYSQL_HOST, process.env.MYSQL_USER, process.env.MYSQL_DATABASE, process.env.MYSQL_PASSWORD);
    Db.getTable('Interests', 'ASC', 'id')
        .then((data) => {
        res.send({
            "message": "Success",
            "data": data
        });
        console.log(data);
    })
        .catch((err) => {
        res.send({
            "message": "Failure",
            "error": err
        });
    });
});