const express = require("express");
const config = require("./config");
const cors = require("cors");
require("./db/db_config")

const app = express();

const generateToken = require("./auth/generateToken");
const authenticateToken = require("./auth/generateToken");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.listen(config.express.port, () => {
    console.log(`Server running on port ${config.express.port}`);
})