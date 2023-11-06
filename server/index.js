const express = require("express");
const config = require("./config");
const cors = require("cors");
require("./db/db_config");

const app = express();

const test = require("./db/helpers/register");
const register = require("./db/helpers/register");
const login = require("./db/helpers/login");

const { getBudgetsList, createBudget, deleteBudget } = require("./db/helpers/manage-budget");
const { addEntry, getEntry, getEntriesForWeek } = require("./db/helpers/entries");
const { getCategories } = require("./db/helpers/categories");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/find", test);
app.get("/categories", getCategories);
app.post("/register", register);
app.post("/login", login);

// Private routes (Remember to add auththentication middleware)

app.get("/budgets", getBudgetsList);
app.post("/budgets", createBudget);
app.delete("/budgets", deleteBudget);

app.post("/entries", addEntry);
app.get("/entries", getEntry);
app.get("/entries-weekly", getEntriesForWeek)
app.listen(config.express.port, () => {
    console.log(`Server running on port ${config.express.port}`);
});
