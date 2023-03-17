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
        },
        avatar_url: {
            type: Sequelize.DataTypes.STRING
        },
        date_created_at: {
            type: Sequelize.DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        date_last_updated_at: {
            type: Sequelize.DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        }
    }, {
        timestamps: false
    }
) 

User.sync()

export default User