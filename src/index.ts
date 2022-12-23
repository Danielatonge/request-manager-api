import app from './server'
import dotenv from 'dotenv'
import Logger from './utils/logger'

const logger = Logger.getInstance('main application')

dotenv.config()
process.on('uncaughtException', (err) => {
    logger.error('Application exited unexpectedly...', { extra: err.message })
})
process.on('unhandledRejection', () => {
    logger.error('Unhandled rejection!')
})

const port = process.env.PORT

app.listen(port, () => {
    console.log(`Express Server listening on http://localhost:${port}`)
})
