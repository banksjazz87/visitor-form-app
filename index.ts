import express, { Express, Request, Response, Application } from "express";
import path from "path";
import cors from "cors";
import bodyParser from "body-parser";
// import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { DBMethods } from "./dbQueries/databaseMethods";
import { SQLResponse, ProcessEnv, VisitorDataPoints } from "./interfaces/interfaces";
import { ChildData, Name, AttendantData } from "./my-app/src/interfaces";
import { MysqlError } from "mysql";
import { Mailer } from "./modules/Mailer";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 4900;

//All middleware functions
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());

app.listen(port, () => {
	const Db = new DBMethods(process.env.MYSQL_HOST, process.env.MYSQL_USER, process.env.MYSQL_DATABASE, process.env.MYSQL_PASSWORD);

	Db.connect();

	console.log(`CRpp is listening on port ${port}`);
});

app.use(express.static(path.join(__dirname, "../../my-app/build")));

app.get("/", (req: Request, res: Response): void => {
	res.sendFile(path.join(__dirname, "../../my-app/build/index.html"));
});

//Success message that will be sent back and logged
const sendSuccess = (data: string[], res: Response): void => {
	res.send({
		message: "Success",
		data: data,
	});
	console.log(data);
};

//Failure message that will be sent back and logged
const sendFailure = (err: SQLResponse, res: Response, method: Function): void => {
	res.send({
		message: "Failure",
		error: method(err),
	});
	console.log("Failure", err);
};

app.get("/all-states", (req: Request, res: Response): void => {
	const Db = new DBMethods(process.env.MYSQL_HOST, process.env.MYSQL_USER, process.env.MYSQL_DATABASE, process.env.MYSQL_PASSWORD);

	Db.getTable("States", "ASC", "state_name")
		.then((data: string[]): void => sendSuccess(data, res))
		.catch((err: SQLResponse): void => sendFailure(err, res, Db.getSqlError));
});

app.get("/all-interests", (req: Request, res: Response): void => {
	const Db = new DBMethods(process.env.MYSQL_HOST, process.env.MYSQL_USER, process.env.MYSQL_DATABASE, process.env.MYSQL_PASSWORD);

	Db.getTable("Interests", "ASC", "id")
		.then((data: string[]): void => sendSuccess(data, res))
		.catch((err: SQLResponse): void => sendFailure(err, res, Db.getSqlError));
});

app.get("/get-person/:first/:last", (req: Request, res: Response): void => {
	const Db = new DBMethods(process.env.MYSQL_HOST, process.env.MYSQL_USER, process.env.MYSQL_DATABASE, process.env.MYSQL_PASSWORD);
	const firstName = req.params.first;
	const lastName = req.params.last;

	Db.getPerson("Attendants", firstName, lastName)
		.then((data: string[]): void => sendSuccess(data, res))
		.catch((err: SQLResponse): void => sendFailure(err, res, Db.getSqlError));
});

app.post("/get-family", (req: Request, res: Response): void => {
	const Db = new DBMethods(process.env.MYSQL_HOST, process.env.MYSQL_USER, process.env.MYSQL_DATABASE, process.env.MYSQL_PASSWORD);

	const visitorAndSpouseName: Name[] = [
        { firstName: req.body.visitorName.firstName, lastName: req.body.visitorName.lastName }, 
        { firstName: req.body.spouseName.firstName, lastName: req.body.spouseName.lastName}
    ];

	const childNames: Name[] = req.body.children.map((x: ChildData, y: number): Name => {
		let currentName = {
			firstName: x.firstName,
			lastName: x.lastName,
		};
		return currentName;
	});

	let finalArrayOfName: any[] = [];
	let finalArray = finalArrayOfName.concat(visitorAndSpouseName).concat(childNames);

	Db.selectByNames("Attendants", finalArray)
		.then((data: string[]): void => sendSuccess(data, res))
		.catch((err: SQLResponse): void => sendFailure(err, res, Db.getSqlError));
});

