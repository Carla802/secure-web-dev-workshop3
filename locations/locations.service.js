// This file holds the Business-Logic layer, interacting with Data Layer

const Location = require('./locations.model')

function findAll () {
	return Location.find()
}
function findId(id){
	return Location.findById(id)
}

function create(body){
	return Location.insertMany(body)
}

function update(id,body){
	return Location.findOneAndUpdate({_id: id},body)
}

function del(id){
	return Location.deleteOne({_id: id})
}

module.exports.findAll = findAll
module.exports.findId = findId
module.exports.create = create
module.exports.update = update
module.exports.del = del
