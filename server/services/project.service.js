import Projects from "../models/projects.model.js"
import ProjectTags from "../models/project-tags.model.js";
export default class ProjectService {

    static async postProject(projectData, projectTags) {
        const newProject = await Projects.create(projectData);
        /* console.log('newProject:')
        console.log(newProject); */
        for (const tag of projectTags) {
            const tagData = {
                project_id: newProject.dataValues.project_id,
                project_tag_id: projectTags.indexOf(tag),
                tag: tag
            }
            const newTag = await ProjectTags.create(tagData);
        }
    }

    static async getAllProjects() {
        const projects = Projects.findAll({
            attributes: ['project_id','creator_id','project_title','project_description','creation_date','last_updated_date'],
            include: [{
                model: ProjectTags,
                as: 'tags',
                attributes: [ 'tag'],
                required: false
            }]
        })
        .catch(error => {
            throw new Error(error.message);
        })
        return projects;
    }

    static async getProjectById(id) {
        const project = Projects.findOne({
            attributes: ['project_id', 'creator_id', 'project_title', 'project_description', 'creation_date', 'last_updated_date'],
            include: [{
                model: ProjectTags,
                as: 'tags',
                attributes: ['tag'],
                required: false
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