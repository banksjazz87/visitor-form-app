import express, { Express, Request, Response, Application} from 'express';
import path from "path";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import { DBMethods } from "./dbQueries/databaseMethods";
import { SQLResponse } from "./interfaces/interfaces";
import { MysqlError } from 'mysql';

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
            "error": err
        });
    });

});

