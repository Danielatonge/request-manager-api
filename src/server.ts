import express from "express"
import {productRouter, orderRouter} from "./router"
import morgan from "morgan"
import cors from 'cors'
import { protect } from "./middleware/authenticate";
import { createNewUser, signin } from "./controller/user.controller";

const app = express();

app.use(cors())
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.get("/", (req, res) => {
    res.status(200)
    res.send({ message: "hello" });
});
 
app.use('/api/order', orderRouter);
app.use('/api/product', protect, productRouter)

app.post('/user', createNewUser);
app.post('/signin', signin);

app.use((err, req, res, next) => {
    if(err.type === 'auth') {
        res.status(401).json({ message: 'unauthorized' });
    }
    if(err.type === 'input') {
        res.status(400).json({ message: 'invalid input' });
    }

    res.status(500).json({ message: 'oops, thats on us'})

})
export default app


