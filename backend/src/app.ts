// app.ts
import express, {Request, Response, NextFunction} from "express";
import { User } from "./entity/User";
import {db, usersRef } from "./database/firestore";
import { auth } from "./routes/auth";
import dotenv from "dotenv";

const app = express();
dotenv.config();


// Configuration
app.use(express.json());

app.use("/api/auth", auth);

// testing routes
app.get('/alive', async (req: Request, res: Response, next: NextFunction) => {
    res.send("Hello world");
});

app.get("/users", async (req: Request, res: Response, next: NextFunction) => {
    const snapshot = await usersRef.get();
    let allUsers: User[] = [];
    snapshot.forEach((doc) => {
        // @ts-ignore
        allUsers.push(doc.data());
    });
    res.json(allUsers);
});

app.post("/", async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send(req.body);
});

app.post("/test1", async (req: Request, res: Response, next: NextFunction) => {
    const currentUsername = "MrBob";
    const snapshot = await usersRef.where("username", "==", currentUsername).get();
    const [userDoc] = snapshot.docs;
    const [userId, userData] = [userDoc.id, userDoc.data()];
    // await usersRef.doc(userId).collection("boards").add({
    //     "color": "red",
    //     "priority": "low"
    // });
    const newBoard = await Board.createBoard(userId, new Board({
        color: "orange",
        priority: "ultra high"
    }));
    console.log(newBoard)
    return res.status(200).send();
});

class Board {
    color: string = null;
    priority: string = null;
    content: string = null;

    constructor(data?: object) {
        if (data) {
            this.color = data.color;
            this.priority = data.priority;
            this.content = data.content;
        }
    }

    static async getAllBoards(userId: string) : Board[] {
        const boardSnapshot = await db.collection(`users/${userId}/boards`).get();
        let res: Board[] = new Array();
        boardSnapshot.forEach(doc => {
            const board = new Board(doc.data());
            res.push(board);
        });
        return res;
    }

    static async findBoard(userId: string, boardId: string): Board[] {
        const boardDoc = db.doc(`users/${userId}/boards/${boardId}`).get();
        return boardDoc.data();
    }

    static async createBoard(userId: string, board: Board): Board {
        const {...ob} = board; // destructuring the class into an object
        const docRef = await db.collection(`users/${userId}/boards`).add(ob);
        return docRef.id;
    }

    static async updateBoard(userId: string, boardId: string, data: object): void {
        const {...ob} = new Board();
        const attr = Object.keys(ob);
        let newValue = {};
        for (let k in ob) {
            if (data[k]) {
                newValue[k] = data[k];
            }
        }
        const res = await db.doc(`users/${userId}/boards/${boardId}`).update(newValue);
    }

    toString() : string {
        return `Board(color=${this.color}, priority=${this.priority})`;
    }



    
}

app.get("/test2", async (req: Request, res: Response, next: NextFunction) => {
    const currentUsername = "MrBob";
    const snapshot = await usersRef.where("username", "==", currentUsername).get();
    const [ userDoc ] = snapshot.docs; // gets the first user
    // const userId = userDoc.id;
    // const userData = userDoc.data();
    const [userId, userData] = [userDoc.id, userDoc.data()];
    // const allBoards = await db.collection(`users/${userId}/boards`).get();
    // allBoards.forEach(doc => {
    //     const board: Board = new Board(doc.data());
    //     console.log(`${doc.id} | ${board}`);
    // });
    console.log(await Board.getAllBoards(userId));
    // const aBoard = await db.doc(`users/${userId}/boards/GQcyRXqZj4ARpnYX0Jek`).get();
    // console.log(aBoard.data());
    return res.status(200).send("OK");
});

class UserClass {
    id: string = null;
    username: string = null;
    password: string = null; // hashed password
    constructor(id: string, data?: object) {
        if (id)
            this.id = id;
        if (data) {
            this.username = data.username;
            this.password = data.password;
        }
    }

    static async findByUsername(username: string): UserClass {
        // if user is not found returns null
        const snapshot = await db.collection("users").where("username", "==", username).get();
        if (snapshot.empty) return null;
        const [userDoc] = snapshot.docs; // get the first matching user
        const [userId, userData] = [userDoc.id, userDoc.data()];
        console.log(userData);
        return new UserClass(userId, userData);
    }

}

app.get("/test3", async (req: Request, res: Response, next: NextFunction) => {
    console.log(await UserClass.findByUsername("MrBob"));
    res.status(200).send();
});

app.get("/test4", async (req: Request, res: Response, next: NextFunction) => {
    
    const {id: userId} = await UserClass.findByUsername("MrBob");
    const boardId = "y2H5cwiVeLLhkSxt1wBB";
    // You can 'easily' (you probably need to change some other parts of your code) add new fields
    await Board.updateBoard(userId, boardId, {color: "purple", content: "Hello World"});
    res.status(200).send();
});


// listen on port
const PORT = 3000;
app.listen(PORT, () => console.log(`Application listening at http://localhost:${PORT}`));