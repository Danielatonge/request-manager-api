import { validationResult } from 'express-validator'
import { AnyZodObject } from 'zod'
import { BadRequestError } from '../utils/error'

export const handleInputErrors = (req, res, next) => {
    const errors = validationResult(req)

    console.log(errors)

    if (!errors.isEmpty()) {
        next(new BadRequestError('bad request', errors.array()))
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
        next(new BadRequestError('bad request', e.errors))
    }
}
