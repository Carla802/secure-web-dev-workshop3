const LocalStrategy = require('passport-local')
const passport = require('passport')
const usersService = require('../users/users.service')

passport.use("login", new LocalStrategy( {
        usernameField: 'username',
        passwordField: 'password',
    },
    async function(username, password, done) {
        try{
            const user = await usersService.checkPassword(username, password)
            if (!user) { return done(null, false); }
            return done(null, user);
        } catch (err) {
            if (err) { return done(err); }
        }
    }
));

