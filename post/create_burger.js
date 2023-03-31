
const mongoose = require('mongoose');
const Burger = require('../models/Burger');


module.exports = {
    endpoint: "/create/burger",
    process: async (req, res) => {
        if (!req.query.name || !req.query.price) return
    
        res.send(
            await Burger.create({
                name: req.query.name,
                price: new mongoose.Types.Decimal128(req.query.price)
            })
        )
    }
}