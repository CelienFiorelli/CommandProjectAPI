const Product = require("../models/Product");
const ShoppingCart = require("../models/ShoppingCart");
const Token = require("../models/Token");
const User = require("../models/User");
const { tokenIsValid } = require("../utils/tokenHandler");

module.exports = {
    endpoint: "/shopping/update",
    process: async (req, res) => {
        if (!req.query.token || !req.query.number || !req.query.id_product || !(await tokenIsValid(req.query.token))) return res.send({ status: 404});
        
        const number = parseInt(req.query.number);
        if (!number) return res.send({ status: 404})

        const product = await Product.findOne({_id: req.query.id_product})
        if (!product) return res.send({ status: 404})

        const user = (await Token.findOne({ token: req.query.token }).populate("user")).user;
        const shoppingItem = await ShoppingCart.findOneAndUpdate({ user: user, product: product }, {$inc: { quantity: number}}, {upsert: true, new: true})
        if (shoppingItem.quantity <= 0) {
            await ShoppingCart.deleteOne({ _id: shoppingItem._id});
        }
        
        const items = (await ShoppingCart.find({user: user}).populate("product")).map(i => {return {product: i.product, quantity: i.quantity}});
        res.send({ status: 200, items: items })
    }
}