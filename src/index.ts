import app from './server'
import dotenv from 'dotenv'

dotenv.config()

const port = process.env.PORT

app.listen(port, () => {
    console.log(`Express Server listening on http://localhost:${port}`)
})
