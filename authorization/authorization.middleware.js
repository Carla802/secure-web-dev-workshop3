const JWTstrategy = require('passport-jwt').Strategy;
const passport = require('passport')
const ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use(
    new JWTstrategy(
        {
            secretOrKey: process.env.SECRET_JWT,
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
        },
        async (token, done) => {
            try {
                console.log(token)
                return done(null, token.sub);
            } catch (error) {
                done(error);
            }
        }
    )
);
