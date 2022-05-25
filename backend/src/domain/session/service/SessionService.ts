import { Session } from "../entity/Session";
import { SessionRepository } from "../repository/SessionRepository";

export class SessionService {

    static async findSession(sessionId: string) {
        return SessionRepository.findSession(sessionId);
    }

    static async createSession(session: Session) {
        return SessionRepository.createSession(session);
    }

    static async deactivateSession(sessionId: string) {
        SessionRepository.deactivateSession(sessionId);
    }

    static async activateSession(sessionId: string) {
        SessionRepository.activateSession(sessionId);
    }

    static async removeSession(sessionId: string) {
        SessionRepository.removeSession(sessionId);
    }
}