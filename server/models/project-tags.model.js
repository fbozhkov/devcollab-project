import db from "../config/db.config.js";
import Projects from './projects.model.js'
import { Sequelize } from "sequelize";

const ProjectTags = db.sequelize.define(
    'Project Tags',
    {
        id: {
            type: Sequelize.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        project_id: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Projects,
                key: 'project_id'
            }
        },

        project_tag_id: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false
        },

        tag: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        }
    }, {
    timestamps: false
});
Projects.hasMany(ProjectTags, {foreignKey: 'project_id', as: 'tags'});
ProjectTags.belongsTo(Projects, {foreignKey: 'project_id', as: 'tags'});

export default ProjectTags