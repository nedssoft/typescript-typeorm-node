import * as dotenv from "dotenv";
import server from './server';
dotenv.config()

const PORT: any = process.env.HTTP_PORT || 4000;

server.listen(PORT,() => { console.log(`Server listening at http://localhost:${PORT}`)});