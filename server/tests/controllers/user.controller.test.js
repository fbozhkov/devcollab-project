import supertest from "supertest";
import app from "../../app";
import UserService from "../../services/user.service.js";
import { jest } from '@jest/globals';

jest.spyOn(UserService, 'userSignUp').mockImplementation(jest.fn());
jest.spyOn(UserService, 'initAdditionalInfo').mockImplementation(jest.fn());
jest.spyOn(UserService, 'signInUser').mockImplementation(jest.fn());

describe('User Controller', () => {
    beforeEach(() => {
        UserService.userSignUp.mockClear();
        UserService.initAdditionalInfo.mockClear();
    });

    test('should sign up a user successfully', async () => {
        const userData = {
            email: 'test@gmail.com',
            userName: 'testuser',
            password: 'testpass1'
        };

    UserService.userSignUp.mockResolvedValueOnce({
        dataValues: {
            id: 1,
            email: 'test@gmail.com',
            userName: 'testuser'
        },
    });

    UserService.initAdditionalInfo.mockResolvedValueOnce(true);

    const request = supertest(app);
    const response = await request.post('/api/users/sign-up')
        .send(userData)
        .set('Accept', 'application/json');

    expect(response.status).toEqual(200);
    expect(UserService.userSignUp).toHaveBeenCalledTimes(1);
    expect(UserService.initAdditionalInfo).toHaveBeenCalledTimes(1);
    const responseBody = response.body;
    expect(responseBody.dataValues).toHaveProperty('id', 1);
    expect(responseBody.dataValues).toHaveProperty('email', userData.email);
    expect(responseBody.dataValues).toHaveProperty('userName', userData.userName);
    expect(responseBody).toHaveProperty('success', 1);
    expect(responseBody).not.toHaveProperty('password');
    })


    test('should sign in a user successfully and return sessionID cookie', async () => {
        const userData = {
            email: 'test@gmail.com',
            password: 'testpass1'
        }; 
        const now = new Date();
        UserService.signInUser.mockResolvedValueOnce({
            dataValues: {
                user_id: 1,
                session_id: '1234',
                session_expiration_date: new Date(+now + 3 * 24 * 60 * 60 * 1000)
            }
        });

        const request = supertest(app);
        const response = await request.post('/api/users/sign-in')
            .send(userData)
            .set('Accept', 'application/json');

        expect(response.status).toEqual(200);
        const sessionIDCookie = response.headers['set-cookie'].find(cookie => cookie.startsWith('sessionID='));
        expect(sessionIDCookie).toBeDefined();
        expect(sessionIDCookie).toContain('1234');
        expect(UserService.signInUser).toHaveBeenCalledTimes(1);
        const responseBody = response.body;
        expect(responseBody).toHaveProperty('success', 1);
    })

})