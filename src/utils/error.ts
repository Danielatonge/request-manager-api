import StatusCodes from 'http-status-codes'
import Logger from './logger'

const logger = Logger.getInstance('request-handler')

export const asyncWrapper = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => {
        logger.error(err.message, { exited: false })
        next(err)
    })
}

export class BaseError extends Error {
    statusCode: number
    isOperational: boolean
    constructor(statusCode: number, message: string, isOperational: boolean) {
        super(message)

        this.statusCode = statusCode
        this.isOperational = isOperational
        Error.captureStackTrace(this, this.constructor)
    }
}

export class BaseAPIError extends BaseError {
    constructor(
        statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR,
        message: string = 'internal server error',
        isOperational: boolean = true
    ) {
        super(statusCode, message, isOperational)
    }
}

export class NotFoundError extends BaseAPIError {
    constructor(message: string = 'resource not found') {
        super(StatusCodes.NOT_FOUND, message)
    }
}

export class BadRequestError extends BaseAPIError {
    errors: any
    constructor(message: string = 'bad request', errors: any = []) {
        super(StatusCodes.BAD_REQUEST, message)
        this.errors = errors
    }
}

export class DatabaseError extends BaseError {
    code: string
    meta: any
    constructor(
        code: string,
        meta: any,
        message: string = 'internal server failure'
    ) {
        super(StatusCodes.INTERNAL_SERVER_ERROR, message, true)
        this.code = code
        this.meta = meta
    }
}
