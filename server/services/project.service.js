import Projects from "../models/projects.model.js"

export default class ProjectService {

    static async postProject(projectData) {
        const newProject = Projects.create(projectData)
    }
}