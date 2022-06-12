import { NextFunction, Request, Response, Router } from "express";
import { Mask } from "../../../domain/mask/entity/Mask";
import { MaskService } from "../../../domain/mask/service/MaskService";

export class MaskHandler {

    static async createTaskToday(req: Request, res: Response, next: NextFunction) {

        // @ts-ignore
        const {userId} = req.userId;
        const {isMasked} = req.body;
        const mask: Mask = new Mask();
        mask.isMasked = isMasked;
        const ret = await MaskService.createMaskToday(userId, mask);
        return res.status(200).json({time: ret});
    }
}

export const mask = Router();

mask.post("/", MaskHandler.createTaskToday);
