const { Schema, model, Types } = require('mongoose');

module.exports = model('Drink', new Schema({
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
}));