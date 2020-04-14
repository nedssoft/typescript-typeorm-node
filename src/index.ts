import "reflect-metadata";
import {createConnection} from "typeorm";
import * as dotenv from "dotenv";
import server from './server';
import connectionOptions from './database/connectionOptions'
dotenv.config()

const PORT: any = process.env.PORT || 4000;

createConnection(connectionOptions).then(()=> {
    server.listen(PORT,() => { console.log(`Server listening at http://localhost:${PORT}`)});
});