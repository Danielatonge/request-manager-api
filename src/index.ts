import dotenv from 'dotenv'
dotenv.config()
import app from './server'
import config from './config'
import Logger from './utils/logger'

const logger = Logger.getInstance('main application')

process.on('uncaughtException', (err) => {
    logger.error('Application exited unexpectedly...', { extra: err.message })
})
process.on('unhandledRejection', () => {
    logger.error('Unhandled rejection!')
})

app.listen(config.port, () => {
    console.log(`Express Server listening on http://localhost:${config.port}`)
})
