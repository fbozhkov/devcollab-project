import cors from 'cors';
import express from 'express'

const app = express();

app.use(cors())
app.use(express.json())

app.post('/api/sign-up', (req, res) => {
    console.log(req.body);
})

app.listen(5000, () => {
    console.log('server listening on port 5000')
})