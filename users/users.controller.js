const router = require('express').Router()
const usersService = require('./users.service')
const passport = require('passport')
const authorizationMiddleware = require('../authorization/authorization.middleware')
const locationsService = require("../locations/locations.service");

router.post('/register', async (req, res) => {
    const user = await usersService.register(req.body?.username,
        req.body?.password)
    res.status(200).send(user)
})

router.post('/login', passport.authenticate('local'), async (req, res) => {
    res.status(200).send(await usersService.checkPassword(req.body?.username, req.body?.password))
})

router.get('/me', async (req, res) => {

})

router.put('/me', async (req, res) => {

})

router.delete('/me', async (req, res) => {

})

router.get('/', async (req, res) => {

})


module.exports = router