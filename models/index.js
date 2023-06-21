const mongoose = require('mongoose')
require('dotenv/config')

// DB Connection
mongoose
    .connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('DB Connected!')
    })
    .catch((err) => {
        console.log(err)
    })

'use strict';

class ModelManager {
    constructor() {
        this.mongoose = mongoose;
    }

    get coinlist() {
        return require('./CoinList');
    }

    get Schemas() {
        return require('./Schemas');
    }
}

module.exports = ModelManager;

