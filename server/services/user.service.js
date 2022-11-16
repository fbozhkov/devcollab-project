import User from '../models/user.model.js'

export default class UserService {
    static async userSignUp(userData) {
        const user = await User.findOne({
            where: {
                email: userData.email
            }
        }).catch(error => {
            console.log(error);
            return error.message
        })

        if (user) {
            console.log(`User with email ${userData.email} already exists!`)
            return "user already exists"
        }

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
}