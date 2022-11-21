import User from '../models/user.model.js'
/* import FormError from '../error/error.js'; */
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
}