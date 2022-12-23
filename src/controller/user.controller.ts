import { BadRequestError } from './../utils/error'
import { comparePasswords, createJWT, hashPassword } from '../utils/auth'
import db from '../db'
import { DatabaseError, NotFoundError } from '../utils/error'

const { Prisma } = require('@prisma/client')
export const createNewUser = async (req, res, next) => {
    // assertain uniqueness constraint

    const findUserByUsername = await db.user.findFirst({
        where: {
            username: req.body.username,
        },
    })

    if (findUserByUsername) {
        throw new BadRequestError(
            `A user with username ${req.body.username} already exists`
        )
    }

    try {
        const user = await db.user.create({
            data: {
                username: req.body.username,
                password: await hashPassword(req.body.password),
            },
        })
        const token = createJWT(user)
        res.json({ token })
    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            throw new DatabaseError(err.code, err.meta)
        }
        throw err
    }
}

export const signin = async (req, res) => {
    const user = await db.user.findUnique({
        where: {
            username: req.body.username,
        },
    })
    const isValid = await comparePasswords(req.body.password, user.password)
    if (!isValid) {
        throw new NotFoundError('Invalid username or password')
    }

    const token = createJWT(user)
    res.json({ token })
}
