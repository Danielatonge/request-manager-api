import jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'

export const comparePasswords = (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
}

export const hashPassword = (password) => {
    return bcrypt.hash(password, 5)
}


export const createJWT = (user) => {
    const token = jwt.sign({
        id: user.id, 
        username: user.username
    }, process.env.JWT_SECRET)
    return token
}

