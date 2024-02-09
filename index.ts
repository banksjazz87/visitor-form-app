import express, { Express, Request, Response, Application} from 'express';
import path from "path";
import dotenv from 'dotenv';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 4900;

app.listen(port, ()=> {
    console.log(`App is listening on port ${port}`);
});

app.use(express.static(path.join(__dirname, "../client/build")));

app.get('/', (req: Request, res: Response): void => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

