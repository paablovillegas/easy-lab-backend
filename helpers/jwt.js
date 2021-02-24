const jwt = require('jsonwebtoken');

const generateJWT = ({ _id, name, roles }) => {
    return new Promise((resolve, reject) => {
        const payload = { uid: _id, name, roles };
        jwt.sign(
            payload,
            process.env.SECRET_JWT_SEED,
            {
                expiresIn: '2h'
            },
            (err, token) => {
                if (err) {
                    console.log(err);
                    reject('Error al generar el token');
                }
                resolve(token);
            }
        );
    });
};

const generateJWTChangePassword = (email) => {
    return new Promise((resolve, reject) => {
        const payload = { email };
        jwt.sign(
            payload,
            process.env.SECRET_JWT_CHANGE_PASSWORD_SEED,
            {
                expiresIn: '30m',
            },
            (err, token) => {
                if (err) {
                    console.log(err);
                    reject('Error al generar el token');
                }
                resolve(token);
            }
        );
    });
};

module.exports = { generateJWT, generateJWTChangePassword };