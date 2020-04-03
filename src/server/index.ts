import { Application, Request, Response,NextFunction } from 'express';
import * as express from "express";
import * as dotenv from "dotenv";
import * as cors from "cors"
// import routes from "./routes"
dotenv.config()
const server: Application = express();

server.use(cors())
server.use(express.json());
server.get('/', (req: Request, res: Response): object => {
   return res.status(200).json({ message: 'Welcome', status:'success', data: []});
});

server.use((err: Error, req: Request, res: Response, next: NextFunction): any => {
    if (err) {
        return res.status(500).json({status: 'error', message: err.message, errors: []})
    }
    next()
});

// server.use((routes))

export default server;
