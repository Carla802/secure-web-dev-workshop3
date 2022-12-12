// This file is used to map API calls (Presentation Layer) with the
// This file is used to map API calls (Presentation Layer) with the
// Business-Logic layer

const router = require('express').Router()
const locationsService=require("./locations.service")
const passport = require("passport");
const authorizationMiddleware = require("../authorization/authorization.middleware");

router.get('/locations', async (req, res) => {
	return res.status(200).send({locations: await locationsService.findAll()})
})

router.get('/locations/:id', async (req, res) => {
	return res.status(200).send({locations: await locationsService.findId(req.params.id)})
})

router.post('/locations', async (req,res) => {
	return res.status(200).send({locations: await locationsService.create(req.body)})
 })

router.put('/locations/:id', async (req, res) => {
	return res.status(200).send({locations: await locationsService.update(req.params.id)})
})

router.delete('/locations/:id', async (req, res) => {
	return res.status(200).send({locations: await locationsService.del(req.params.id)})
})

/*router.post('/login',
	passport.authenticate('local'), { session: false},
	authorizationMiddleware.canAccess(['admin', 'modo']),
	async function (req, res) => {
		return res.status(200).send(req.user)
	})*/

module.exports = router
