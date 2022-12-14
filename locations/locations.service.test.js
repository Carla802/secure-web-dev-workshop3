const locationsService = require('./locations.service')
const Location = require('./locations.model')

jest.mock('./locations.model')

describe('Locations FindAll', () => {
    it('Should call model find', async () => {
        Location.find.mockResolvedValue([1, 2, 3, 4])
        expect(await locationsService.findAll()).toEqual([1, 2, 3, 4])
        expect(Location.find).toHaveBeenCalledTimes(1)
    })
})

describe('Location FindId',() =>{
    it('Should get a location',async () => {
        const mocklocation= {
            _id:'FT152T3GSSGshu',filmName:'le nueve de madrid'
        }
        Location.findById.mockResolvedValue(mocklocation)
        expect(await locationsService.findId('FT152T3GSSGshu')).toEqual(mocklocation)
        expect(Location.findById).toHaveBeenCalledTimes(1)
    })
    it('Should get a location',async() =>{
        jest.resetAllMocks()
        const mockLocation = null
        Location.findById.mockResolvedValue(mocklocation)

        expect(async () => await locationsService.findOne('FT152T3GSSGshu')).rejects.toThrow()
        expect(Location.findById).toHaveBeenCalledTimes(1)
    })
})