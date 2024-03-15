"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
//Mailer HERE
const nodemailer = require("nodemailer");
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
//MAILER HERE
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});
function sendMail() {
    return __awaiter(this, void 0, void 0, function* () {
        const info = yield transporter.sendMail({
            from: `Visitor Form <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            subject: "Testing the visitor app",
            text: "This worked!",
            html: "<h1>This actually worked</h1>"
        });
        console.log("Message Sent: %s", info.messageId);
    });
}
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
            "error": Db.getSqlError(err)
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
            "error": Db.getSqlError(err)
        });
    });
});
app.get('/get-person/:first/:last', (req, res) => {
    const Db = new databaseMethods_1.DBMethods(process.env.MYSQL_HOST, process.env.MYSQL_USER, process.env.MYSQL_DATABASE, process.env.MYSQL_PASSWORD);
    const firstName = req.params.first;
    const lastName = req.params.last;
    Db.getPerson('Attendants', firstName, lastName)
        .then((data) => {
        res.send({
            "message": "Success",
            "data": data
        });
    })
        .catch((err) => {
        res.send({
            "message": "Failure",
            "error": Db.getSqlError(err)
        });
    });
});
app.post('/add-attendant', (req, res) => {
    const Db = new databaseMethods_1.DBMethods(process.env.MYSQL_HOST, process.env.MYSQL_USER, process.env.MYSQL_DATABASE, process.env.MYSQL_PASSWORD);
    const attendantColumns = "firstName, lastName, memberType, age";
    const attendantValues = [req.body.visitorName.firstName, req.body.visitorName.lastName, 'visitor', 'adult'];
    Db.insert('Attendants', attendantColumns, attendantValues)
        .then((data) => {
        res.send({
            "message": "Success",
            "data": data
        });
    })
        .catch((err) => {
        res.send({
            "message": "Failure",
            "error": Db.getSqlError(err)
        });
    });
});
app.post('/add-visitor-to-all', (req, res) => {
    const Db = new databaseMethods_1.DBMethods(process.env.MYSQL_HOST, process.env.MYSQL_USER, process.env.MYSQL_DATABASE, process.env.MYSQL_PASSWORD);
    const attendantData = req.body.attendantData;
    const attendanceGroupTable = process.env.GENERAL_ATTENDANCE;
    const groupTableColumns = "id, firstName, lastName, age, memberType";
    const groupTableValues = [attendantData.id, attendantData.firstName, attendantData.lastName, attendantData.age, attendantData.memberType];
    const visitorTable = process.env.VISITOR_TABLE;
    const visitorData = req.body.visitorData;
    const visitorColumnValues = {
        id: attendantData.id,
        firstName: visitorData.visitorName.firstName,
        lastName: visitorData.visitorName.lastName,
        title: visitorData.title,
        address: visitorData.address,
        city: visitorData.city,
        state: visitorData.state,
        phone: visitorData.phone,
        email: visitorData.email,
        contact_method: visitorData.contactMethod,
        prayer_requests: visitorData.prayerRequest
    };
    const visitorTableColumns = Object.keys(visitorColumnValues).join(', ');
    const visitorValues = Object.values(visitorColumnValues);
    const interestTable = process.env.INTERESTS_TABLE;
    const interestColumns = "visitor_id, interest";
    const interests = visitorData.interests;
    Promise.all([Db.insertNoEnd(attendanceGroupTable, groupTableColumns, groupTableValues), Db.insertNoEnd(visitorTable, visitorTableColumns, visitorValues), Db.addMultipleValuesNoEnd(interestTable, interestColumns, attendantData.id, interests), Db.endDb(), sendMail()])
        .then((data) => {
        res.send({
            "message": "Success",
            "data": data
        });
    })
        .catch((err) => {
        res.send({
            "message": "Failure",
            "error": Db.getSqlError(err) ? Db.getSqlError(err) : err
        });
        console.log('OH NOOOOO', err);
    });
});
