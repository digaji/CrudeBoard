import { Router, Request, Response, NextFunction } from "express";
import { registerValidation, loginValidation } from "./validation";
import { SessionService } from "../../../domain/session/service/SessionService";
import { Session } from "../../../domain/session/entity/Session";
import { UserService } from "../../../domain/user/service/UserService";
import { User } from "../../../domain/user/entity/User";

export class AuthHandler {
    static async register(req: Request, res: Response, next: NextFunction) {
        
        // validating the request body
        const { error } = registerValidation(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        
        // checking if the user exists
        const {email, password} = req.body;
        const userExists = await UserService.userExistsByEmail(email);
        // const snapshot = await usersRef.where("username", "==", req.body.username).get();
        if (userExists) return res.status(400).send("User already exists");
        
        const employee = new User();
        employee.email = email;
        employee.password = password;
        employee.organization = email.slice(email.search("@") + 1);
        const userId = await UserService.createEmployee(employee);

        // create and grant a token when the user logs in
        return res.status(200).send({userId: userId});
    }

    static async registerAdmin(req: Request, res: Response, next: NextFunction) {
        
        // validating the request body
        const { error } = registerValidation(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        
        // checking if the user exists
        const {email, password} = req.body;
        const userExists = await UserService.userExistsByEmail(email);
        // const snapshot = await usersRef.where("username", "==", req.body.username).get();
        if (userExists) return res.status(400).send("User already exists");
        
        const admin = new User();
        admin.email = email;
        admin.password = password;
        admin.organization = email.slice(email.search("@") + 1);
        const userId = await UserService.createAdmin(admin);

        // create and grant a token when the user logs in
        return res.status(200).send({userId: userId});
    }

    static async login(req: Request, res: Response, next: NextFunction) {
        // validating the request body
        const { error } = loginValidation(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        // checking if the user exists
        const {email, password} = req.body;
        const user = new User();
        user.email = email;
        user.password = password;
        const userExists = await UserService.userExistsByEmail(user.email!);
        if (!userExists) return res.status(400).send("User not found");

        // checking password
        const validPass = await UserService.validateUser(user);
        if (!validPass) return res.status(400).send("Invalid password");

        const users = await UserService.findUserByEmail(user.email!);
        const actualUser = users[0];
        // firebase generated token
        try {
            const session = new Session();
            session.userId = actualUser.id!;
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
            const {sessionid} = req.headers;
            if (sessionid) {
                // @ts-ignore
                SessionService.removeSession(sessionid);
                return res.status(200).send("User has signed out");
            } else {
                console.log(req.cookies);
                return res.status(400).send("sessionId is not found");
            }
        } catch (e) {
            return res.status(400).send(e);
        }
    }

    static async requireSessionId(req: Request, res: Response, next: NextFunction) {
        const { sessionid } = req.headers;
        if (sessionid) {
            // @ts-ignore
            const id = await SessionService.findSession(sessionid);
            if (id) {
                // @ts-ignore
                req.userId = id;
                return next();
            } else {
                return res.status(400).send("Session ID not found");
            }
        } else {
            return res.status(400).send("Session ID must be included in the request header");
        }
    }
}

export const AuthRouter = Router();
AuthRouter.post("/register", AuthHandler.register);
AuthRouter.post("/register-admin", AuthHandler.registerAdmin);
AuthRouter.post("/login", AuthHandler.login);
AuthRouter.post("/signout", AuthHandler.signout);