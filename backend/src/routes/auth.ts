import express, { Router, Request, Response, NextFunction } from "express";
import { usersRef } from "../database/firestore";
import { registerValidation, loginValidation } from "../validation";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const auth = Router();

auth.post("/register", async (req: Request, res: Response, next: NextFunction) => {
    
    // validating the request body
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    // checking if the user exists
    const snapshot = await usersRef.where("username", "==", req.body.username).get();
    if (!snapshot.empty) return res.status(400).send("User already exists");
    
    // Hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // save the user in the database
    const {id} = await usersRef.add({username: req.body.username, password: hashedPassword});

    // create and grant a token when the user logs in
    return res.status(200).send({userId: id});
});

auth.post("/login", async (req: Request, res: Response, next: NextFunction) => {

    // validating the request body
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // checking if the user exists
    const snapshot = await usersRef.where("username", "==", req.body.username).get();
    if (snapshot.empty) return res.status(400).send("User not found");

    // checking password
    const user = snapshot.docs[0].data();
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send("Invalid password");

    const token = jwt.sign({_id: user}, process.env.TOKEN_SECRET);
    return res.header('auth-token', token).send(token);
});