const config = require("../config");
const { verify } = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) {
        return res.sendStatus(401);
    }

    verify(token, config.authentication.secret, (err) => {
        if (err) {
            return res.sendStatus(403);
        }

        next();
    });
};

export default authenticateToken;