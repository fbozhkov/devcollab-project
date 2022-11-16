import express from "express";

import UserService from "../services/user.service.js";

const userController = express.Router()

userController.post('/sign-up', async (req, res) => {
    console.log(req.body);
    
    const userData = {
        email: req.body.email,
        username: req.body.userName,
        password: req.body.password
    }
    await UserService.userSignUp(userData)
    res.json(userData)
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

export default userController