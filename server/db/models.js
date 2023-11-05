const mongoose = require("mongoose");

const User = mongoose.model(
    "User",
    new mongoose.Schema({
        firstName: String,
        lastName: String,
        email: String,
        password: String,
    })
);

const Category = mongoose.model(
    "Category",
    new mongoose.Schema({
        name: String,
    })
);

const Entry = mongoose.model(
    "Entry",
    new mongoose.Schema({
        isIncome: Boolean,
        category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
        value: Number,
        who: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        date: { type: Date, default: Date.now },
        budget: { type: mongoose.Schema.Types.ObjectId, ref: "Budget" }
    })
);

const Request = mongoose.model(
    "Request",
    new mongoose.Schema({
        from: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        to: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        budget: { type: mongoose.Schema.Types.ObjectId, ref: "Budget" },
    })
);

const Budget = mongoose.model(
    "Budget",
    new mongoose.Schema({
        name: String,
        owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        created: { type: Date, default: Date.now },
        members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    })
);

module.exports = {
    User,
    Category,
    Entry,
    Budget,
    Request,
};
