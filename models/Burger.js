const { Schema, model, Types } = require('mongoose');

module.exports = model('Burger', new Schema({
    name: String,
    price: Types.Decimal128,
}));