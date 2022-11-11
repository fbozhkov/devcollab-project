import express from "express";
import bcrypt from "bcrypt";
import axios from 'axios';
import cloudinary from "../config/cloudinary.config.js";
import * as streamifier from 'streamifier';
import { authorizeUser } from "../middleware/auth.js";

import UserService from "../services/user.service.js";

const userController = express.Router();

userController.post('/sign-up', async (req, res) => {
    console.log(req.body);
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const userData = {
        email: req.body.email,
        username: req.body.userName,
        password: hashedPassword
    }
    try {
        const user = await UserService.userSignUp(userData);
        console.log('user')
        console.log(user.dataValues.id)
        await UserService.initAdditionalInfo(user.dataValues.id);
        userData["success"] = 1;
        res.status(200).json(userData);
    }
    catch(e){
        console.log('catch block');
        console.log(e);
        res.status(Number(e.status)).json(e);
    }
})

userController.get('/test', async (req,res) => {
    try{
        const avatarResponse = await axios.get('https://ui-avatars.com/api/?background=random', { responseType: 'arraybuffer' })
        res.set('Content-Type', avatarResponse.headers['content-type']);
        res.status(200).send(avatarResponse.data);
        let cld_upload_stream = cloudinary.v2.uploader.upload_stream(
            {
                folder: 'test'
            },
            (error, result) => {
                console.log(error,result);
                console.log(result.secure_url)
            }
        );
        streamifier.createReadStream(avatarResponse.data).pipe(cld_upload_stream) 
    }
    catch(error) {
        console.log(error)
    }
})

userController.post('/sign-in', async (req,res) => {
    console.log(req.body)
    try {
        const auth = await UserService.signInUser(req.body.email, req.body.password)
        res.cookie('sessionID', auth.session_id, { expires: auth.session_expiration_date, sameSite: 'None', secure: true, httpOnly: true})
        res.status(200).json({'authentication': auth, 'message': 'Authentication succeeded!', 'success': 1})
    }
    catch(e) {
        console.log(e)
        res.status(Number(e.status)).json(e);
    }
})

userController.put('/additionalInfo', authorizeUser, async (req,res) => {
    try {
        await UserService.addAdditionalInfo(req.body, req.userId)
    }
    catch(error){
        console.log(error)
    }
})

userController.get('/log-out', async (req,res) => {
    res.cookie('sessionID', 'none', { expires: new Date(Date.now()), sameSite: 'None', secure: true, httpOnly: true })
    res.status(200).json({message: 'Successfully logged out'});
})

userController.put('/chageUserEmail', authorizeUser, async (req,res) => {
    try {
        await UserService.chageUserEmail(req.body.email, req.userId)
        res.status(200).json({message: 'Email changed successfully'})
    }
    catch(error) {
        console.log(error)
        res.status(Number(error.status)).json(error);
    }
})

userController.put('/changeUserPassword', authorizeUser, async (req,res) => {
    try {
        await UserService.changeUserPassword(req.body.password, req.userId)
        res.status(200).json({message: 'Password changed successfully'})
    }
    catch(error) {
        console.log(error)
        res.status(Number(error.status)).json(error);
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

userController.get('/validateUser', async (req, res) => {
    const cookie = req.headers.cookie
    const session = req.headers.cookie?.split(';').find( cookie => cookie.includes('sessionID'));
    if(session) {
        const sessionID = session.split("=")[1];
        console.log(`sessionID: ${sessionID}`)
        try {
            const user = await UserService.validateUserSession(sessionID)
            user.dataValues['success'] = 1;
            console.log(user)
            res.status(200).json(user);
        }
        catch(error){
            console.log(`error: ${error.message}`)
            res.status(error.status).json(error.message);
        }
    }
    else {
        res.status(404).json({'message' : 'No user session found', 'success': 0})
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

userController.get('/getUserAvatar/:id', async (req,res) => {
    try {
        const avatar = await UserService.getUserAvatar(req.params['id'])
        res.status(200).json(avatar);
    }
    catch(error){
        console.log(error)
        res.status(Number(error.status)).json(error);
    }
})

userController.get('/getAdditionalInfo/:id', async (req, res) => {
    try {
        const userInfo = await UserService.getAdditionalInfo(req.params['id'])
        res.status(200).json(userInfo);
    }
    catch (error) {
        console.log(error)
        res.status(Number(error.status)).json(error);
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