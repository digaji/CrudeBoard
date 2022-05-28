import { FieldValue } from "firebase-admin/firestore";
import { db } from "../../../adapter/database/firestore";
import { Column } from "../entity/Column";

export class ColumnRepository {

    static async createColumn(userId: string, boardId: string, column: Column) {
        const {...ob} = column;
        const res = await db.collection(`users/${userId}/boards/${boardId}/columns`).add(ob);
        return res.id;
    }

    static async findAllColumn(userId: string, boardId: string) {
        const columnSnapshot = await db.collection(`users/${userId}/boards/${boardId}/columns`).get();
        let res: Column[] = [];
        columnSnapshot.forEach(doc => {
            const data = doc.data();
            const column = new Column();
            column.id = doc.id;
            column.taskIds = data["taskIds"];
            res.push(column);
        });
        return res;
    }

    static async findColumn(userId: string, boardId: string, columnId: string) {
        const doc = await db.doc(`users/${userId}/boards/${boardId}/columns/${columnId}`).get();
        const data = doc.data();
        const column = new Column();
        column.id = doc.id;
        // @ts-ignore
        column.taskIds = data.taskIds;
        return column;
    }

    static async removeColumn(userId: string, boardId: string, columnId: string) {
        await db.doc(`users/${userId}/boards/${boardId}/columns/${columnId}`).delete();
    }

    static async addTask(userId: string, boardId: string, columnId: string, taskId: string) {
        const res = await db.doc(`users/${userId}/boards/${boardId}/columns/${columnId}`).update({
            taskIds: FieldValue.arrayUnion(taskId)
        });
    }

    static async removeTask(userId: string, boardId: string, columnId: string, taskId: string) {
        const res = await db.doc(`users/${userId}/boards/${boardId}/columns/${columnId}`).update({
            taskIds: FieldValue.arrayRemove(taskId)
        });
    }

    static async moveTask(userId: string, boardId: string, columnFromId: string, columnToId: string, taskId: string) {
        this.addTask(userId, boardId, columnToId, taskId);
        this.removeTask(userId, boardId, columnFromId, taskId);
    }
}