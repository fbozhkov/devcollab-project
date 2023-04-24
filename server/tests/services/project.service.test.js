import supertest from "supertest";
import ProjectService from "../../services/project.service";
import UserService from "../../services/user.service";
import User from "../../models/user.model";
import Projects from "../../models/projects.model";
import Tags from "../../models/tags.model";
import ProjectTags from "../../models/project-tags.model";

beforeAll( async () => {
    await Projects.destroy({where: {}});
    await Tags.destroy({where: {}});
    await ProjectTags.destroy({where: {}});
    await User.destroy({ where: {} });
});

describe.only ('Project Service', () => {
    test('should create a new project with tags', async () => {

        const user = await UserService.userSignUp({
            email: 'test@email.com',
            username: 'testuser',
            password: 'testpassword'
        });

        const projectData = {
            creator_id: user.dataValues.id,
            project_title: 'test project',
            project_description: 'test project description',
        };
        const projectTags = ['test', 'project', 'tags'];

        const newProject = await ProjectService.postProject(projectData, projectTags);

        expect(newProject).toHaveProperty('project_id');
        expect(newProject).toHaveProperty('creator_id', user.dataValues.id);
        expect(newProject).toHaveProperty('project_title', projectData.project_title);
        expect(newProject).toHaveProperty('project_description', projectData.project_description);
        expect(newProject).toHaveProperty('creation_date');
        expect(newProject).toHaveProperty('last_updated_date');
        expect(newProject).toHaveProperty('tags');
        expect(newProject.tags).toHaveLength(projectTags.length);
    })

    afterAll( async () => {
        await Projects.destroy({where: {}});
        await Tags.destroy({where: {}});
        await ProjectTags.destroy({where: {}});
        await User.destroy({where: {}});
    });    

})