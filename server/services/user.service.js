import User from '../models/user.model.js'
import Sessions from '../models/sessions.model.js';
import bcrypt from "bcrypt";
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
        console.log('after error')
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
            const newSession = await Sessions.create(session)
            return newSession
        }
        else if (passwordMatch === false){
            throw new FormError('401', 0, 'Wrong password!', 'password')
        }
        else {
            throw new Error('500', 0, 'Something went wrong :(')
        }
    }

    static async validateUserSession(sessionID) {
        const userSession = await Sessions.findOne({
            attributes: ['user_id', 'session_id', 'session_creation_date', 'session_expiration_date'],
            where: {
                session_id: sessionID
            }
        })
        if (userSession) {
            return userSession.session_id
        }
        else {
            throw new Error(401, 0, 'Invalid sessionID')
        }
    }

    static async getUserData(sessionID) {
        const userSession = await Sessions.findOne({
            attributes: ['user_id', 'session_id', 'session_creation_date', 'session_expiration_date'],
            where: {
                session_id: sessionID
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
            throw new Error(401, 0, 'Invalid sessionID')
        }
    }

}