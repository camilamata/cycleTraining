const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        requires: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: false
    },
    age: {
        type: Number,
        required: true
    },
    workoutPreference: {
        type: String,
        required: true
    }
       });

const userModel = mongoose.model("Users", userSchema);

module.exports = userModel;