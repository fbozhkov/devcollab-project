import express from "express";
import bcrypt from "bcrypt";
import User from "../models/user.model.js";

import UserService from "../services/user.service.js";

const userController = express.Router()

userController.post('/sign-up', async (req, res) => {
    console.log(req.body);
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const userData = {
        email: req.body.email,
        username: req.body.userName,
        password: hashedPassword
    }
    try {
        await UserService.userSignUp(userData);
        userData["success"] = 1;
        res.status(200).json(userData);
    }
    catch(e){
        console.log('catch block');
        console.log(e);
        res.status(Number(e.status)).json(e);
    }
})

userController.get('/getAllUsers', async (req, res) => {
    const users = await UserService.getAllUsers();
    console.log('users?',users);
    if (users) {
        res.status(200).json(users);
    }
    else {
        res.send({ "msg": "No users" });
    }
})

userController.delete('/deleteAllUsers', async (req, res) => {
    const result = await UserService.deleteAllUsers();

    if (result === 'all users deleted') {
        res.status(200);
    }
    else {
        res.send({"msg": result});
    }
    
})

export default userController