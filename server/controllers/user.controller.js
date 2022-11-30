import express from "express";
import bcrypt from "bcrypt";
import UserService from "../services/user.service.js";
import User from "../models/user.model.js";

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
    catch(e) {
        console.log('catch block');
        console.log(e);
        res.status(Number(e.status)).json(e);
    }
})

userController.post('/sign-in', async (req,res) => {
    console.log(req.body)
    try {
        const auth = await UserService.signInUser(req.body.email, req.body.password)
        res.cookie('sessionID', auth.session_id, { expires: auth.session_expiration_date, httpOnly:true})
        res.cookie('random cookie', 'random value');
        res.status(200).json({'authentication': auth, 'message': 'Authentication succeeded!', 'success': 1})
    }
    catch(e) {
        console.log(e)
        res.status(Number(e.status)).json(e);
    }
})

userController.get('/log-out', async (req,res) => {
    res.cookie('sessionID', 'none', { expires: new Date(Date.now()), httpOnly: true })
    res.status(200).json({message: 'Successfully logged out'});
})

userController.get('/getAllUsers', async (req, res) => {
    const users = await UserService.getAllUsers();
    if (users) {
        res.status(200).json(users);
    }
    else {
        res.send({ "msg": "No users" });
    }
})

userController.get('/validateUser', async (req, res) => {
    const cookie = req.headers.cookie
    const session = req.headers.cookie?.split(';').find( cookie => cookie.includes('sessionID'));
    if(session) {
        const sessionID = session.split("=")[1];
        console.log(`sessionID: ${sessionID}`)
        try {
            const user = await UserService.validateUserSession(sessionID)
            res.status(200).json(user);
        }
        catch(error){
            console.log(`error: ${error.message}`)
            res.status(error.status).json(error.message);
        }
    }
    else {
        res.status(404).json({'message' : 'No user session found'})
    }
})

userController.get('/getUserData', async (req,res) => {
    const cookie = req.headers.cookie
    const session = req.headers.cookie?.split(';').find(cookie => cookie.includes('sessionID'));
    if(session) {
        const sessionID = session.split("=")[1];
        try {
            const userData = await UserService.getUserData(sessionID)
            res.status(200).json(userData)
        }
        catch(error){
            console.log(`error: ${error.message}`);
        }
    }
    else {
        res.status(404).json({ 'message': 'No user session found' })
    }
})

userController.delete('/deleteAllUsers', async (req, res) => {
    const deleteSessions = await UserService.deleteAllSessions();
    const result = await UserService.deleteAllUsers();

    if (result === 'all users deleted') {
        res.status(200);
    }
    else {
        res.send({"msg": result});
    }
    
})

export default userController