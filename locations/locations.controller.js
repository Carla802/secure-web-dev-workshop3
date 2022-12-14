// This file is used to map API calls (Presentation Layer) with the
// Business-Logic layer

const router = require('express').Router()
const passport = require("passport");

const locationsService=require("./locations.service")
const usersService = require("../users/users.service")

// Paths to the middleware functions
require('../authorization/authorization.middleware')
require('../auth/local.strategy')

/** Secured route for all locations */
router.get('/',
	passport.authenticate('jwt', { session: false }),
	async (req, res) => {
	return res.status(200).send({message: "Secure route", locations: await locationsService.findAll()})
})

/** Secured route for one location */
router.get('/:id',
	passport.authenticate('jwt', { session: false }),
	async (req, res) => {
	return res.status(200).send({message: "Secure route", location: await locationsService.findId(req.params.id)})
})

/** Secured route to create a new location */
router.post('/',
	passport.authenticate('jwt', { session: false }),
	async (req,res) => {
	return res.status(200).send({message: "Secure route : Location successfully created", location: await locationsService.create(req.body)})
 })

/** Secured route to edit an existing location */
router.put('/:id',
	passport.authenticate('jwt', { session: false }),
	async (req, res) => {
	return res.status(200).send({message: "Secure route: Location successfully modified", location: await locationsService.update(req.params.id, req.body)})
})

/** Secured route to delete an existing location */
router.delete('/:id',
	passport.authenticate('jwt', { session: false }),
	async (req, res) => {
	return res.status(200).send({message: "Secure route: Location successfully deleted", location: await locationsService.del(req.params.id)})
})

/** Secured route to log in with an existing user */
router.post('/login',
	passport.authenticate('local', { failureRedirect: '/login', session: false }),
	async (req, res) => {
		const jwt = await usersService.signJWT(req.user._id);
		res.status(200).send({ message: "Logged in successfully", token: jwt })
	})

module.exports = router
