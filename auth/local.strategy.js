const LocalStrategy = require('passport-local')
const passport = require('passport')
const usersService = require('../users/users.service')

/**
 * This middleware checks if the user currently logging in is already in the database, and if his password is correct
 */
passport.use("local", new LocalStrategy( {
        usernameField: 'username',
        passwordField: 'password',
    },
    async function(username, password, done) {
        try{
            const user = await usersService.checkPassword(username, password)
            if (!user) {
                return done(null, false);
            }
            return done(null, user);
        } catch (err) {
            if (err) { return done(err); }
        }
    }
));

