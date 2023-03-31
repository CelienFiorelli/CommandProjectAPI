const Menu = require('../models/Menu');

module.exports = {
    endpoint: "/get/menus",
    process: async (req, res) => {
        res.send(await Menu.find());
    }
}