import { BoardRepository } from "../repository/BoardRepository"
import { Board } from "../entity/Board"

export class BoardService {

    static async findBoard(userId: string, boardId: string) {
        return BoardRepository.findBoard(userId, boardId);
    }

    static async findAllBoard(userId: string) {
        return BoardRepository.findAllBoards(userId);
    }

    static async createBoard(userId: string, board: Board) {
        return BoardRepository.createBoard(userId, board);
    }

    static async updateBoard(userId: string, boardId: string, updatedAttrs: any): Promise<void> {
        return BoardRepository.updateBoard(userId, boardId, updatedAttrs);
    }
}