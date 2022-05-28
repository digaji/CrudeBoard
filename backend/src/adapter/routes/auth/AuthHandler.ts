import express, { Router, Request, Response, NextFunction } from "express";
import { usersRef } from "../../database/firestore";
import { registerValidation, loginValidation } from "../../../validation";
import bcrypt from "bcryptjs";
import { auth } from "../../database/firestore";
import jwt from "jsonwebtoken";
import { SessionService } from "../../../domain/session/service/SessionService";
import { Session } from "../../../domain/session/entity/Session";
import { equal } from "joi";
import { ColumnService } from "../../../domain/board/service/ColumnService";
import { BoardService } from "../../../domain/board/service/BoardService";
import { Board } from "../../../domain/board/entity/Board";
import { Column } from "../../../domain/board/entity/Column";

export class AuthHandler {
    static async register(req: Request, res: Response, next: NextFunction) {
        
        // validating the request body
        const { error } = registerValidation(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        
        // checking if the user exists
        const snapshot = await usersRef.where("username", "==", req.body.username).get();
        if (!snapshot.empty) return res.status(400).send("User already exists");
        
        // Hashing the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // save the user in the database
        const {id} = await usersRef.add({username: req.body.username, password: hashedPassword});

        // 1. Create board for the user
        const boardId = await BoardService.createBoard(id, new Board());
        // 2. Create three columns for the user
        const column = new Column();
        await ColumnService.createColumn(id, boardId, column);
        await ColumnService.createColumn(id, boardId, column);
        await ColumnService.createColumn(id, boardId, column);

        // create and grant a token when the user logs in
        return res.status(200).send({userId: id});
    }

    static async login(req: Request, res: Response, next: NextFunction) {
        // validating the request body
        const { error } = loginValidation(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        // checking if the user exists
        const snapshot = await usersRef.where("username", "==", req.body.username).get();
        if (snapshot.empty) return res.status(400).send("User not found");

        // checking password
        const userDoc = snapshot.docs[0];
        const user = userDoc.data();
        const validPass = await bcrypt.compare(req.body.password, user.password);
        if (!validPass) return res.status(400).send("Invalid password");

        // const token = jwt.sign({_id: user}, process.env.TOKEN_SECRET);
        // firebase generated token
        try {
            const session = new Session();
            session.userId = userDoc.id;
            session.active = true;
            const sessionId: string = await SessionService.createSession(session);
            
            // return the session id
            return res.status(200).send({sessionId: sessionId});
        } catch (e) {
            return res.status(400).send(e);
        }
    }

    static async signout(req: Request, res: Response, next: NextFunction) {
        
        try {
            const {sessionId} = req.cookies;
            console.log(sessionId);
            SessionService.removeSession(JSON.parse(sessionId).sessionId);
            return res.status(200).send("User has signed out");
        } catch (e) {
            return res.status(400).send(e);
        }
    }

    static async requireSessionId(req: Request, res: Response, next: NextFunction) {
        const { sessionId } = req.cookies;
        if (sessionId) {
            // What happends if the session id doesn't exist?
            // @ts-ignore
            req.userId = await SessionService.findSession(sessionId);
            return next();
        } else {
            return res.status(400).send("Session ID must be included in the request header");
        }
    }
}

export const AuthRouter = Router();
AuthRouter.post("/register", AuthHandler.register);
AuthRouter.post("/login", AuthHandler.login);
AuthRouter.post("/signout", AuthHandler.signout);