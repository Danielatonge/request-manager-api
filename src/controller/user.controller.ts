import { comparePasswords, createJWT, hashPassword } from '../utils/auth';
import db from "../db";

export const createNewUser = async (req, res, next) => {
    try {
        const user = await db.user.create({
            data: {
                username: req.body.username,
                password: await hashPassword(req.body.password)
            }
        })
        const token = createJWT(user);
        res.json({token});
    } catch (err) {
        err.type = 'input',
        next(err)
    }
}

export const signin = async (req, res) => {
    const user = await db.user.findUnique({
        where: {
            username: req.body.username
        }
    })
    const isValid = await comparePasswords(req.body.password, user.password);
    if(!isValid) {
        res.status(401)
        res.json({message: 'Invalid username or password'})
        return
    }

    const token = createJWT(user);
    res.json({token});
}