app.post("/add-attendant", (req: Request, res: Response): void => {
	const Db = new DBMethods(process.env.MYSQL_HOST, process.env.MYSQL_USER, process.env.MYSQL_DATABASE, process.env.MYSQL_PASSWORD);

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
			.then((data: [string[], string[], string[]]): void => {
				res.send({
					message: "Success",
					data: data,
				});
				console.log("This worked", data);
			})
			.catch((err: SQLResponse | any): void => {
				res.send({
					message: "Failure",
					error: err !== "undefined" ? Db.getSqlError(err) : err.response,
				});
				console.log("ERROR Inserting", err);
			});

		//Single parent family
	} else if (childFirstName.length > 0 && spouseFirstName.length === 0) {
		Promise.all([Db.insertNoEnd("Attendants", attendantColumns, attendantValues), Db.addMultipleNonAdultAttendants("Attendants", attendantColumns, req.body.children), Db.insertUniqueAttendant("Attendants", attendantColumns, spouseValues)])
			.then((data: [string[], string[], string[]]): void => {
				res.send({
					message: "Success",
					data: data,
				});
				console.log("This worked", data);
			})
			.catch((err: SQLResponse | any): void => {
				res.send({
					message: "Failure",
					error: err !== "undefined" ? Db.getSqlError(err) : err.response,
				});
				console.log("ERROR Inserting", err);
			});

		//Family with no children
	} else if (childFirstName.length === 0 && spouseFirstName.length > 0) {
		Db.addMultipleAdultAttendants("Attendants", attendantColumns, [req.body.visitorName, req.body.spouseName])
			.then((data: string[]): void => sendSuccess(data, res))
			.catch((err: SQLResponse): void => sendFailure(err, res, Db.getSqlError));

		//Single individual
	} else {
		Db.insert("Attendants", attendantColumns, attendantValues)
			.then((data: string[]): void => sendSuccess(data, res))
			.catch((err: SQLResponse): void => sendFailure(err, res, Db.getSqlError));
	}
});

app.post("/add-multiple-adults", (req: Request, res: Response): void => {
	const Db = new DBMethods(process.env.MYSQL_HOST, process.env.MYSQL_USER, process.env.MYSQL_DATABASE, process.env.MYSQL_PASSWORD);

	const attendantColumns = "firstName, lastName, memberType, age";
	const attendantNames = [req.body.visitorName, req.body.spouseName];

	Db.addMultipleAdultAttendants("Attendants", attendantColumns, attendantNames)
		.then((data: string[]): void => sendSuccess(data, res))
		.catch((err: SQLResponse): void => sendFailure(err, res, Db.getSqlError));
});

app.post("/add-visitor-to-all", (req: Request, res: Response): void => {
	const Db = new DBMethods(process.env.MYSQL_HOST, process.env.MYSQL_USER, process.env.MYSQL_DATABASE, process.env.MYSQL_PASSWORD);

	const attendantData = req.body.attendantData;
	const attendanceGroupTable = process.env.GENERAL_ATTENDANCE as string;
	const groupTableColumns = "id, firstName, lastName, age, memberType";
	
    
    //Get Primary Data and spouse data values
    const primaryValues: AttendantData[] = [attendantData.primary];
    const spouseValues: AttendantData[] = [attendantData.spouse];
   
    //Get Children Data
    const children: AttendantData[] = attendantData.children;
	const familyData: AttendantData[] = primaryValues.concat(spouseValues).concat(children);
	

	const visitorTable = process.env.VISITOR_TABLE as string;
	const visitorData = req.body.visitorData;
	const visitorColumnValues: VisitorDataPoints = {
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

	const interestTable = process.env.INTERESTS_TABLE as string;
	const interestColumns = "visitor_attendant_id, interest";
	const interests = visitorData.interests;

	const spouseTableColumns = 'visitorSpouseId, id, firstName, lastName';
	const spouseTableValues = [primaryValues[0].id, spouseValues[0].id, spouseValues[0].firstName, spouseValues[0].lastName];

	const childrenTableColumns = 'parentId, id, firstName, lastName';
	const childrenTableValues: Object[] = children.map((x: AttendantData, y: number): Object => {
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
	const Email = new Mailer(process.env.EMAIL_USER, process.env.EMAIL_PASSWORD, emailList, visitorData, interestsString);

	Promise.all([
		Db.insertMultipleVisitorsNoEnd(attendanceGroupTable, familyData),
		Db.insertNoEnd(visitorTable, visitorTableColumns, visitorValues),
		Db.insertNoEnd('Visitor_Spouse', spouseTableColumns, spouseTableValues),
		Db.addMultipleValuesNoEnd(interestTable, interestColumns, attendantData.primary.id, interests),
		Db.addBulkSelectApplicants('Visitor_Children', childrenTableColumns, childrenTableValues),
		Email.sendMail(),
	])
		.then((data: [string[], string[], string[], string[], string[], void]): void => {
			res.send({
				message: "Success",
				data: data,
			});
		})
		.catch((err: SQLResponse | any): void => {
			res.send({
				message: "Failure",
				error: err !== "undefined" ? Db.getSqlError(err) : err.response,
			});

			console.log("OH NOOOOO", err);
		});
});
