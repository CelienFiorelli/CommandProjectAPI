const { connectString } = require('./config.json');
const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');

const app = express();

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
});

const port = 5000

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
    mongoose.connect(connectString, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
            console.log("connect");
        })
        .catch((err) => {
            console.error(`Error\n${err}`);
        })
})

const commandFilesGet = fs.readdirSync('./get').filter(file => file.endsWith('.js'));
for (const file of commandFilesGet) {
    const endpoint = require(`./get/${file}`);
    app.get(endpoint.endpoint, endpoint.process)
}

const commandFilesPost = fs.readdirSync('./post').filter(file => file.endsWith('.js'));
for (const file of commandFilesPost) {
    const endpoint = require(`./post/${file}`);
    app.post(endpoint.endpoint, endpoint.process)
}

