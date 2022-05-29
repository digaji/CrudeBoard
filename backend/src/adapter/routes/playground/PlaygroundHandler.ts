import {Router, Request, Response, NextFunction } from "express"

// 
import { usersRef } from "../../database/firestore";
import { User } from "../../../domain/user/entity/User";
import { NodefluxClient } from "../../nodeflux/NodefluxClient";

export const playground = Router();


playground.get('/alive', async (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    res.send("Hello world");
});

playground.get("/all-users", async (req: Request, res: Response, next: NextFunction) => {
    const snapshot = await usersRef.get();
    let allUsers: User[] = [];
    snapshot.forEach((doc) => {
        // @ts-ignore
        allUsers.push(doc.data());
    });
    // @ts-ignore
    res.status(200).json(allUsers);
});

playground.post("/self-body", async (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    res.status(200).send(req.body);
});

// const nfClient = new NodefluxClient();

// playground.get("/test-nf-get-token", async (req: Request, res: Response, next: NextFunction) => {
//     const data = await nfClient.requestHeaderResources();
//     const header = await nfClient.buildHeaderFromResources(data);
//     res.status(200).json(header).send();
// })