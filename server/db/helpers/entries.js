const models = require("../models");

const checkIfUserIsMemberOfBudget = async (userid, budgetid) => {
    const budget = await models.Budget.findById(budgetid);

    if (budget && budget.members.includes(userid)) {
        return true;
    }

    return false;
};

const addEntry = async (req, res) => {
    try {
        if (!req.body.userid || !req.body.categoryid || !req.body.description || !req.body.value || !req.body.budgetid)
            throw new Error("Provide more data!");

        const entry = {
            description: req.body.description,
            category: req.body.categoryid,
            value: req.body.value,
            who: req.body.userid,
            date: Date.now(),
            budget: req.body.budgetid,
        };

        if (!(await checkIfUserIsMemberOfBudget(req.body.userid, req.body.budgetid))) {
            res.sendStatus(403);
            return;
        }

        await models.Entry.create(entry);
        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(422);
        console.log(error);
    }
};

const getEntry = async (req, res) => {
    try {
        if (!req.query.budgetid) throw new Error("Please provide an budgetid!");
        const entries = await models.Entry.find({ budget: req.query.budgetid })
            .populate('category', 'name isIncome')
            .populate('who', 'firstName lastName');
        res.send(entries);
    } catch (error) {
        res.sendStatus(422);
    }
};

module.exports = {
    addEntry,
    getEntry,
};
