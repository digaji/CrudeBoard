// import { NextFunction, Request, Response, Router } from "express";
// import { NodefluxClient } from "../../nodeflux/NodefluxClient";

// const client = new NodefluxClient();

// class NodefluxHandler {
//     static async facemaskOn(req: Request, res: Response, next: NextFunction) {
//         const {img} = req.body;
//         const mask_on = await client.facemaskOn(img);
//         return res.status(200).send(mask_on);
//     }
// }

// export const nodeflux = Router();
// nodeflux.post("/facemask", NodefluxHandler.facemaskOn);