const { Schema, model, Types } = require('mongoose');

module.exports = model('Order', new Schema({
    payment: { type: Schema.Types.ObjectId, ref: 'Payment', required: true },
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    finish: {type: Boolean, default: false},
}));