const passport = require("passport");

const getUserInfo = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err || !user)
            return res.status(401).json({ ok: false, msg: 'Unauthorized' });
        res.setHeader('user', user._id);
        if (user.laboratorio)
            res.setHeader('lab', user.laboratorio._id);
        next();
    })(req, res);
};

module.exports = {
    getUserInfo,
}