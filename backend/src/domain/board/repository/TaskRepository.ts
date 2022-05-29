import { db } from "../../../adapter/database/firestore";
import { Task } from "../entity/Task";

export class TaskRepository {

    static docToTask(doc: FirebaseFirestore.DocumentData) {
        const task = new Task();
        const data = doc.data();
        task.id = doc.id;
        task.content = data.content;
        return task;
    }

    static async createTask(userId: string, boardId: string, task: Task) {
        const {...ob} = task;
        const res = await db.collection(`users/${userId}/boards/${boardId}/tasks`).add(ob);
        return res.id;
    }

    static async findAllTask(userId: string, boardId: string) {
        const taskSnapshot = await db.collection(`users/${userId}/boards/${boardId}/tasks`).get();
        let res: Task[] = [];
        taskSnapshot.forEach(doc => res.push(this.docToTask(doc)));
        return res;
    }

    static async removeTask(userId: string, boardId: string, taskId: string) {
        await db.doc(`users/${userId}/boards/${boardId}/tasks/${taskId}`).delete();
    }
}