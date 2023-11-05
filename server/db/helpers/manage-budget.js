const models = require("../models");

const getBudgetsList = async (req, res) => {
    try {
        if (!req.query.memberid) throw new Error("Please provide a memberid!");
        const budgets = await models.Budget.find({ members: req.query.memberid });
        res.send(budgets);
    } catch (error) {
        console.log(error);
        res.sendStatus(422);
    }
};

const createBudget = async (req, res) => {
    try {
        if (!req.body.ownerid || !req.body.name) throw new Error("Please provide ownerid and name!");

        const budget = {
            owner: req.body.ownerid,
            name: req.body.name,
            created: Date.now(),
            members: [req.body.ownerid],
        };

        await models.Budget.create(budget);

        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(422);
    }
};

const checkIfUserIsOwnerOfBudget = async (budgetid, userid) => {
    const budget = await models.Budget.findById(budgetid);
    if (budget.owner != userid) return false;
    return true;
};

const deleteBudget = async (req, res) => {
    try {
        if (!req.query.budgetid) throw new Error("Please provide a budgetid!");
        if (!req.query.userid) throw new Error("Please provide a userid!");
        if (!(await checkIfUserIsOwnerOfBudget(req.query.budgetid, req.query.userid))) {
            res.sendStatus(403);
            return;
        }

        await models.Budget.findByIdAndDelete(req.query.budgetid);

        res.sendStatus(200);

    } catch (error) {
        console.log(error);
        res.sendStatus(422);
    }
};

module.exports = {
    getBudgetsList,
    createBudget,
    deleteBudget
};
