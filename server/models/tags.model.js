import db from "../config/db.config.js";
import ProjectTags from "./project-tags.model.js";
import { Sequelize } from "sequelize";
import * as dotenv from 'dotenv'
dotenv.config();

const { SYNC_DB } = process.env;

const Tags = db.sequelize.define(
    'Tags',
    {
        id: {
            type: Sequelize.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        tag: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        }
    }, {
    timestamps: false
});

if (SYNC_DB === 'true') {
    Tags.sync()
}

export default Tags