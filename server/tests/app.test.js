import supertest from "supertest";
import app from "../app";
import cors from "cors";
import corsConfig from "../config/cors.config";

describe('middleware', () => {
    
    test('adds the cors middleware', async () => {
        const request = supertest(app);

        const response = await request.get('/api/users'); // Using the root route as an example
        expect(response.header['access-control-allow-credentials']).toContain(corsConfig.credentials.toString());
    });
    
});