const Drink = require('../models/Drink');
const Menu = require('../models/Menu');
const Burger = require('../models/Burger');

module.exports = {
    endpoint: "/get/products",
    process: async (req, res) => {
        const products = {
            Boissons: await Drink.find().populate("product"), 
            Burgers: await Burger.find().populate("product"), 
            Menus: await Menu.find().populate("product"), 
        }
        res.send(products);
    }
}