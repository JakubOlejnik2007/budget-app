const models = require("../models");

const checkIfUserIsMemberOfBudget = async (userid, budgetid) => {
    const budget = await models.Budget.findById(budgetid);

    if (budget && budget.members.includes(userid)) {
        return true;
    }

    return false;
};

const createNewRequest = async (req, res) => {
    try {
        if (!req.body.from || !req.body.to || !req.body.budgetid) throw new Error("Provide more data");
        if (!(await checkIfUserIsMemberOfBudget(req.body.from))) {
            res.sendStatus(403);
            return;
        }

        const userToInvite = await models.User.findOne({ email: req.body.to });

        if (!userToInvite) throw new Error("No user to invite!");

        if (await checkIfUserIsMemberOfBudget(userToInvite._id)) {
            res.sendStatus(400);
            return;
        }

        const newRequest = {
            from: req.body.from,
            to: req.body.to,
            budget: req.body.budgetid,
        };

        models.Request.create(newRequest);
    } catch (error) {
        console.log(error);
        res.sendStatus(422);
    }
};
