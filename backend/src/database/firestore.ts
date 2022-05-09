
import { initializeApp, applicationDefault, cert } from "firebase-admin/app";
import { getFirestore, Timestamp, FieldValue } from "firebase-admin/firestore";


const serviceAccountKey = require("./serviceAccountKey.json");

initializeApp({
    credential: cert(serviceAccountKey),
});

export const db = getFirestore();
export const usersRef = db.collection("users");