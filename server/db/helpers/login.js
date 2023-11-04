const models = require("../models");
const bcrypt = require("bcrypt");
const generateToken = require("../../auth/generateToken");

const login = async (req, res) => {
    try {
        if (!req.body.email || !req.body.password) throw new Error("Provide more data!");

        const email = req.body.email;
        const password = req.body.password;

        const user = await models.User.findOne({ email: email });
        if (!user) throw new Error("User not found!");

        if (!(await bcrypt.compare(password, user.password))) {
            res.sendStatus(401);
        }
        const token = generateToken(user);
        res.send(token);
    } catch (error) {
        console.log(error);
        res.sendStatus(422);
    }
};

module.exports = login;
