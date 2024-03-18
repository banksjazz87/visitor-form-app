import express, { Express, Request, Response, Application} from 'express';
import path from "path";
import cors from "cors";
import bodyParser from "body-parser";
// import nodemailer from "nodemailer";
import dotenv from 'dotenv';
import { DBMethods } from "./dbQueries/databaseMethods";
import { SQLResponse, ProcessEnv, VisitorDataPoints } from "./interfaces/interfaces";
import { MysqlError } from 'mysql';
import { Mailer } from "./modules/Mailer";



dotenv.config();

const app: Application = express();
const port = process.env.PORT || 4900;

//All middleware functions
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
app.use(express.json());

app.listen(port, ()=> {
    const Db = new DBMethods(process.env.MYSQL_HOST, process.env.MYSQL_USER, process.env.MYSQL_DATABASE, process.env.MYSQL_PASSWORD);

    Db.connect();

    console.log(`CRpp is listening on port ${port}`);
});

app.use(express.static(path.join(__dirname, "../../my-app/build")));


app.get('/', (req: Request, res: Response): void => {
    res.sendFile(path.join(__dirname, "../../my-app/build/index.html"));
});


app.get('/all-states', (req: Request, res: Response): void => {
    const Db = new DBMethods(process.env.MYSQL_HOST, process.env.MYSQL_USER, process.env.MYSQL_DATABASE, process.env.MYSQL_PASSWORD);

    Db.getTable('States', 'ASC', 'state_name')
        .then((data: string[]): void => {
            res.send({
                "message": "Success", 
                "data": data
            });
        console.log(data);
    })
    .catch((err: SQLResponse): void => {
        console.log('error', Db.getSqlError(err));
        res.send({
            "message": "Failure", 
            "error": Db.getSqlError(err)
        });
    });

});

app.get('/all-interests', (req: Request, res: Response): void => {
    const Db = new DBMethods(process.env.MYSQL_HOST, process.env.MYSQL_USER, process.env.MYSQL_DATABASE, process.env.MYSQL_PASSWORD);

    Db.getTable('Interests', 'ASC', 'id')
        .then((data: string[]): void => {
            res.send({
                "message": "Success", 
                "data": data
            });
            console.log(data);
        })
        .catch((err: SQLResponse): void => {
            res.send({
                "message": "Failure", 
                "error": Db.getSqlError(err)
            });
        });
});


app.get('/get-person/:first/:last', (req: Request, res: Response): void => {
    const Db = new DBMethods(process.env.MYSQL_HOST, process.env.MYSQL_USER, process.env.MYSQL_DATABASE, process.env.MYSQL_PASSWORD);
    const firstName = req.params.first;
    const lastName = req.params.last;

    Db.getPerson('Attendants', firstName, lastName)
        .then((data: string[]): void => {
            res.send({
                "message": "Success", 
                "data": data
            });
        })
        .catch((err: SQLResponse): void => {
            res.send({
                "message": "Failure", 
                "error": Db.getSqlError(err)
            });
        });
});


app.post('/add-attendant', (req: Request, res: Response): void => {
    const Db = new DBMethods(process.env.MYSQL_HOST, process.env.MYSQL_USER, process.env.MYSQL_DATABASE, process.env.MYSQL_PASSWORD);

    const attendantColumns = "firstName, lastName, memberType, age";
    const attendantValues = [req.body.visitorName.firstName, req.body.visitorName.lastName, 'visitor', 'adult'];

    Db.insert('Attendants',attendantColumns, attendantValues )
        .then((data: string[]): void => {
            res.send({
                "message": "Success", 
                "data": data
            })
        })
        .catch((err: SQLResponse): void => {
            res.send({
                "message": "Failure", 
                "error": Db.getSqlError(err)
            })
        });
});


app.post('/add-visitor-to-all', (req: Request, res: Response): void => {
    const Db = new DBMethods(process.env.MYSQL_HOST, process.env.MYSQL_USER, process.env.MYSQL_DATABASE, process.env.MYSQL_PASSWORD);

    const attendantData = req.body.attendantData;
    const attendanceGroupTable = process.env.GENERAL_ATTENDANCE as string;
    const groupTableColumns = "id, firstName, lastName, age, memberType";
    const groupTableValues = [attendantData.id, attendantData.firstName, attendantData.lastName, attendantData.age, attendantData.memberType];
    
    const visitorTable = process.env.VISITOR_TABLE as string;
    const visitorData = req.body.visitorData;
    const visitorColumnValues: VisitorDataPoints = {
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

    const interestTable = process.env.INTERESTS_TABLE as string;
    const interestColumns = "visitor_id, interest";
    const interests = visitorData.interests;

    //Set up the email notification
    // const emailList = ['banksjazz87@gmail.com', 'whitneymatthews05@gmail.com'];
    const emailList = ['banksjazz87@gmail.com'];
    const interestsString = interests.join(', ');
    const Email = new Mailer(process.env.EMAIL_USER, process.env.EMAIL_PASSWORD, emailList, visitorData, interestsString);
   

    Promise.all([Db.insertNoEnd(attendanceGroupTable, groupTableColumns, groupTableValues), Db.insertNoEnd(visitorTable, visitorTableColumns, visitorValues), Db.addMultipleValuesNoEnd(interestTable, interestColumns, attendantData.id, interests), Db.endDb(), Email.sendMail()])
    .then((data: [string[], string[], string[], void, void]): void => {
        res.send({
            "message": "Success", 
            "data": data
        }); 
    })
    .catch((err: SQLResponse | any): void => {
        res.send({
            "message": "Failure",
            "error": err !== 'undefined' ? Db.getSqlError(err) : err.response
        });

        console.log('OH NOOOOO', err);
    });

});



