import { FieldValue } from "firebase-admin/firestore";
import { db } from "../../../adapter/database/firestore";
import { Column } from "../entity/Column";

export class ColumnRepository {

    static docToCol(doc: FirebaseFirestore.DocumentData) {
        const col = new Column();
        const data = doc.data();
        col.id = data.id;
        col.title = data.title;
        col.colour = data.colour;
        col.taskIds = data.taskIds;
        return col;
    }

    static async createColumn(userId: string, boardId: string, column: Column) {
        const {...ob} = column;
        let res;
        if (column.id) {
            res = await db.doc(`users/${userId}/boards/${boardId}/columns/${column.id}`).set(ob);
            return column.id;
       } else {
            res = await db.collection(`users/${userId}/boards/${boardId}/columns`).add(ob);
            return res.id;
       }
    }

    static async findAllColumn(userId: string, boardId: string) {
        const columnSnapshot = await db.collection(`users/${userId}/boards/${boardId}/columns`).get();
        let res: Column[] = [];
        columnSnapshot.forEach(doc => {
            res.push(this.docToCol(doc));
        });
        return res;
    }

    static async findColumn(userId: string, boardId: string, columnId: string) {
        const doc = await db.doc(`users/${userId}/boards/${boardId}/columns/${columnId}`).get();
        // const data = doc.data();
        // const column = new Column();
        // column.id = doc.id;
        // @ts-ignore
        // column.taskIds = data.taskIds;
        return this.docToCol(doc);
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

    static async setTaskIds(userId: string, boardId: string, columnId: string, taskIds: string[]) {
        await db.doc(`users/${userId}/boards/${boardId}/columns/${columnId}`).update({
            taskIds: taskIds
        });
    }
}