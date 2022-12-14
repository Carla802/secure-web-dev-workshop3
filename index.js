require('dotenv').config()

const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require("body-parser")

// Controllers
const locationController = require('./locations/locations.controller')
const usersController = require('./users/users.controller')

const app = express()
const port = 3000

app.use(bodyParser.json())
app.use('/locations',locationController)
app.use('/users', usersController)

// Welcome route
app.get('/', (req, res) => {
	return res.status(200).send("HelloWord")
})

async function main(){
	await mongoose.connect(process.env.MONGO_URI);
	console.log("Connected to Mongo Database")
	app.listen(port,() => {
		console.log('API listening on port ' + port + ' , visit http://localhost:'+ port + '/')
	})
}

main();





