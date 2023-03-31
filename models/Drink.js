const { Schema, model, Types } = require('mongoose');

module.exports = model('Drink', new Schema({
    name: String,
    price: Types.Decimal128,
}));