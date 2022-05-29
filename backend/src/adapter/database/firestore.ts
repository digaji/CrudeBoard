import { initializeApp, applicationDefault, cert } from "firebase-admin/app";
import { getFirestore, Timestamp, FieldValue } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

const serviceAccountKey = require("./serviceAccountKey.json");

initializeApp({
    credential: cert(serviceAccountKey),
});

export const auth = getAuth();
export const db = getFirestore();
db.settings({ignoreUndefinedProperties: true});
export const usersRef = db.collection("users");