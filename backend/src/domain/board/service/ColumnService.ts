import { Column } from "../entity/Column";
import { ColumnRepository } from "../repository/ColumRepository";

export class ColumnService {
    static async createColumn(userId: string, boardId: string, column: Column) {

        return ColumnRepository.createColumn(userId, boardId, column);
    }

    static async findAllColumn(userId: string, boardId: string) {
        
        return ColumnRepository.findAllColumn(userId, boardId);
    }

    static async findColumn(userId: string, boardId: string, columnId: string) {

        return ColumnRepository.findColumn(userId, boardId, columnId);
    }

    static async removeColumn(userId: string, boardId: string, columnId: string) {
        return ColumnRepository.removeColumn(userId, boardId, columnId);
    }

    static async addTask(userId: string, boardId: string, columnId: string, taskId: string) {
        ColumnRepository.addTask(userId, boardId, columnId, taskId);
    }

    static async removeTask(userId: string, boardId: string, columnId: string, taskId: string) {
        ColumnRepository.removeTask(userId, boardId, columnId, taskId);
    }

    static async moveTask(userId: string, boardId: string, columnFromId: string, columnToId: string, taskId: string) {
        ColumnRepository.moveTask(userId, boardId, columnFromId, columnToId, taskId);
    }
}