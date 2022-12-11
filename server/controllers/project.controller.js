import express from "express";
import ProjectService from "../services/project.service.js";
import { json } from "sequelize";
import { authorizeUser } from "../middleware/auth.js";

const projectController = express.Router();

projectController.post('/post-project', authorizeUser, async (req,res) => {
    console.log(`body:${req.body}`);
    const projectData = {
        creator_id: req.userID,
        project_title: req.body.projectName,
        project_description: req.body.projectDescription,
        project_tags: req.body.projectTags
    }
    try {
        await ProjectService.postProject(projectData)
    }
    catch(error){
        console.log(error.message)
        res.status(500)
    }
    res.status(200).json(req.user);
})

export default projectController