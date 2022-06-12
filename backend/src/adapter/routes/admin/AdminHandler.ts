import { NextFunction, Request, Response, Router } from "express";
import { UserMask } from "../../../domain/mask/domain/UserMask";
import { MaskService } from "../../../domain/mask/service/MaskService";
import { UserRepository } from "../../../domain/user/repository/UserRepository";

class AdminHandler {
    static async fetchTableData(req: Request, res: Response, next: NextFunction) {
        // validate that the requester is an admin

        // @ts-ignore
        const {userId: adminUserId} = req.userId;

        const admin = await UserRepository.findUser(adminUserId);
        if (admin) {
            if (admin.authorization === "admin") {
                const userMask: UserMask[] = await MaskService.findAllMaskByOrganization(admin?.organization!);
                return res.status(200).json(userMask);
            } else {
                return res.status(400).send("User must be admin to make this request");
            }
        } else {
            return res.status(400).send("User not found");
        }
    }
}

export const admin = Router();
admin.get("/", AdminHandler.fetchTableData);