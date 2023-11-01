const express = require("express");
const config = require("./config");
const cors = require("cors");
require("./db/db_config")

const app = express();

const test = require("./db/helpers/register")
const register = require("./db/helpers/register")
const generateToken = require("./auth/generateToken");
const authenticateToken = require("./auth/generateToken");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/find", test)

app.post("/register", register)

app.listen(config.express.port, () => {
    console.log(`Server running on port ${config.express.port}`);
})