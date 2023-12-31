const models = require("../models");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
    try {
        if ((!req.body.firstName, !req.body.lastName, !req.body.email, !req.body.password))
            throw new Error("Provide more data!");

        const user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: await bcrypt.hash(req.body.password, 10),
        };

        console.log(await models.User.findOne({ email: user.email }), await checkIfEmailAlreadyExists(user.email));
        if (await checkIfEmailAlreadyExists(user.email)) {
            res.sendStatus(409);
            return;
        }

        const newUser = await models.User.create(user);

        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(422);
    }
};

const checkIfEmailAlreadyExists = async (emailToCheck) => {
    try {
        const response = await models.User.findOne({ email: emailToCheck });

        console.log(response);

        if (response) {
            return true;
        } else {
            return false;
        }
    } catch {
        throw new Error("Email already exists");
    }
};

module.exports = register;
