import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import corsConfig from './config/cors.config.js';
import userController from './controllers/user.controller.js'
import projectController from './controllers/project.controller.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors(corsConfig));
app.use(express.json());
app.use(express.static(__dirname + 'public'))

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/server.html'))
})
app.use('/api/users', userController);
app.use('/api/projects', projectController);

export default app;