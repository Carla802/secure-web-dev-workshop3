const JWTstrategy = require('passport-jwt').Strategy;
const passport = require('passport')
const ExtractJWT = require('passport-jwt').ExtractJwt;
const usersService = require('../users/users.service')

/**
 * This middleware checks if the JWT in the request is correct and was created with the secret key
 */
passport.use(
    new JWTstrategy(
        {
            secretOrKey: process.env.SECRET_JWT,
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
        },
        async (token, done) => {
            try {
                return done(null, token);
            } catch (error) {
                done(error);
            }
        }
    )
);

/**
 * This middleware checks if a user is given and if its role is in the allowedRoles array
 * @param allowedRoles - array of roles allowed to access this route
 */
const roleMiddleware = (allowedRoles= [] ) => (req, res, next)=>{
    if(!allowedRoles || allowedRoles.length == 0){
        return next()
    }
    if(!req.user){
        return res.status(403).send()
    }
    if(!req.user.role || !allowedRoles.includes(req.user.role)){
        return res.status(403).send()
    }
    return next()
}

module.exports = { roleMiddleware }


