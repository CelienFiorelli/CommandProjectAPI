const Drink = require('../models/Drink');

module.exports = {
    endpoint: "/get/drinks",
    process: async (req, res) => {
        res.send(await Drink.find());
    }
}