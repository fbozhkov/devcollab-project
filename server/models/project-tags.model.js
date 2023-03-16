import db from "../config/db.config.js";
import Projects from './projects.model.js'
import Tags from './tags.model.js'
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
            allowNull: false,
            references: {
                model: Tags,
                key: 'id'
            }
        },

    }, {
    timestamps: false
});
/* Projects.hasMany(ProjectTags, {foreignKey: 'project_id', as: 'tags'});
ProjectTags.belongsTo(Projects, {foreignKey: 'project_id', as: 'tags'}); */
Tags.belongsToMany(Projects, { through: ProjectTags, foreignKey: 'project_tag_id', 
otherKey:'project_id', as: 'projects' });
Projects.belongsToMany(Tags, { through: ProjectTags, foreignKey: 'project_id',
otherKey:'project_tag_id', as: 'tags' });

ProjectTags.sync()

export default ProjectTags