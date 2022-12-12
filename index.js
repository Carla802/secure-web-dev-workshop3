const express = require('express')
const locationController = require('./locations/locations.controller')
const usersController = require('./users/users.controller')
const mongoose = require('mongoose')
require('dotenv').config()
const app = express()
const port = 3000
const localStrategy = require('./auth/local.strategy')

const bodyParser = require("body-parser")

app.use(bodyParser.json())
app.use(locationController)
app.use('/users', usersController)

app.get('/', (req, res) => {
	return res.status(200).send("HelloWord")
})

async function main(){
	await mongoose.connect(process.env.MONGO_URI);
	console.log("Connected to Mongo Database")
	app.listen(port,() => {
		console.log('API listening on port ${port}, visit http://localhost:${port}/')
	})
}

main();





