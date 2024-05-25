"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
// import nodemailer from "nodemailer";
const dotenv_1 = __importDefault(require("dotenv"));
const databaseMethods_1 = require("./dbQueries/databaseMethods");
const Mailer_1 = require("./modules/Mailer");
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
    console.log(`App is listening on port ${port}`);
});
app.use(express_1.default.static(path_1.default.join(__dirname, "../../my-app/build")));
app.get("/", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../../my-app/build/index.html"));
});
//Success message that will be sent back and logged
const sendSuccess = (data, res) => {
    res.send({
        message: "Success",
        data: data,
    });
    console.log(data);
};
//Failure message that will be sent back and logged
const sendFailure = (err, res, method) => {
    res.send({
        message: "Failure",
        error: method(err),
    });
    console.log("Failure", err);
};
app.get("/all-states", (req, res) => {
    const Db = new databaseMethods_1.DBMethods(process.env.MYSQL_HOST, process.env.MYSQL_USER, process.env.MYSQL_DATABASE, process.env.MYSQL_PASSWORD);
    Db.getTable("States", "ASC", "state_name")
        .then((data) => sendSuccess(data, res))
        .catch((err) => sendFailure(err, res, Db.getSqlError));
});
app.get("/all-interests", (req, res) => {
    const Db = new databaseMethods_1.DBMethods(process.env.MYSQL_HOST, process.env.MYSQL_USER, process.env.MYSQL_DATABASE, process.env.MYSQL_PASSWORD);
    Db.getTable("Interests", "ASC", "id")
        .then((data) => sendSuccess(data, res))
        .catch((err) => sendFailure(err, res, Db.getSqlError));
});
app.get("/get-person/:first/:last", (req, res) => {
    const Db = new databaseMethods_1.DBMethods(process.env.MYSQL_HOST, process.env.MYSQL_USER, process.env.MYSQL_DATABASE, process.env.MYSQL_PASSWORD);
    const firstName = req.params.first;
    const lastName = req.params.last;
    Db.getPerson("Attendants", firstName, lastName)
        .then((data) => sendSuccess(data, res))
        .catch((err) => sendFailure(err, res, Db.getSqlError));
});
app.post("/get-family", (req, res) => {
    const Db = new databaseMethods_1.DBMethods(process.env.MYSQL_HOST, process.env.MYSQL_USER, process.env.MYSQL_DATABASE, process.env.MYSQL_PASSWORD);
    const visitorAndSpouseName = [
        { firstName: req.body.visitorName.firstName, lastName: req.body.visitorName.lastName },
        { firstName: req.body.spouseName.firstName, lastName: req.body.spouseName.lastName }
    ];
    const childNames = req.body.children.map((x, y) => {
        let currentName = {
            firstName: x.firstName,
            lastName: x.lastName,
        };
        return currentName;
    });
    let finalArrayOfName = [];
    let finalArray = finalArrayOfName.concat(visitorAndSpouseName).concat(childNames);
    Db.selectByNames("Attendants", finalArray)
        .then((data) => sendSuccess(data, res))
        .catch((err) => sendFailure(err, res, Db.getSqlError));
});
app.post("/add-attendant", (req, res) => {
    const Db = new databaseMethods_1.DBMethods(process.env.MYSQL_HOST, process.env.MYSQL_USER, process.env.MYSQL_DATABASE, process.env.MYSQL_PASSWORD);
    const attendantColumns = "firstName, lastName, memberType, age";
    const attendantValues = [req.body.visitorName.firstName, req.body.visitorName.lastName, "visitor", "adult"];
    const spouseValues = [req.body.spouseName.firstName, req.body.spouseName.lastName, "visitor", "adult"];
    const children = req.body.children;
    const firstChildName = children.firstName;
    const childFirstName = req.body.children[0].firstName;
    const spouseFirstName = req.body.spouseName.firstName;
    //Full family
    if (childFirstName.length > 0 && spouseFirstName.length > 0) {
        Promise.all([Db.insertNoEnd("Attendants", attendantColumns, attendantValues), Db.addMultipleNonAdultAttendants("Attendants", attendantColumns, req.body.children), Db.insertUniqueAttendant("Attendants", attendantColumns, spouseValues)])
            .then((data) => {
            res.send({
                message: "Success",
                data: data,
            });
            console.log("This worked", data);
        })
            .catch((err) => {
            res.send({
                message: "Failure",
                error: err !== "undefined" ? Db.getSqlError(err) : err.response,
            });
            console.log("ERROR Inserting", err);
        });
        //Single parent family
    }
    else if (childFirstName.length > 0 && spouseFirstName.length === 0) {
        Promise.all([Db.insertNoEnd("Attendants", attendantColumns, attendantValues), Db.addMultipleNonAdultAttendants("Attendants", attendantColumns, req.body.children), Db.insertUniqueAttendant("Attendants", attendantColumns, spouseValues)])
            .then((data) => {
            res.send({
                message: "Success",
                data: data,
            });
            console.log("This worked", data);
        })
            .catch((err) => {
            res.send({
                message: "Failure",
                error: err !== "undefined" ? Db.getSqlError(err) : err.response,
            });
            console.log("ERROR Inserting", err);
        });
        //Family with no children
    }
    else if (childFirstName.length === 0 && spouseFirstName.length > 0) {
        Db.addMultipleAdultAttendants("Attendants", attendantColumns, [req.body.visitorName, req.body.spouseName])
            .then((data) => sendSuccess(data, res))
            .catch((err) => sendFailure(err, res, Db.getSqlError));
        //Single individual
    }
    else {
        Db.insert("Attendants", attendantColumns, attendantValues)
            .then((data) => sendSuccess(data, res))
            .catch((err) => sendFailure(err, res, Db.getSqlError));
    }
});
app.post("/add-multiple-adults", (req, res) => {
    const Db = new databaseMethods_1.DBMethods(process.env.MYSQL_HOST, process.env.MYSQL_USER, process.env.MYSQL_DATABASE, process.env.MYSQL_PASSWORD);
    const attendantColumns = "firstName, lastName, memberType, age";
    const attendantNames = [req.body.visitorName, req.body.spouseName];
    Db.addMultipleAdultAttendants("Attendants", attendantColumns, attendantNames)
        .then((data) => sendSuccess(data, res))
        .catch((err) => sendFailure(err, res, Db.getSqlError));
});
app.post("/add-visitor-to-all", (req, res) => {
    const Db = new databaseMethods_1.DBMethods(process.env.MYSQL_HOST, process.env.MYSQL_USER, process.env.MYSQL_DATABASE, process.env.MYSQL_PASSWORD);
    const attendantData = req.body.attendantData;
    const attendanceGroupTable = process.env.GENERAL_ATTENDANCE;
    const groupTableColumns = "id, firstName, lastName, age, memberType";
    //Get Primary Data and spouse data values
    const primaryValues = [attendantData.primary];
    const spouseValues = [attendantData.spouse];
    //Get Children Data
    const children = attendantData.children;
    const visitorTable = process.env.VISITOR_TABLE;
    const visitorData = req.body.visitorData;
    const visitorColumnValues = {
        id: attendantData.primary.id,
        firstName: visitorData.visitorName.firstName,
        lastName: visitorData.visitorName.lastName,
        title: visitorData.title,
        address: visitorData.address,
        city: visitorData.city,
        state: visitorData.state,
        phone: visitorData.phone,
        email: visitorData.email,
        contact_method: visitorData.contactMethod,
        prayer_requests: visitorData.prayerRequest,
    };
    const visitorTableColumns = Object.keys(visitorColumnValues).join(", ");
    const visitorValues = Object.values(visitorColumnValues);
    const interestTable = process.env.INTERESTS_TABLE;
    const interestColumns = "visitor_attendant_id, interest";
    const interests = visitorData.interests;
    const spouseTableColumns = 'visitorSpouseId, id, firstName, lastName';
    const spouseTableValues = [primaryValues[0].id, spouseValues[0].id, spouseValues[0].firstName, spouseValues[0].lastName];
    const childrenTableColumns = 'parentId, id, firstName, lastName';
    const childrenTableValues = children.map((x, y) => {
        let currentObj = {
            parentId: primaryValues[0].id,
            id: x.id,
            firstName: x.firstName,
            lastName: x.lastName
        };
        return currentObj;
    });
    //Set up the email notification
    // const emailList = ['banksjazz87@gmail.com', 'whitneymatthews05@gmail.com'];
    const emailList = ["banksjazz87@gmail.com"];
    const interestsString = interests.join(", ");
    const Email = new Mailer_1.Mailer(process.env.EMAIL_USER, process.env.EMAIL_PASSWORD, emailList, visitorData, interestsString);
    //Solo visitor
    if (children[0].firstName.length === 0 && spouseValues[0].firstName.length === 0) {
        const familyData = primaryValues;
        Promise.all([
            Db.insertMultipleVisitorsNoEnd(attendanceGroupTable, familyData),
            Db.insertNoEnd(visitorTable, visitorTableColumns, visitorValues),
            Db.addMultipleValuesNoEnd(interestTable, interestColumns, attendantData.primary.id, interests),
            Email.sendMail(),
        ])
            .then((data) => {
            res.send({
                message: "Success",
                data: data,
            });
        })
            .catch((err) => {
            res.send({
                message: "Failure",
                error: err !== "undefined" ? Db.getSqlError(err) : err.response,
            });
            console.log("OH NOOOOO 1", err);
        });
        //single parent
    }
    else if (children[0].firstName.length > 0 && spouseValues[0].firstName.length === 0) {
        const familyData = primaryValues.concat(children);
        Promise.all([
            Db.insertMultipleVisitorsNoEnd(attendanceGroupTable, familyData),
            Db.insertNoEnd(visitorTable, visitorTableColumns, visitorValues),
            Db.addMultipleValuesNoEnd(interestTable, interestColumns, attendantData.primary.id, interests),
            Db.addBulkSelectApplicants("Visitor_Children", childrenTableColumns, childrenTableValues),
            Email.sendMail(),
        ])
            .then((data) => {
            res.send({
                message: "Success",
                data: data,
            });
        })
            .catch((err) => {
            res.send({
                message: "Failure",
                error: err !== "undefined" ? Db.getSqlError(err) : err.response,
            });
            console.log("OH NOOOOO 2", err);
        });
        //Married no children
    }
    else if (children[0].firstName.length === 0 && spouseValues[0].firstName.length > 0) {
        const familyData = primaryValues.concat(spouseValues);
        Promise.all([
            Db.insertMultipleVisitorsNoEnd(attendanceGroupTable, familyData),
            Db.insertNoEnd(visitorTable, visitorTableColumns, visitorValues),
            Db.insertNoEnd("Visitor_Spouse", spouseTableColumns, spouseTableValues),
            Db.addMultipleValuesNoEnd(interestTable, interestColumns, attendantData.primary.id, interests),
            Email.sendMail(),
        ])
            .then((data) => {
            res.send({
                message: "Success",
                data: data,
            });
        })
            .catch((err) => {
            res.send({
                message: "Failure",
                error: err !== "undefined" ? Db.getSqlError(err) : err.response,
            });
            console.log("OH NOOOOO 3", err);
        });
        //Full Family
    }
    else {
        const familyData = primaryValues.concat(spouseValues).concat(children);
        Promise.all([
            Db.insertMultipleVisitorsNoEnd(attendanceGroupTable, familyData),
            Db.insertNoEnd(visitorTable, visitorTableColumns, visitorValues),
            Db.insertNoEnd("Visitor_Spouse", spouseTableColumns, spouseTableValues),
            Db.addMultipleValuesNoEnd(interestTable, interestColumns, attendantData.primary.id, interests),
            Db.addBulkSelectApplicants("Visitor_Children", childrenTableColumns, childrenTableValues),
            Email.sendMail(),
        ])
            .then((data) => {
            res.send({
                message: "Success",
                data: data,
            });
        })
            .catch((err) => {
            res.send({
                message: "Failure",
                error: err !== "undefined" ? Db.getSqlError(err) : err.response,
            });
            console.log("OH NOOOOO 4", err);
        });
    }
});
