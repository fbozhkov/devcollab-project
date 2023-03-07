import User from '../models/user.model.js'
import Sessions from '../models/sessions.model.js';
import UserInfo from '../models/user.info.model.js';
import bcrypt from "bcrypt";
import axios from "axios";
import cloudinary from "../config/cloudinary.config.js";
import * as streamifier from 'streamifier';
import avatarUrl from '../config/avatarGenerator.config.js';
import { v4 as uuidv4 } from 'uuid';
import {Error, FormError }from '../error/error.js';

export default class UserService {
    
    static async userSignUp(userData) {
        const userEmail = await User.findOne({
            where: {
                email: userData.email
            }
        }).catch(error => {
            return error.message
        })

        const userName = await User.findOne({
            where: {
                username: userData.username
            }
        }).catch(error => {
            return error.message
        })

        if (userEmail) {
            throw new FormError('409', 0, `User with an email: ${userData.email} already exists!`, 'email')
        }
        if (userName) {
            console.log(`userName: ${userName}`)
            throw new FormError('409', 0, 'Username already taken! Please choose a different one!', 'username')
        }
        
        const avatarResponse = await axios.get(avatarUrl(userData.username), { responseType: 'arraybuffer' })
        
        let uploadFromBuffer = (avatarResponse) => {
            return new Promise((resolve, reject) => {
                let cld_upload_stream = cloudinary.v2.uploader.upload_stream(
                    {
                        folder: 'test'
                    },
                    (error, result) => {

                        if (result) {
                            resolve(result);
                        } else {
                            reject(error);
                        }
                    }
                );

                streamifier.createReadStream(avatarResponse.data).pipe(cld_upload_stream)
            });
        }
        
        let result = await uploadFromBuffer(avatarResponse)
        userData['avatar_url'] = result.secure_url;

        const newUser = User.create(userData);
        return newUser;
    }

    static async getAllUsers() {
        
        const users = await User.findAll({
            attributes:['id','username','email']
        }).catch(error => {
            console.log(`error in getAllUsers: ${error}`)
            return error.message
        })
        return users;
    }

    static async deleteAllSessions() {
        const sessions = await Sessions.destroy({
            attributes: ['user_id' ,'session_id', 'session_creation_date', 'session_exipiration_date'],
            where: {}
        }).catch(error => {
            console.log(`error in deleteAllSessions: ${error}`)
            return error.message
        })
    }

    static async deleteAllUsers() {
        const users = await User.destroy({
            attributes:['id', 'username', 'email', 'password'],
            where: {}
        }).catch(error => {
            console.log(`error in deleteAllUsers: ${error}`)
            return error.message
        })
        return 'all users deleted';
    }

    static async signInUser(userEmail, userPassword) {
        const user = await User.findOne({
            where: {
                email: userEmail 
            } 
        })

        if (user === null) {
            throw new FormError('404', 0, 'There is no user registered with that email', 'email');
        }

        const passwordMatch = await bcrypt.compare(userPassword, user.password)
        
        if (passwordMatch) {
            const sessionID = uuidv4();
            const now = new Date();
            const expirationDate = new Date(+now + 3 * 24 * 60 * 60 * 1000);
            const session = {
                user_id: user.id,
                session_id: sessionID,
                session_expiration_date: expirationDate
            }
            const newSession = await Sessions.create(session);
            return newSession;
        }
        else if (passwordMatch === false){
            throw new FormError('401', 0, 'Wrong password!', 'password');
        }
        else {
            throw new Error('500', 0, 'Something went wrong :(');
        }
    }

    static async chageUserEmail(newEmail, userId) {
        const user = await User.findOne({
            attributes: ['id', 'email'],
            where: {
                id: userId
            }
        })
        if (newEmail === user.email) {
            throw new Error('409', 0, 'Please enter a new email!');
        }
        await user.update({ email: newEmail, date_last_updated_at: new Date()});
    }

    static async changeUserPassword(newPassword, userId) {
        const user = await User.findOne({
            attributes: ['id', 'password'],
            where: {
                id: userId
            }
        })
        const passwordMatch = await bcrypt.compare(newPassword, user.password);
        if (passwordMatch) {
            throw new Error('409', 0, 'Please enter a new password!');
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await user.update({ password: hashedPassword, date_last_updated_at: new Date()});
    }

    static async validateUserSession(sessionId) {
        const userSession = await Sessions.findOne({
            attributes: ['user_id', 'session_id'],
            where: {
                session_id: sessionId
            }
        })
        if (userSession) {
            return userSession;
        }
        else {
            throw new Error(401, 0, 'Invalid sessionID');
        }
    }

    static async getUserData(sessionId) {
        const userSession = await Sessions.findOne({
            attributes: ['user_id', 'session_id', 'session_creation_date', 'session_expiration_date'],
            where: {
                session_id: sessionId
            }
        })
        if (userSession) {
            const user = await User.findOne({
                attributes: ['id','username', 'email'],
                where: {
                    id: userSession.user_id
                }
            })
        return user;
        }
        else {
            throw new Error(401, 0, 'Invalid sessionID');
        }
    }

    static async getUserAvatar(userId) {
        const user = await User.findOne({
            attributes: ['username', 'avatar_url'],
            where: {
                id: userId
            },
        })
        if (user.avatar_url) {
            return user;
        }
        else {
            throw new Error (404, 0, 'Avatar url could not be found')
        }
    
    }

    static async initAdditionalInfo(userId) {
        const data = {id: userId}
        console.log(data)
        const additionalInfo = UserInfo.create(data)
    }

    static async addAdditionalInfo(payload, userId) {
        const data = {id: userId, ...payload}
        const user = await UserInfo.findOne({
            where: {
                id: userId
            }
        })
        await user.update(data)
    }

    static async getAdditionalInfo(userId) {
        const user = await UserInfo.findOne({
            attributes: ['bio', 'github', 'linkedIn', 'twitter'],
            where: {
                id: userId
            }
        })
        if (user) {
            return user;
        }
        else {
            throw new Error (404, 0, 'Additional userInfo could not be found!')
        }
    }

}