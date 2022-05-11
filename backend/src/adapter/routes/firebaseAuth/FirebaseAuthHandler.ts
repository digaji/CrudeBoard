import { NextFunction, Request, Response, Router } from "express";
import { auth } from "../../database/firestore";
import { signInWithEmailAndPassword } from "firebase/auth"
import { UserRecord } from "firebase-admin/auth";

export class FirebaseAuthHandler {

    static async register(req: Request, res: Response, next: NextFunction) {
        const {
            email,
            emailVerified,
            phoneNumber,
            password,
            displayName,
            photoURL,
            disabled
            // @ts-ignore
        } = req.body;
        try {
            const userRecord = await auth.createUser({
                email: email,
                emailVerified: emailVerified,
                phoneNumber: phoneNumber,
                password: password,
                displayName: displayName,
                photoURL: photoURL,
                disabled: disabled,
            });
            return res.status(200).send(userRecord.uid);
        } catch (e) {
            // @ts-ignore
            return res.status(400).send(e);
        }
    }

    static async login(req: Request, res: Response, next: NextFunction)  {

        return res.status(200).send("OK");
    }

    static async findAllUsers(req: Request, res: Response, next: NextFunction) {
        const allUsersResponse = await auth.listUsers(1000, undefined);
        return res.status(200).json(allUsersResponse.users)
    }



    static async findUserByEmail(req: Request, res: Response, next: NextFunction): Promise<string> {
        // @ts-ignore
        const {email} = req.body;
        const userRecord = await auth.getUserByEmail(email);
        // @ts-ignore
        return res.status(200).json(userRecord);
    }

}

export const FirebaseAuthRouter = Router();
FirebaseAuthRouter.post("/register", FirebaseAuthHandler.register);
FirebaseAuthRouter.get("/findByEmail", FirebaseAuthHandler.findUserByEmail);
FirebaseAuthRouter.get("/", FirebaseAuthHandler.findAllUsers);