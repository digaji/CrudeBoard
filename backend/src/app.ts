// app.ts
import express, {Request, Response, NextFunction} from "express";
import { auth } from "./routes/auth";
import dotenv from "dotenv";
import { board } from "./routes/board/BoardHandler";
import { playground } from "./routes/playground/PlaygroundHandler"
import { FirebaseAuthRouter } from "./routes/firebaseAuth/FirebaseAuthHandler";

export const app = express();
dotenv.config();


// Configuration
app.use(express.json());

const BASE_PATH: string = "/api/v1"

app.use(`${BASE_PATH}/auth`, auth);
app.use(`${BASE_PATH}/board`, board);
app.use(`${BASE_PATH}/firebaseAuth`, FirebaseAuthRouter)

// STRICTLY FOR DEVELOPMENT ONLY
app.use(`${BASE_PATH}/playground`, playground);

// listen on port
const PORT = 3000;
app.listen(PORT, () => console.log(`Application listening at http://localhost:${PORT}`));