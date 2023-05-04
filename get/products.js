const Drink = require('../models/Drink');
const Menu = require('../models/Menu');
const Burger = require('../models/Burger');

module.exports = {
    endpoint: "/get/products",
    process: async (req, res) => {
        const products = {
            Boissons: await Drink.find(), 
            Burgers: await Burger.find(), 
            Menus: await Menu.find(), 
        }
        res.send(products);
    }
}