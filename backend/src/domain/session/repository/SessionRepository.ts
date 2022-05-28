import { Session } from "../entity/Session";
import { db } from "../../../adapter/database/firestore";

export class SessionRepository {

    static async findSession(sessionId: string) {
        const sessionSnapshot = await db.doc(`sessions/${sessionId}`).get();
        const sessionData = sessionSnapshot.data();

        const session = new Session();
        // @ts-ignore
        session.userId = sessionData.userId;
        // @ts-ignore
        session.active = sessionData.active;
        return session;
    }

    static async createSession(session: Session) {
        // return the session id
        const {...sessionData} = session;
        return (await db.collection(`sessions`).add(sessionData)).id;
    }

    static async deactivateSession(sessionId: string) {
        await db.doc(`sessions/${sessionId}`).update("active", false);
    }

    static async activateSession(sessionId: string) {
        await db.doc(`sessions/${sessionId}`).update("active", true);
    }

    static async removeSession(sessionId: string) {
        await db.doc(`sessions/${sessionId}`).delete();
    }
}