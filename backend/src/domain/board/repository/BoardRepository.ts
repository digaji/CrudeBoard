import { Board } from "../entity/Board"
import { db } from "../../../adapter/database/firestore"
export class BoardRepository {

    static async findAllBoards(userId: string): Promise<Board[]> {
        const boardSnapshot = await db.collection(`users/${userId}/boards`).get();
        let res: Board[] = new Array();

        boardSnapshot.forEach(doc => {
            const data = doc.data()
            const board = new Board()
            board.color = data["color"]
            board.content = data["content"]
            board.priority = data["priority"]
            res.push(board);
        });
        console.log(res);
        return res;
    }

    static async findBoard(userId: string, boardId: string): Promise<Board> {
        const data = (await db.doc(`users/${userId}/boards/${boardId}`).get()).data();
        const board = new Board();
        // @ts-ignore
        board.color = data.color;
        // @ts-ignore
        board.content = data.content;
        // @ts-ignore
        board.priority = data.priority;
        return board;
    }

    static async createBoard(userId: string, board: Board): Promise<string> {
        const {...ob} = board;
        return (await db.collection(`users/${userId}/boards`).add(ob)).id;
    }

    static async updateBoard(userId: string, boardId: string, updatedAttrs: any) : Promise<void> {
        // This data can be any javascript object
        const {...ob} = new Board();
        let newBoard: any = {};
        for (let k in ob) {
            if (updatedAttrs[k]) {
                newBoard[k] = updatedAttrs[k];
            }
        }
        const res = await db.doc(`users/${userId}/boards/${boardId}`).update(newBoard);
    }

    // TODO
    static async removeBoard(userId: string, boardId: string): Promise<void> {

    }
}