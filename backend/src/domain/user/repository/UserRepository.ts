import { db } from "../../../adapter/database/firestore";
import { User } from "../entity/User";

export class UserRepository {

    static docToUser(doc: FirebaseFirestore.DocumentData): User {
        const data = doc.data();
        const user = new User();
        user.id = doc.id;
        user.email = data.email;
        user.password = data.password;
        user.authorization = data.authorization;
        user.organization = data.organization;
        return user;
    }

    static async createUser(user: User) {
        const { ...ob } = user;
        if (user.id) {
            await db.doc(`users/${user.id}`).set(ob);
            return user.id;
        } else {
            const res = await db.collection(`users/`).add(ob);
            return res.id;
        }
    }

    static async findAllUser() {
        const userSnapshot = await db.collection(`users/`).get();
        let res: User[] = [];
        userSnapshot.forEach(doc => {
            res.push(this.docToUser(doc));
        });
        return res;
    }

    static async findAllUserByOrganization(organization: string) {
        const userSnapshot = await db.collection(`users/`).where("organization", "==", organization).get();
        let res: User[] = [];
        userSnapshot.forEach(doc => {
            res.push(this.docToUser(doc));
        });
        return res;
    }

    static async findEmployeeByOrganization(organization: string) {
        const userSnapshot = await db.collection(`users/`)
            .where("organization", "==", organization)
            .where("authorization", "==", "employee").get();
        let res: User[] = [];
        userSnapshot.forEach(doc => res.push(this.docToUser(doc)));
        return res;
    }

    static async findUser(userId: string) {
        const doc = await db.doc(`users/${userId}`).get();
        if (doc.exists) {
            return this.docToUser(doc);
        } else {
            return undefined;
        }
    }

    static async findUserByEmail(email: string) {
        const userSnapshot = await db.collection(`users/`)
            .where("email", "==", email).get();
        let res: User[] = [];
        userSnapshot.forEach(doc => res.push(this.docToUser(doc)));
        return res;
    }

    static async removeUser(userId: string) {
        await db.doc(`users/${userId}`).delete();
    }
}