import { object, string, TypeOf } from 'zod'

const createInvalidTypeError = (prop: string, type: string) =>
    `${prop} must be a ${type}`
const createRequiredError = (prop: string) => `${prop} is required`

const query = object({})

const body = object({
    username: string({
        required_error: createRequiredError('username'),
        invalid_type_error: createInvalidTypeError('username', 'string'),
    }),
    password: string({
        required_error: createRequiredError('password'),
        invalid_type_error: createInvalidTypeError('password', 'string'),
    }).min(5, {
        message: 'Password length should not be less than 5 characters',
    }),
})

export const createUserSchema = object({
    body,
})

export type CreateUserSchema = TypeOf<typeof createUserSchema>
