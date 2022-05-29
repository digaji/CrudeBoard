import axios from "axios";
import dotenv from "dotenv";

export class NodefluxClient {
    header: {Authorization: string, "x-nodeflux-timestamp": string};
    url: string;
    facemask_url: string;
    constructor() {
        this.url = "https://backend.cloud.nodeflux.io/auth/signatures";
        this.facemask_url = "https://api.cloud.nodeflux.io/syncv2/analytics/face-mask";
        this.header = {Authorization: "", "x-nodeflux-timestamp": ""};
        dotenv.config();
        const renewHeader = (async () => {
            console.log("Renewing Nodeflux Headers");
            const resources = await this.requestHeaderResources();
            this.header = await this.buildHeaderFromResources(resources);
        });
        const one_min = 60_000; // ms
        renewHeader();
        setInterval(renewHeader, 5 * one_min);
    }

    async facemaskOn(base64img: string) {
        const config = {
            headers: this.header,
        }
        try {
            const res = await axios.post(this.facemask_url, {
                "images": [base64img]
            }, config);
            return res.data.result[0].face_mask[0].status === "masked_face";
        } catch(err) {
            console.log(err);
            return false;
        }
    }

    async requestHeaderResources(): Promise<{token: string, timestamp: string}> {
        try {
            const res = await axios.post(this.url, {
                access_key: process.env.NODEFLUX_ACCESS_KEY,
                secret_key: process.env.NODEFLUX_SECRET_KEY,
            }, {});
            const {token, headers} = res!.data;
            return {token: token, timestamp: headers["x-nodeflux-timestamp"]};
        } catch (err) {
            console.log(err);
            return {token: "", timestamp: ""};
        }

    }

    async buildHeaderFromResources(resources: {token: string, timestamp: string}) {
        // NODEFLUX-HMAC-SHA256 Credential=BB5Z79ZMZQ5YGN3Q1V96QO733/20220517/nodeflux.api.v1beta1.ImageAnalytic/StreamImageAnalytic, SignedHeaders=x-nodeflux-timestamp, Signature=f3a38e38d7678a53dc41ef2ea8744306633177fced83c54158a287daf8096cba
        const {token, timestamp} = resources;
        return {
            "Authorization": `NODEFLUX-HMAC-SHA256 Credential=${process.env.NODEFLUX_ACCESS_KEY}/${timestamp.slice(0, 8)}/nodeflux.api.v1beta1.ImageAnalytic/StreamImageAnalytic, SignedHeaders=x-nodeflux-timestamp, Signature=${token}`,
            "x-nodeflux-timestamp": `${timestamp}`
        }
    }
}