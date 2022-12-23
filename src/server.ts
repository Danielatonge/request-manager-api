import { validateRequest } from './middleware/validators'
import express from 'express'
import { productRouter, orderRouter } from './router'
import Logger from './utils/logger'
import cors from 'cors'
import { protect } from './middleware/authenticate'
import { createNewUser, signin } from './controller/user.controller'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from './swagger.json'
import path from 'path'
import {
    asyncWrapper,
    BadRequestError,
    DatabaseError,
    NotFoundError,
} from './utils/error'
import { createUserSchema } from './schema/user.schema'

const app = express()
const logger = Logger.getInstance('server-routes')

app.use(cors())
app.use(Logger.getHttpLoggerInstance())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const options = {}

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options))

app.get('/', async (req, res) => {
    logger.info('landing page is being loaded')
    res.sendFile(path.join(__dirname + '/templates/index.html'))
})

app.use('/v1/api/order', orderRouter)
app.use('/v1/api/product', protect, productRouter)

app.post(
    '/v1/api/user',
    validateRequest(createUserSchema),
    asyncWrapper(createNewUser)
)
app.post('/v1/api/signin', asyncWrapper(signin))

app.use(
    '*',
    asyncWrapper((req, _res, next) => {
        throw new NotFoundError(`Requested path ${req.originalUrl} not found`)
    })
)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || 'internal server error'

    logger.error(message, { exited: true })
    if (err instanceof BadRequestError) {
        return res.status(statusCode).json({
            success: false,
            message: message,
            errors: err.errors,
        })
    }
    if (err instanceof DatabaseError) {
        return res.status(statusCode).json({
            success: false,
            message: message,
            errors: err.meta,
            code: err.code,
        })
    }
    res.status(statusCode).json({ success: false, message: message })
})
export default app
