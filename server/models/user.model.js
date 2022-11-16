import db from '../config/db.config.js'
import { Sequelize, DataTypes } from "sequelize"

const User = db.sequelize.define (
    'Users',
    {
        email: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: false
    }
) 
export default User