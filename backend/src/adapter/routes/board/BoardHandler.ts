import {Router, Request, Response, NextFunction} from "express"
import { BoardService } from "../../../domain/board/service/BoardService"
import { Board } from "../../../domain/board/entity/Board"

export class BoardHandler {

    static async findAllBoard(req: Request, res: Response, next: NextFunction) {
        // @ts-ignore
        const { userId } = req.params
        // @ts-ignore
        return res.status(200).json(await BoardService.findAllBoard(userId)).send();
    }

    static async findBoard(req: Request, res: Response, next: NextFunction) {
        // @ts-ignore
        const { userId, boardId } = req.params;
        // @ts-ignore
        return res.status(200).json(await BoardService.findBoard(userId, boardId))
    }

    static async createBoard(req: Request, res: Response, next: NextFunction) {
        const board = new Board();
        // @ts-ignore
        const {color, priority, content} = req.body;
        // @ts-ignore
        const { userId } = req.params;
        board.color = color;
        board.priority = priority;
        board.content = content;
        // @ts-ignore
        return res.status(200).send(await BoardService.createBoard(userId, board));
    }

    static async updateBoard(req: Request, res: Response, next: NextFunction) {
        // @ts-ignore
        const { userId, boardId } = req.params;
        // @ts-ignore
        return res.status(200).json(await BoardService.updateBoard(userId, boardId, req.body));
    }
}

export const board = Router();
board.get("/:userId", BoardHandler.findAllBoard);
board.get("/:userId/:boardId", BoardHandler.findBoard)
board.post("/:userId", BoardHandler.createBoard)
board.put("/:userId/:boardId", BoardHandler.updateBoard)
