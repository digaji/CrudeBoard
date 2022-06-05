import { NextFunction, Request, Response, Router } from "express";
import { Board } from "../../../domain/board/entity/Board";
import { Task } from "../../../domain/board/entity/Task";
import { BoardService } from "../../../domain/board/service/BoardService";
import { TaskService } from "../../../domain/board/service/TaskService";

export class TaskHandler {
    static async findAllTask(req: Request, res: Response, next: NextFunction) {

        // Mungkin perlu diganti
        // @ts-ignore
        const {userId} = req.userId;
        const boards = await BoardService.findAllBoard(userId!);
        if (boards.length > 0) {
            // select the first board
            const boardId = boards[0].id;
            const tasks = await TaskService.findAllTask(userId!, boardId!);
            let data : any = {};
            tasks.forEach((val, idx) => {
                data[val.id!] = val;
            });
            return res.status(200).json(data);
        } else {
            return res.status(500).send("No board has been created for this user");
        }
    }

    static async createTask(req: Request, res: Response, next: NextFunction) {
        // @ts-ignore
        const {userId} = req.userId;
        const boards = await BoardService.findAllBoard(userId!);
        let boardId ;
        if (boards.length > 0) {
            boardId = boards[0].id;
        } else {
            // Create the board for the user
            const board = new Board();
            boardId = await BoardService.createBoard(userId!, board);
        }
        const data = req.body;
        const task = new Task();
        task.content = data["content"];
        const taskId = await TaskService.createTask(userId!, boardId!, task);
        return res.status(200).send(taskId);
    }

    static async removeTask(req: Request, res: Response, next: NextFunction) {
        // @ts-ignore
        const {userId} = req.userId;
        const boards = await BoardService.findAllBoard(userId!);
        if (boards.length > 0) {
            // select the first board
            const boardId = boards[0].id;
            const {taskId} = req.params;
            await TaskService.removeTask(userId!, boardId!, taskId!);
            return res.status(200).send("Delete successful");
        } else {
            return res.status(500).send("No board has been created for this user");
        }
    }
}

export const task = Router();
task.get("/", TaskHandler.findAllTask);
task.post("/", TaskHandler.createTask);
task.delete("/:taskId", TaskHandler.removeTask);