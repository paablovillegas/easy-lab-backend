const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const Usuario = require('../models/Usuario');

const options = {
    jwtFromRequest: ExtractJWT.fromHeader('x-token'),
    secretOrKey: process.env.SECRET_JWT_SEED,
};

const strategy = new JWTStrategy(options, (payload, done) => {
    Usuario.findById(payload.uid)
        .then(user => user ? done(null, user) : done(null, false))
        .catch(err => done(err, null));
});

module.exports = (passport) => {
    passport.use(strategy);
};