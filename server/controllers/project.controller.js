import express from "express";
import ProjectService from "../services/project.service.js";
import { json } from "sequelize";
import { authorizeUser } from "../middleware/auth.js";

const projectController = express.Router();

projectController.post('/post-project', authorizeUser, async (req,res) => {
    console.log(`body:${req.body}`);
    const projectData = {
        creator_id: req.userId,
        project_title: req.body.projectName,
        project_description: req.body.projectDescription,
    }
    const projectTags = req.body.projectTags;
    try {
        await ProjectService.postProject(projectData, projectTags);
    }
    catch(error) {
        console.log(error.message);
        res.status(500);
    }
    res.status(200).json(req.user);
})

projectController.get('/get-all-projects', async (req,res) => {
    try {
        const projects = await ProjectService.getAllProjects();
        res.status(200).json(projects);
    }
    catch(error) {
        console.log(error);
        res.status(500).json(error);
    }
    
})

projectController.get('/project-info/:id', async (req,res) => {
    try {
        const project = await ProjectService.getProjectById(req.params['id'])
        res.status(200).json(project);
    }
    catch(error) {
        console.log(error);
        res.status(500).json(error);
    }
})

export default projectController