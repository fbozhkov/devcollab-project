import express from 'express';
import  path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import userController from './controllers/user.controller.js'
import * as dotenv from 'dotenv'
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.PORT;

const app = express();

const corsConfig = {
    origin: ["https://devcollab.netlify.app", "http://localhost:3000"],
    credentials: true,
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    allowedHeaders: ['Content-Type']
};

app.use(cors(corsConfig));
app.use(express.json());
app.use(express.static(__dirname + 'public'))

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname,'./public/server.html'))
})
app.use('/api/users', userController);

app.listen(port, () => {
    console.log(`server listening on port ${port}`)
})