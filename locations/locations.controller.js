// This file is used to map API calls (Presentation Layer) with the
// This file is used to map API calls (Presentation Layer) with the
// Business-Logic layer

const router = require('express').Router()
const locationsService=require("./locations.service")

router.get('/locations', async (req, res) => {
	return res.status(200).send({locations: await locationsService.findAll()})
})



//app.listen(3000, () => {    console.log("Serveur à l'écoute")})

module.exports = router
