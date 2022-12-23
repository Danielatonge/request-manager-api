import * as user from '../user.controller'

describe('user controller', () => {
    it('should create a new user', async () => {
        const req = { body: { username: 'john', password: 'password' } }
        const res = {
            json: ({ token }) => {
                expect(token).toBeTruthy()
            },
        }

        const newUser = await user.createNewUser(req, res, () => {})
    })
})
