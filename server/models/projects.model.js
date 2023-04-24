import db from "../config/db.config.js";
import User from './user.model.js';
import { Sequelize, DataTypes } from "sequelize";
import * as dotenv from 'dotenv'
dotenv.config();

const { SYNC_DB } = process.env;

const Projects = db.sequelize.define (
    'Projects',
    {
        project_id: {
            type: Sequelize.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        
        creator_id: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'id'
            }
        },

        project_title: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },

        project_description: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },

        creation_date: {
            type: Sequelize.DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },

        last_updated_date: {
            type: Sequelize.DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        }
    }, {
    timestamps: false
    }
)

if (SYNC_DB === 'true') {
    Projects.sync()
}

export default Projects