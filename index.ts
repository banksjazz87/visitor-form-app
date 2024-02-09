import express, { Express, Request, Response, Application} from 'express';
import path from "path";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from 'dotenv';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 4900;

//All middleware functions
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
app.use(express.json());

app.listen(port, ()=> {
    console.log(`App is listening on port ${port}`);
});

app.use(express.static(path.join(__dirname, "../client/build")));

app.get('/', (req: Request, res: Response): void => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

