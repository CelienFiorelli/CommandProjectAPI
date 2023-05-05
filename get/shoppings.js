const ShoppingCart = require('../models/ShoppingCart');
const Token = require('../models/Token');
const { tokenIsValid } = require('../utils/tokenHandler');

module.exports = {
    endpoint: "/shoppings/get",
    process: async (req, res) => {
        if (!req.query.token || !(await tokenIsValid(req.query.token))) return res.send({ status: 403});

        const user = (await Token.findOne({ token: req.query.token }).populate("user")).user;

        const items = (await ShoppingCart.find({user: user}).populate("product")).map(i => {return {product: i.product, quantity: i.quantity}});
        res.send({status: 200, data: items});
    }
}