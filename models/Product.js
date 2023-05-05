const { Schema, model, Types } = require('mongoose');

module.exports = model('Product', new Schema({
    name: String,
    price: Types.Decimal128,
    image: String,
}));