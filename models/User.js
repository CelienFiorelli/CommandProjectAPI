const { Schema, model } = require('mongoose');

module.exports = model('User', new Schema({
    email: {type: String, unique: true},
    password: String,
    firstname: String,
    lastname: String,
    fidelity: {type: Number, default: 0},
    role: { type: String, required: true, default: "user" }
}));