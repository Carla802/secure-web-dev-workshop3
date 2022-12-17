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
            _id:'FT152T3GSSGshu',
            filmName:'toto'
        }
        Location.findById.mockResolvedValue(mocklocation)
        expect(await locationsService.findId('FT152T3GSSGshu')).toEqual(mocklocation)
        expect(Location.findById).toHaveBeenCalledTimes(1)
    })
    it('Should get an error',async() =>{
        jest.resetAllMocks()
        Location.findById.mockResolvedValue(null)
        expect(async () => await locationsService.findId('FT152T3GSSGshu')).rejects.toThrow()
        expect(Location.findById).toHaveBeenCalledTimes(1)
    })
})

describe('Location Create',() => {
    it('Should get a location', async () => {
        const mocklocation= {
            _id:'FT152T3GSSGshu',filmName:'toto'
        }
        Location.insertMany.mockResolvedValue(mocklocation)
        const insertedLocation = await locationsService.create(mocklocation)
        expect(insertedLocation).toEqual(mocklocation);
        expect(Location.insertMany).toHaveBeenCalledTimes(1)
    })
})

describe('Location Update',() => {
    it('Should get a location', async () => {
        const mocklocation= {
            _id:'FT152T3GSSGshu',filmName:'toto'
        }
        Location.findOneAndUpdate.mockResolvedValue(mocklocation)
        Location.findById.mockResolvedValue(mocklocation)
        const updatedLocation = await locationsService.update(mocklocation._id)
        expect(updatedLocation).toEqual(mocklocation);
        expect(Location.findOneAndUpdate).toHaveBeenCalledTimes(1)
        expect(Location.findById).toHaveBeenCalledTimes(1)
    })
})

describe('Location Delete',() => {
    it('Should get a null', async () => {
        const mocklocation= {
            _id:'FT152T3GSSGshu',filmName:'toto'
        }
        Location.deleteOne.mockResolvedValue(null)
        const deletedLocation = await locationsService.del(mocklocation._id)
        expect(deletedLocation).toEqual(null);
        expect(Location.deleteOne).toHaveBeenCalledTimes(1)
    })
})