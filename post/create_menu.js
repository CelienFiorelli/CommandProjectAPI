
const mongoose = require('mongoose');
const Menu = require('../models/Menu');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const Burger = require('../models/Burger');
const Drink = require('../models/Drink');


module.exports = {
    endpoint: "/create/menu",
    upload: multer({ dest: 'uploads/' }).single('image'),
    process: async (req, res) => {
        if (!req.query.name || !req.query.price || !req.file.path || !req.query.id_burger || !req.query.id_drink) return;

        const burger = await Burger.findOne({_id: req.query.id_burger})
        if (!burger) return res.send({status: 404, message: "id_burger not found!"})
        const drink = await Drink.findOne({_id: req.query.id_drink})
        if (!drink) return res.send({status: 404, message: "id_drink not found!"})

        const menuId = new mongoose.Types.ObjectId();

        const tempPath = req.file.path;
        const ext = path.extname(req.file.originalname).toLowerCase()
        const targetPath = path.join(__dirname, `../images/menu/${menuId}${ext}`);

        fs.rename(tempPath, targetPath, err => {
            if (err) return handleError(err, res);
            fs.rm(tempPath, () => {});
        });

        res.send(
            await Menu.create({
                _id: menuId,
                name: req.query.name,
                price: new mongoose.Types.Decimal128(req.query.price),
                image: `/images/menu/${menuId}${ext}`,
                burger: burger,
                drink: drink,
            })
        )
    }
}