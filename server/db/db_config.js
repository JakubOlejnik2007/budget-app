import mongoose from "mongoose";
import config from "../config";

const url = `mongodb://${config.MongoDB.host}:${config.MongoDB.port}/${config.MongoDB.name}`;

mongoose.connect(url);