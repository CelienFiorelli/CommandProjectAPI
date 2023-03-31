const { Schema, model, Types } = require('mongoose');

module.exports = model('User', new Schema({
    email: String,
    password: String,
}));