import { db } from "../../../adapter/database/firestore";
import { Mask } from "../entity/Mask";

export class MaskRepository {

    static docToMask(doc: FirebaseFirestore.DocumentData): Mask {
        const mask = new Mask();
        const data = doc.data();
        mask.isMasked = data.isMasked;
        mask.time = data.time;
        return mask;
    }

    static async findAllMask(userId: string) {
        const maskSnapshot = await db.collection(`users/${userId}/mask`).get();
        let res: Mask[] = [];
        maskSnapshot.forEach(doc => res.push(this.docToMask(doc)));
        return res;
    }

    static async findMaskByDateRange(userId: string, eStart: number, eEnd: number) {
        // queries the mask data points given a particular user and a particular time range
        // eStart is the start of the time range in epoch unix time

        const maskSnapshot = await db.collection(`users/${userId}/mask`)
                                .where("time", ">=", eStart)
                                .where("time", "<=", eEnd)
                                .orderBy("time", "desc").get();
        let res: Mask[] = [];
        maskSnapshot.forEach(doc => res.push(this.docToMask(doc)));
        return res;
    }

    static async createMask(userId: string, mask: Mask) {
        const {...ob} = mask;
        await db.doc(`users/${userId}/mask/${mask.time}`).set(ob);
        return mask.time;
    }

}