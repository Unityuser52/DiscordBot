const mongoose = require("mongoose");

const dataSchema = mongoose.Schema({
    name: String,
    userID: String,
    lb: String,
    money: Number,
    daily: Number,
    worked: Number,
    warnings: Number,
})

module.exports = mongoose.model("Data", dataSchema);