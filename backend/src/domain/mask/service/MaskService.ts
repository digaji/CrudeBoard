import { User } from "../../user/entity/User";
import { UserRepository } from "../../user/repository/UserRepository";
import { UserMask } from "../domain/UserMask";
import { Mask } from "../entity/Mask";
import { MaskRepository } from "../repository/MaskRepository";

export class MaskService {

    static async findAllMask(userId: string) {
        return MaskRepository.findAllMask(userId);
    }

    static async findMaskByDateRange(userId: string, eStart: number, eEnd: number) {
        return MaskRepository.findMaskByDateRange(userId, eStart, eEnd);

    }

    static async findMaskToday(userId: string) {
        const today = new Date();
        const startToday = new Date(today.toLocaleDateString());
        const endToday = new Date(startToday.valueOf() + (23 * 3600 + 59 * 60) * 1000);
        return this.findMaskByDateRange(userId, startToday.valueOf(), endToday.valueOf());
    }

    static async createMask(userId: string, mask: Mask) {
        return MaskRepository.createMask(userId, mask);
    }

    static async createMaskToday(userId: string, mask: Mask) {
        mask.time = Date.now();
        return MaskRepository.createMask(userId, mask);
    }

    static async findAllMaskByOrganization(organization: string) {

        const users: User[] = await UserRepository.findEmployeeByOrganization(organization);
        let res: UserMask[] = [];

        // Awaiting until all promises are completed
        await Promise.all(users.map(async user => {
            const mask: Mask[] = await this.findMaskToday(user.id!);
            const userMask = new UserMask();
            userMask.email = user.email;
            if (mask.length > 0) {
                userMask.percentage = ((mask.filter(mask => mask.isMasked === true).length) / mask.length) * 100;
                userMask.percentage = Number(userMask.percentage.toFixed(2));
                const rate = 5000; // rate of whether the mask is on
                if (mask[0].time! >= Date.now() - rate) {
                    userMask.liveMask = mask[0].isMasked;
                } else {
                    userMask.liveMask = null;
                }
            } else {
                userMask.percentage = 100;
                userMask.liveMask = null;
            }
            res.push(userMask);
        }));
        return res;
    }
}