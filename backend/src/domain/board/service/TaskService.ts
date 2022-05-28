import { Task } from "../entity/Task";
import { TaskRepository } from "../repository/TaskRepository";


export class TaskService {

    static async findAllTask(userId: string, boardId: string) {
        return TaskRepository.findAllTask(userId, boardId);
    }

    static async createTask(userId: string, boardId: string, task: Task) {
        return TaskRepository.createTask(userId, boardId, task);
    }

    static async removeTask(userId: string, boardId: string, taskId: string) {
        TaskRepository.removeTask(userId, boardId, taskId);
    }
}