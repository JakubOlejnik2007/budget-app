const models = require("../models");
const bcrypt = require("bcrypt");
const generateToken = require("../../auth/generateToken");

const login = async (req, res) => {
    try {
        if (!req.body.email || !req.body.password) throw new Error("Provide more data!");

        const user = await models.User.findOne({ email: req.body.email });
        if (!user) {
            res.sendStatus(401);
            return;
        }
        console.log(user)
        if (!(await bcrypt.compare(req.body.password, user.password))) {
            res.sendStatus(401);
            return;
        }
        const token = generateToken(user);

        const { password, ...userToSend } = user;

        res.send({
            ...userToSend._doc,
            AuthToken: token
        });
    } catch (error) {
        console.log(error);
        res.sendStatus(422);
    }
};

module.exports = login;
