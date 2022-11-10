import cors from 'cors';
import express from 'express'

const app = express();

let users = [];

app.use(cors());
app.use(express.json());

app.get('/api/getAllUsers', (req, res) => {
    if (users) {
        res.status(200).json(users);
    }
    else {
        res.send({ "msg" : "No users"});
    }
})

app.post('/api/sign-up', (req, res) => {
    console.log(req.body);
    const user = req.body;
    users.push(user);
})

app.delete('/api/deleteAllUsers', (req, res) => {
    if (users) {
        users = [];
        res.status(200);
    }
})

app.listen(5000, () => {
    console.log('server listening on port 5000')
})