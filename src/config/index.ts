import merge from 'lodash.merge'
import { env } from 'process'

process.env.NODE_ENV = process.env.NODE_ENV || 'development'
const environment = process.env.NODE_ENV

let envConfig

if (environment === 'production') {
    envConfig = require('./production').default
} else if (environment === 'staging') {
    envConfig = require('./staging').default
} else {
    envConfig = require('./development').default
}

export default merge(
    {
        env: process.env.NODE_ENV,
        port: 8080,
        jwt_secret: process.env.JWT_SECRET,
        database_url: process.env.DATABASE_URL,
    },
    envConfig
)
