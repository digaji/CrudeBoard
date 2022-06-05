import { NextFunction, Request, Response, Router } from "express";
import { Column } from "../../../domain/board/entity/Column";
import { BoardService } from "../../../domain/board/service/BoardService";
import { ColumnService } from "../../../domain/board/service/ColumnService";

export class ColumnHandler {

    static async createColumn(req: Request, res: Response, next: NextFunction) {
        // @ts-ignore
        const {userId} = req.userId;
        const boards = await BoardService.findAllBoard(userId);
        if (boards.length > 0) {
            const boardId = boards[0].id;
            const columnId = await ColumnService.createColumn(userId, boardId!, new Column());
            return res.status(200).send(columnId);
        } else {
            return res.status(500).send("No board has been created for this user");
        }
    }

    static async findAllColumn(req: Request, res: Response, next: NextFunction) {
        // @ts-ignore
        const {userId} = req.userId;
        const boards = await BoardService.findAllBoard(userId);
        if (boards.length > 0) {
            const boardId = boards[0].id;
            const columns = await ColumnService.findAllColumn(userId, boardId!);
            let data: any = {};
            columns.forEach((val, id) => {
                data[val.id!] = val;
            });
            return res.status(200).json(data);
        } else {
            return res.status(500).send("No board has been created for this user");
        }
    }

    static async findColumn(req: Request, res: Response, next: NextFunction) {
        // @ts-ignore
        const {userId} = req.userId;
        const boards = await BoardService.findAllBoard(userId);
        const {columnId} = req.params;
        if (boards.length > 0) {
            const boardId = boards[0].id;
            const column = await ColumnService.findColumn(userId, boardId!, columnId)
            return res.status(200).json(column).send();
        } else {
            return res.status(500).send("No board has been created for this user");
        }
    }

    static async removeColumn(req: Request, res: Response, next: NextFunction) {
        // @ts-ignore
        const {userId} = req.userId;
        const boards = await BoardService.findAllBoard(userId);
        const {columnId} = req.params;
        if (boards.length > 0) {
            const boardId = boards[0].id;
            await ColumnService.removeColumn(userId, boardId!, columnId)
            return res.status(200).send("Column successfully removed");
        } else {
            return res.status(500).send("No board has been created for this user");
        }
    }

    static async addTask(req: Request, res: Response, next: NextFunction) {
        // @ts-ignore
        const {userId} = req.userId;
        const boards = await BoardService.findAllBoard(userId);
        const {columnId, taskId} = req.params;
        if (boards.length > 0) {
            const boardId = boards[0].id;
            await ColumnService.addTask(userId, boardId!, columnId, taskId)
            return res.status(200).send(`Task ${taskId} has been successfully added to column ${columnId}`);
        } else {
            return res.status(500).send("No board has been created for this user");
        }
    }

    static async removeTask(req: Request, res: Response, next: NextFunction) {
        // @ts-ignore
        const {userId} = req.userId;
        const boards = await BoardService.findAllBoard(userId);
        const {columnId, taskId} = req.params;
        if (boards.length > 0) {
            const boardId = boards[0].id;
            await ColumnService.removeTask(userId, boardId!, columnId, taskId)
            return res.status(200).send(`Task ${taskId} has been successfully removed from column ${columnId}`);
        } else {
            return res.status(500).send("No board has been created for this user");
        }
    }

    static async moveTask(req: Request, res: Response, next: NextFunction) {
        // @ts-ignore
        const {userId} = req.userId;
        const boards = await BoardService.findAllBoard(userId);
        const {columnFromId, columnToId, taskId} = req.params;
        if (boards.length > 0) {
            const boardId = boards[0].id;
            await ColumnService.moveTask(userId, boardId!, columnFromId, columnToId, taskId)
            return res.status(200).send(`Task ${taskId} has been successfully moved from column ${columnFromId} to column ${columnToId}`);
        } else {
            return res.status(500).send("No board has been created for this user");
        }
    }

    static async setTaskIds(req: Request, res: Response, next: NextFunction) {
        // @ts-ignore
        const {userId} = req.userId;
        const boards = await BoardService.findAllBoard(userId);
        const {columnId} = req.params;
        const taskIds = req.body;
        if (boards.length > 0) {
            const boardId = boards[0].id;
            try {
                await ColumnService.setTaskIds(userId, boardId!, columnId, taskIds);
                return res.status(200).send(`Column ${columnId} has been successfully updated`);
            } catch (err) {
                console.log(err);
            } 
        } else {
            res.status(500).send("No board has been created for this user");
        }
    }
}

export const column = Router();
column.get("/", ColumnHandler.findAllColumn);
column.get("/:columnId", ColumnHandler.findColumn);
column.post("/", ColumnHandler.createColumn);
column.delete("/:columnId", ColumnHandler.removeColumn);

column.post("/:columnId/task", ColumnHandler.setTaskIds);
column.post("/:columnId/task/:taskId", ColumnHandler.addTask);
column.delete("/:columnId/task/:taskId", ColumnHandler.removeTask);
column.put("/:columnFromId/:columnToId/task/:taskId", ColumnHandler.moveTask);