import db from "../config/db.config.js";
import User from './user.model.js';
import { Sequelize } from "sequelize";
import * as dotenv from 'dotenv'
dotenv.config();

const { SYNC_DB } = process.env;

const UserInfo = db.sequelize.define (
    'UserInfo',
    {
        id: {
            type: Sequelize.DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            references: {
                model: User,
                key: 'id'
            }
        },

        bio: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: true
        },

        github: {
            type: Sequelize.DataTypes.STRING,
            allowNull: true
        },

        linkedIn: {
            type: Sequelize.DataTypes.STRING,
            allowNull: true
        },

        twitter: {
            type: Sequelize.DataTypes.STRING,
            allowNull: true
        }
    }, {
    timestamps: false
    }
)

if (SYNC_DB === 'true') {
    UserInfo.sync()
}

export default UserInfo