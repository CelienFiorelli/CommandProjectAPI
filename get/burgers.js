const Burger = require('../models/Burger');

module.exports = {
    endpoint: "/get/burgers",
    process: async (req, res) => {
        res.send(await Burger.find().populate("product"));
    }
}