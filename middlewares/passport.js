const dayjs = require('dayjs');
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const Usuario = require('../models/Usuario');

const options = {
    jwtFromRequest: ExtractJWT.fromHeader('x-token'),
    secretOrKey: process.env.SECRET_JWT_SEED,
};

const strategy = new JWTStrategy(options, (payload, done) => {
    Usuario.findById(payload.sub)
        .then(user => {
            if (!user)
                return done(null, false);
            if (user.password_last_change) {
                const lastChange = dayjs(user.password_last_change);
                if (lastChange.isValid() && lastChange.unix() > payload.iat)
                    return done(null, false);
            }
            return (done(null, user));
        })
        .catch(err => done(err, null));
});

module.exports = (passport) => {
    passport.use(strategy);
};