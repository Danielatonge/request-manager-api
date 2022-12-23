import app from '../../server'
import request from 'supertest'

describe('GET /', () => {
    it('should respond with html file', async () => {
        const res = await request(app).get('/')

        expect(res.status).toEqual(200)
    })
})
