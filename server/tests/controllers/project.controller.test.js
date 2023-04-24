import supertest from "supertest";
import app from "../../app";
import ProjectService from "../../services/project.service";
import UserService from "../../services/user.service";
import { jest } from '@jest/globals';

jest.spyOn(ProjectService, 'postProject').mockImplementation(jest.fn());
jest.spyOn(ProjectService, 'getAllProjects').mockImplementation(jest.fn());
jest.spyOn(ProjectService, 'getProjectById').mockImplementation(jest.fn());
jest.spyOn(UserService, 'getUserData').mockImplementation(jest.fn());

describe('Project Controller', () => {
    beforeEach(() => {
        ProjectService.postProject.mockClear();
        ProjectService.getAllProjects.mockClear();
        ProjectService.getProjectById.mockClear();
        UserService.getUserData.mockClear();
    });

    test('should not allow unauthorized users to post a project', async () => {
        const projectData = {
            projectName: 'test project',
            projectDescription: 'test project description',
            projectTags: ['test', 'project', 'tags']
        };
        
        const request = supertest(app);
        const response = await request.post('/api/projects/post-project')
            .send(projectData)
            .set('Accept', 'application/json');

        expect(response.status).toEqual(403);
        expect(response.body).toHaveProperty('message', 'No user session found');
    })

    test('should allow authorized users to post a project', async () => {
        const projectData = {
            projectName: 'test project',
            projectDescription: 'test project description',
            projectTags: ['test', 'project', 'tags']
        };
        
        UserService.getUserData.mockResolvedValueOnce({
            id: 1234
        });

        ProjectService.postProject.mockResolvedValueOnce({
            dataValues: {
                id: 1,
                creator_id: 1,
                project_title: projectData.projectName,
                project_description: projectData.projectDescription
            }
        });

        const request = supertest(app);
        const response = await request.post('/api/projects/post-project')
            .send(projectData)
            .set('Accept', 'application/json')
            .set('Cookie', 'sessionID=1234');

        expect(response.status).toEqual(200);
        expect(ProjectService.postProject).toHaveBeenCalledTimes(1);
        const responseBody = response.body;
        expect(responseBody).toHaveProperty('id', 1);
        expect(responseBody).toHaveProperty('creator_id', 1);
        expect(responseBody).toHaveProperty('project_title', projectData.projectName);
        expect(responseBody).toHaveProperty('project_description', projectData.projectDescription);
    })

    test('should allow all users to get all projects', async () => {
        const projectData = {
            id: 1,
            creator_id: 1,
            project_title: 'test project',
            project_description: 'test project description',
            project_tags: ['test', 'project', 'tags']
        };

        ProjectService.getAllProjects.mockResolvedValueOnce([projectData]);

        const request = supertest(app);
        const response = await request.get('/api/projects/get-all-projects')
            .set('Accept', 'application/json');

        expect(response.status).toEqual(200);
        expect(ProjectService.getAllProjects).toHaveBeenCalledTimes(1);
        const responseBody = response.body;
        expect(responseBody[0]).toHaveProperty('id', 1);
        expect(responseBody[0]).toHaveProperty('creator_id', 1);
        expect(responseBody[0]).toHaveProperty('project_title', projectData.project_title);
        expect(responseBody[0]).toHaveProperty('project_description', projectData.project_description);
        expect(responseBody[0]).toHaveProperty('project_tags', projectData.project_tags);
    })

})