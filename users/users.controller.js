const router = require('express').Router()
const usersService = require('./users.service')
const passport = require('passport')
const middleware = require('../authorization/authorization.middleware')

/** Route to register as a new user */
router.post('/register',
    async (req, res) => {
    const user = await usersService.register(req.body?.username, req.body?.password, req.body?.role)
    if (!user) {
        res.status(403).send({message: 'User already exists'})
    }
    else {
        res.status(200).send({message: 'Registered successfully', user: user})
    }
})

/** Secured route to log in with an existing user */
router.post('/login',
    passport.authenticate('local', { failureRedirect: '/login', session: false }),
    async (req, res) => {
        const jwt = await usersService.signJWT(req.user._id, req.user.role);
        res.status(200).send({ message: "Logged in successfully", token: jwt })
})

/** Secured route to access one user (only for admins) */
router.get('/me',
    passport.authenticate('jwt', { session: false }),
    middleware.roleMiddleware(["admin"]),
    async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    return res.status(200).send({message: "Secure route", user: await usersService.findOne(token), token: token})
})

/** Secured route to edit an existing user (only for admins) */
router.put('/me',
    passport.authenticate('jwt', { session: false }),
    middleware.roleMiddleware(["admin"]),
    async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    return res.status(200).send({message : "Secure route : User successfully modified", user: await usersService.update(token,req.body)})
})

/** Secured route to delete an existing user (only for admins) */
router.delete('/me',
    passport.authenticate('jwt', { session: false }),
    middleware.roleMiddleware(["admin"]),
    async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    return res.status(200).send({message: "Secure route : User successfully deleted", user: await usersService.del(token)})
})

/** Route for all users */
router.get('/', async (req, res) => {
    return res.status(200).send({user: await usersService.findAll()})
})

module.exports = router