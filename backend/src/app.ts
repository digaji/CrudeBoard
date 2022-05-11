// app.ts
import express, {Request, Response, NextFunction} from "express";
import { AuthRouter } from "./adapter/routes/auth/AuthHandler";
import dotenv from "dotenv";
import { board } from "./adapter/routes/board/BoardHandler";
import { playground } from "./adapter/routes/playground/PlaygroundHandler"
import { FirebaseAuthRouter } from "./adapter/routes/firebaseAuth/FirebaseAuthHandler";
import cookieParser from "cookie-parser";

export const app = express();
dotenv.config();


// Configuration
app.use(express.json());
app.use(cookieParser());

const BASE_PATH: string = "/api/v1"

app.use(`${BASE_PATH}/auth`, AuthRouter);
app.use(`${BASE_PATH}/board`, board);
app.use(`${BASE_PATH}/firebaseAuth`, FirebaseAuthRouter)

// STRICTLY FOR DEVELOPMENT ONLY
app.use(`${BASE_PATH}/playground`, playground);

// listen on port
const PORT = 3000;
app.listen(PORT, () => console.log(`Application listening at http://localhost:${PORT}`));