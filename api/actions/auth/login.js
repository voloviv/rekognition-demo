const jwt = require('jsonwebtoken');

export default async function login(req, res, params) {

    // dummy data
    let payload = {
        username: 'admin',
        email: 'engineering@cycura.com',
        rbac: {}
    };

    // sign dummy JWT
    let token = jwt.sign(
        payload,
        process.env.JWT_SECRET_KEY,
        {expiresIn: process.env.JWT_EXPIRES_IN, algorithm: 'HS256'}
    );

    // set token in Cookie on response
    res.jwt(payload);

    return {
        ...payload,
        jwt: token
    };
}