
const mongoose = require('mongoose');
const Menu = require('../models/Menu');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const Burger = require('../models/Burger');
const Drink = require('../models/Drink');
const Product = require('../models/Product');


module.exports = {
    endpoint: "/create/menu",
    upload: multer({ dest: 'uploads/' }).single('image'),
    process: async (req, res) => {
        if (!req.query.name || !req.query.price || !req.file.path || !req.query.id_burger || !req.query.id_drink) return;

        const burger = await Burger.findOne({_id: req.query.id_burger})
        if (!burger) return res.send({status: 404, message: "id_burger not found!"})
        const drink = await Drink.findOne({_id: req.query.id_drink})
        if (!drink) return res.send({status: 404, message: "id_drink not found!"})

        const productId = new mongoose.Types.ObjectId();

        const tempPath = req.file.path;
        const ext = path.extname(req.file.originalname).toLowerCase()
        const targetPath = path.join(__dirname, `../images/menu/${productId}${ext}`);

        fs.rename(tempPath, targetPath, err => {
            if (err) return handleError(err, res);
            fs.rm(tempPath, () => {});
        });

        const product = await Product.create({
            _id: productId,
            name: req.query.name,
            price: new mongoose.Types.Decimal128(req.query.price),
            image: `/images/menu/${productId}${ext}`,
        })
        if (!product) return res.send({message: "error", status: 404})
        
        const menu = await (await Menu.create({
            product: product,
            burger: burger,
            drink: drink,
        })).populate("product")
        res.send(menu)
    }
}