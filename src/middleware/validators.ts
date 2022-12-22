import { validationResult } from 'express-validator'
import { AnyZodObject } from 'zod'

export const handleInputErrors = (req, res, next) => {
    const errors = validationResult(req)

    console.log(errors)

    if (!errors.isEmpty()) {
        res.status(400)
        res.json({ errors: errors.array() })
    } else {
        next()
    }
}

export const validateRequest = (schema: AnyZodObject) => (req, res, next) => {
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
        })
        next()
    } catch (e) {
        return res.status(400).json({ errors: e.errors })
    }
}
