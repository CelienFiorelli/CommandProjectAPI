
const mongoose = require('mongoose');
const Drink = require('../models/Drink');
const path = require('path');
const fs = require('fs');
const multer = require('multer');


module.exports = {
    endpoint: "/create/drink",
    upload: multer({ dest: 'uploads/' }).single('image'),
    process: async (req, res) => {
        if (!req.query.name || !req.query.price || !req.file.path) return

        const drinkId = new mongoose.Types.ObjectId();

        const tempPath = req.file.path;
        const ext = path.extname(req.file.originalname).toLowerCase()
        const targetPath = path.join(__dirname, `../images/drink/${drinkId}${ext}`);

        fs.rename(tempPath, targetPath, err => {
            if (err) return handleError(err, res);
            fs.rm(tempPath, () => {});
        });
    
        res.send(
            await Drink.create({
                _id: drinkId,
                name: req.query.name,
                price: new mongoose.Types.Decimal128(req.query.price),
                image: `/images/drink/${drinkId}${ext}`,
            })
        )
    }
}