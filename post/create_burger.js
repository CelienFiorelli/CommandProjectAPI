
const mongoose = require('mongoose');
const Burger = require('../models/Burger');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const Product = require('../models/Product');


module.exports = {
    endpoint: "/create/burger",
    upload: multer({ dest: 'uploads/' }).single('image'),
    process: async (req, res) => {
        if (!req.query.name || !req.query.price || !req.file.path) return;

        const productId = new mongoose.Types.ObjectId();

        const tempPath = req.file.path;
        const ext = path.extname(req.file.originalname).toLowerCase()
        const targetPath = path.join(__dirname, `../images/burger/${productId}${ext}`);

        fs.rename(tempPath, targetPath, err => {
            if (err) return handleError(err, res);
            fs.rm(tempPath, () => {});
        });

        const product = await Product.create({
            _id: productId,
            name: req.query.name,
            price: new mongoose.Types.Decimal128(req.query.price),
            image: `/images/burger/${productId}${ext}`,
        })
        if (!product) return res.send({message: "error", status: 404})
        
        const burger = await (await Burger.create({
            product: product
        })).populate("product")
        res.send(burger)
    }
}