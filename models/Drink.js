const { Schema, model, Types } = require('mongoose');

module.exports = model('Drink', new Schema({
    name: {type: String, unique: true},
    price: Types.Decimal128,
    image: String,
}));