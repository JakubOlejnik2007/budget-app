const { verify } = require("jsonwebtoken");
const config = require("../config");

const generateToken = (user) => {
    const token = sign({
        name: user.name,
        email: user.email,
    }, config.authentication.secret, { expiresIn: config.authentication.expiresIn });
    return token;
};

module.exports = generateToken;