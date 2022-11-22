const express = require('express')
const locationController = require('./locations/locations.controller')
const app = express()
const port = 3000


app.use(locationController)

app.listen(port, async () => {
	console.log(`API listening on port ${port}, visit http://localhost:${port}/`)
	require("dotenv").config()
	const mongoose = require("mongoose")
	await mongoose.connect(process.env.MONGO_URI)
})

app.get('/HelloWord', (req, res) => {
	return res.status(200).send("HelloWord")
})
