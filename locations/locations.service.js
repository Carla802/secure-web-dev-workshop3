// This file holds the Business-Logic layer, interacting with Data Layer

const Location = require('./locations.model')

/** This function returns all the locations */
function findAll () {
	return Location.find()
}

/**
 * This function returns the details of one location and throws an error if the id is incorrect
 * @param id - id of the location requested
 */
async function findId(id) {
	const location = await Location.findById(id)
	if (!location) {
		throw new Error("Location not found")
	}
	return location
}

/**
 * This function creates a new location
 * @param body - content of the new location
 */
async function create(body) {
	//const location = new Location(body)
	//return await location.save()
	return Location.insertMany(body)
}

/**
 * This function modifies an existing location and returns the updated version
 * @param id - id of the location we want to update
 * @param body - new content
 */
async function update(id,body){
	await Location.findOneAndUpdate({_id: id},body)
	return Location.findById(id)
}

/**
 * This function deletes an existing location
 * @param id - id of the location we want to delete
 */
function del(id){
	return Location.deleteOne({_id: id})
}

module.exports = {findAll, findId, create, update, del}
