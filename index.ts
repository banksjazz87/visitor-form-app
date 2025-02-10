import express, { Express, Request, Response, Application } from "express";
import path from "path";
import cors from "cors";
import bodyParser from "body-parser";
// import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { DBMethods } from "./dbQueries/databaseMethods";
import { SQLResponse, ProcessEnv, VisitorDataPoints } from "./interfaces/interfaces";
import { ChildData, DBChildData, Name, AttendantData, GrecapthaRes } from "./my-app/src/interfaces";
import { MysqlError } from "mysql";
import { Mailer } from "./modules/Mailer";
import "isomorphic-fetch";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 5000;

//All middleware functions
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());

app.listen(port, () => {
	const Db = new DBMethods(process.env.MYSQL_HOST, process.env.MYSQL_USER, process.env.MYSQL_DATABASE, process.env.MYSQL_PASSWORD);

	Db.connect();

	console.log(`App is listening on port ${port}`);
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

	Db.searchByValue("Interests", "active", "1")
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

	const attendantColumns = "firstName, lastName, memberType, age, birthYear";

	const getAgeGroup = (age: number): string => {
		if (age === null || age === -1) {
			return 'undefined';
		} else if (age > 18) {
			return "adult";
		} else if (age < 12) {
			return "child";
		} else {
			return "teen";
		}
	}

	const getBirthYear = (age: number): number | null => {
		if (age !== -1) {
			const date: Date = new Date();
			const currentYear: number = date.getFullYear();
			const birthYear: number = currentYear - age;
			return birthYear;
		} else {
			return null;
		}
	}

	const attendantValues = [req.body.visitorName.firstName, req.body.visitorName.lastName, "visitor", getAgeGroup(req.body.visitorAge), getBirthYear(req.body.visitorAge)];
	const spouseValues = [req.body.spouseName.firstName, req.body.spouseName.lastName, "visitor", getAgeGroup(req.body.spouseAge), getBirthYear(req.body.spouseAge)];

	const children: ChildData[] = req.body.children;

	const childFirstName: string = req.body.children[0].firstName;
	const spouseFirstName: string = req.body.spouseName.firstName;

	//Get our needed Child data
	const childrenData: DBChildData[] = children.map((x: ChildData, y: number): DBChildData => {
		const updatedChildData: DBChildData = {
			firstName: x.firstName,
			lastName: x.lastName,
			ageGroup: getAgeGroup(x.age),
			birthYear: getBirthYear(x.age),
		};
		return updatedChildData;
	});

	//Full family
	if (childFirstName.length > 0 && spouseFirstName.length > 0) {
		Promise.all([Db.insertNoEnd("Attendants", attendantColumns, attendantValues), Db.addMultipleNonAdultAttendants("Attendants", attendantColumns, childrenData), Db.insertUniqueAttendant("Attendants", attendantColumns, spouseValues)])
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
		Promise.all([Db.insertNoEnd("Attendants", attendantColumns, attendantValues), Db.addMultipleNonAdultAttendants("Attendants", attendantColumns, childrenData), Db.insertUniqueAttendant("Attendants", attendantColumns, spouseValues)])
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
	const emailList = "banksjazz87@gmail.com, whitneylanematthews@yahoo.com, whitneymatthews05@gmail";
	
	const interestsString = interests.join(", ");
	const Email = new Mailer(process.env.EMAIL_USER, process.env.EMAIL_PASSWORD, emailList, visitorData, interestsString);

	//Solo visitor
	if (children[0].firstName.length === 0 && spouseValues[0].firstName.length === 0) {
		const familyData: AttendantData[] = primaryValues;

		Promise.all([
			Db.insertMultipleVisitorsNoEnd(attendanceGroupTable, familyData),
			Db.insertNoEnd(visitorTable, visitorTableColumns, visitorValues),
			Db.addMultipleValuesNoEnd(interestTable, interestColumns, attendantData.primary.id, interests),
			Db.endDb(),
			Email.sendMail(),
		])
			.then((data: [string[], string[], string[], void, void]): void => {
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

				console.log("OH NOOOOO 1", err);
			});
		
	//single parent
	} else if (children[0].firstName.length > 0 && spouseValues[0].firstName.length === 0) {
		const familyData: AttendantData[] = primaryValues.concat(children);

		Promise.all([
			Db.insertMultipleVisitorsNoEnd(attendanceGroupTable, familyData),
			Db.insertNoEnd(visitorTable, visitorTableColumns, visitorValues),
			Db.addMultipleValuesNoEnd(interestTable, interestColumns, attendantData.primary.id, interests),
			Db.addBulkSelectApplicants("Visitor_Children", childrenTableColumns, childrenTableValues),
			Email.sendMail(),
		])
			.then((data: [string[], string[], string[], string[], void]): void => {
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
				console.log("OH NOOOOO 2", err);
			});
		
	//Married no children
	} else if (children[0].firstName.length === 0 && spouseValues[0].firstName.length > 0) {
		const familyData: AttendantData[] = primaryValues.concat(spouseValues);

		Promise.all([
			Db.insertMultipleVisitorsNoEnd(attendanceGroupTable, familyData),
			Db.insertNoEnd(visitorTable, visitorTableColumns, visitorValues),
			Db.insertNoEnd("Visitor_Spouse", spouseTableColumns, spouseTableValues),
			Db.addMultipleValuesNoEnd(interestTable, interestColumns, attendantData.primary.id, interests),
			Db.endDb(),
			Email.sendMail(),
		])
			.then((data: [string[], string[], string[], string[], void, void]): void => {
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
				console.log("OH NOOOOO 3", err);
			});
		
	//Full Family
	} else {
		const familyData: AttendantData[] = primaryValues.concat(spouseValues).concat(children);

		Promise.all([
			Db.insertMultipleVisitorsNoEnd(attendanceGroupTable, familyData),
			Db.insertNoEnd(visitorTable, visitorTableColumns, visitorValues),
			Db.insertNoEnd("Visitor_Spouse", spouseTableColumns, spouseTableValues),
			Db.addMultipleValuesNoEnd(interestTable, interestColumns, attendantData.primary.id, interests),
			Db.addBulkSelectApplicants("Visitor_Children", childrenTableColumns, childrenTableValues),
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
				console.log("OH NOOOOO 4", err);
			});
	}
	
});


app.post('/validate-recaptcha', (req: Request, res: Response): void => {
	const token = req.body.tokenString;
	const reqData = {
		secret: process.env.CAPTCHA_SECRET_KEY as string,
		response: token as string,
	};
	
	const checkCaptcha = async (): Promise<any | GrecapthaRes> => {
		try {
			const res = await fetch(
				'https://www.google.com/recaptcha/api/siteverify?' +
				new URLSearchParams(reqData),
				{
					method: "POST",
				}
			);

			const result = await res.json();
			return result;

		} catch (error: any) {
			return error;
		}
	}

	checkCaptcha()
		.then((data: GrecapthaRes): void => {
			res.send({
				message: "Success",
				data: data,
			});
			console.log(data);
		})
		.catch((error: any): void => {
			res.send({
				message: "Failure",
				error: error,
			});
			console.log("Error", error);
		});
});
	


	

