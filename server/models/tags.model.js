import db from "../config/db.config.js";
import ProjectTags from "./project-tags.model.js";
import { Sequelize } from "sequelize";

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

/* Tags.sync() */

export default Tags