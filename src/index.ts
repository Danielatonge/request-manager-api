import express, {Express, Request, Response} from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT;


app.get('/', (req, res) => {
    res.send("Express Server good")
})

app.listen(port, () => {
    console.log(`Express Server listening on http://localhost:${port}`)
})