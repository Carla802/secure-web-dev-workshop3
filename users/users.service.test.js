const usersService = require('./users.service')
const User = require('./users.model')

jest.mock('./users.model')

describe('User FindAll', () => {
    it('Should call model find', async () => {
        User.find.mockResolvedValue([1, 2, 3, 4])
        expect(await usersService.findAll()).toEqual([1, 2, 3, 4])
        expect(User.find).toHaveBeenCalledTimes(1)
    })
})




