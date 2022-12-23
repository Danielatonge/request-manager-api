import { createLogger, format, transports } from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'
import morgan from 'morgan'

export class Logger {
    static getInstance = (service = 'general-purpose') => {
        const logger = createLogger({
            defaultMeta: { service },
            level: 'http',
            format: format.combine(format.timestamp(), format.json()),
            transports: [
                Logger.getHttpTransport(),
                Logger.getErrorTransport(),
                Logger.getInfoTransport(),
                Logger.getWarnTransport(),
            ],
            exceptionHandlers: [
                new transports.File({ filename: 'logs/exceptions.log' }),
            ],
            rejectionHandlers: [
                new transports.File({ filename: 'logs/rejections.log' }),
            ],
        })

        const env = process.env.NODE_ENV || 'development'

        if (env !== 'production') {
            logger.add(
                new transports.Console({
                    format: format.combine(format.colorize(), format.simple()),
                })
            )
        } else {
            logger.add(new transports.Console())
        }
        return logger
    }
    static errorFilter = format((log, opts) => {
        return log.level === 'error' ? log : false
    })

    static httpFilter = format((log, opts) => {
        return log.level === 'http' ? log : false
    })

    static infoFilter = format((log, opts) => {
        return log.level === 'info' ? log : false
    })

    static warnFilter = format((log, opts) => {
        return log.level === 'warn' ? log : false
    })
    static getInfoTransport = () =>
        new DailyRotateFile({
            filename: 'logs/info-%DATE%.log',
            datePattern: 'HH-DD-MM-YYYY',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d',
            level: 'info',
            format: format.combine(
                Logger.infoFilter(),
                format.timestamp(),
                format.json()
            ),
        })

    static getHttpTransport = () =>
        new DailyRotateFile({
            filename: 'logs/http-%DATE%.log',
            datePattern: 'HH-DD-MM-YYYY',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d',
            level: 'http',
            format: format.combine(
                Logger.httpFilter(),
                format.timestamp(),
                format.json()
            ),
        })

    static getErrorTransport = () =>
        new DailyRotateFile({
            filename: 'logs/error-%DATE%.log',
            datePattern: 'HH-DD-MM-YYYY',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d',
            level: 'error',
            format: format.combine(
                Logger.errorFilter(),
                format.timestamp(),
                format.json()
            ),
        })

    static getWarnTransport = () =>
        new DailyRotateFile({
            filename: 'logs/warn-%DATE%.log',
            datePattern: 'HH-DD-MM-YYYY',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d',
            level: 'warn',
            format: format.combine(
                Logger.warnFilter(),
                format.timestamp(),
                format.json()
            ),
        })

    static getHttpLoggerInstance = () => {
        const logger = Logger.getInstance('morgan-http-logging')

        const stream = {
            write: (message: string) => logger.http(message),
        }

        const skip = () => {
            const env = process.env.NODE_ENV || 'development'
            return env !== 'development'
        }

        const morganMiddleware = morgan(
            ':method :url :status :res[content-length] - :response-time ms :remote-addr',
            { stream, skip }
        )

        return morganMiddleware
    }
}

export default Logger
