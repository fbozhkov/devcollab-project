import Projects from "../models/projects.model.js"
import ProjectTags from "../models/project-tags.model.js";
import Tags from "../models/tags.model.js";
export default class ProjectService {

    static async postProject(projectData, projectTags) {
        let newProject = await Projects.create(projectData)
            .catch((error) => {
                throw new Error(error);
            });
        // check if tag exists in db
        for (const tag of projectTags) {
            const tagDb = await Tags.findOne({
                attributes: ['id', 'tag'],
                where: {
                    tag: tag
                }
            })
            // if tag exists, create project-tag association
            if (tagDb) {
                const tagData = {
                    project_id: newProject.dataValues.project_id,
                    project_tag_id: tagDb.dataValues.id,
                }
                const projectTag = await ProjectTags.create(tagData);
            }
            // if tag doesn't exist, create tag and project-tag association
            else {
                const newTag = await Tags.create({tag: tag});
                const tagData = {
                    project_id: newProject.dataValues.project_id,
                    project_tag_id: newTag.dataValues.id,
                }
                const projectTag = await ProjectTags.create(tagData);
            }
        }
        const newProjectId = newProject.dataValues.project_id;
        newProject = await Projects.findOne({
            attributes: ['project_id', 'creator_id', 'project_title', 'project_description', 'creation_date', 'last_updated_date'],
            include: [{
                model: Tags,
                as: 'tags',
                attributes: ['tag']
            }],
            where: {
                project_id: newProjectId
            }
        })
            .catch((error) => {
                throw new Error(error.message);
            })

        return newProject;
        
    }

    static async getAllProjects() {
        const projects = Projects.findAll({
            attributes: ['project_id','creator_id','project_title','project_description','creation_date','last_updated_date'],
            include: [{
                model: Tags,
                as: 'tags',
                attributes: ['tag']
            }]
        })
            .catch(error => {
                throw new Error(error);
            })
            return projects;
    }

    static async getProjectById(id) {
        const project = Projects.findOne({
            attributes: ['project_id', 'creator_id', 'project_title', 'project_description', 'creation_date', 'last_updated_date'],
            include: [{
                model: Tags,
                as: 'tags',
                attributes: ['tag']
            }],
            where: {
                project_id: id
            }
        })
        .catch((error) => {
            throw new Error(error.message);
        })
        return project;
    }
}