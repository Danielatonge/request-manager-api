import jwt from 'jsonwebtoken'

export const protect = (req, res, next) => {
    const bearer = req.headers.authorization

    if(!bearer) {
        res.status(401)
        res.json({message: 'Not authorized'})
        return
    }

    const [,token] = bearer.split(' ')
    if(!token) {
        res.status(401)
        res.json({message: 'Not authorized'})
        return
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = payload;
        next();
    } catch (err) {
        console.error(err)
        res.status(401)
        res.json({message: 'Not valid token'})
        return
    }
}