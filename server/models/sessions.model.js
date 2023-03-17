import db from '../config/db.config.js'
import User from './user.model.js'
import { Sequelize, DataTypes } from "sequelize"

const Sessions = db.sequelize.define (
    'Sessions',
    {
        user_id: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'id'
            }
        },
        session_id: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        session_creation_date: {
            type: Sequelize.DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        session_expiration_date: {
            type: Sequelize.DataTypes.DATE,
            allowNull: false
        }
    },  {
    timestamps: false
    }
)

Sessions.sync()

export default Sessions