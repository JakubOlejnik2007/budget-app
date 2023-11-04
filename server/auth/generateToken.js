const { sign } = require("jsonwebtoken");
const config = require("../config");

const generateToken = (user) => {
    const token = sign({
        email: user.email,
    }, config.authentication.secret, { expiresIn: config.authentication.expiresIn });
    return token;
};

module.exports = generateToken;