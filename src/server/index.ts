import { Application, Request, Response,NextFunction } from 'express';
import * as express from "express";
import * as dotenv from "dotenv";
import * as cors from "cors"
import routes from "../routes"
import errorHandler from "../middlewares/errors/errorHandler"
dotenv.config()
const server: Application = express();

server.use(cors())
server.use(express.json());

server.use(errorHandler);

server.use((routes))

export default server;
