const mongoose = require("mongoose")
const config = require("../config")

const url = `mongodb://${config.MongoDB.host}:${config.MongoDB.port}/${config.MongoDB.name}`;
console.log(url)
mongoose.connect(url);