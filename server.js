const express = require('express')
const app = express()
require('dotenv/config')
const spdRouter = require('./routes/speedometer')
const chartRouter = require('./routes/chart')
const rankRouter = require('./routes/rank')
const mongoose = require("mongoose");

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

app.use('/spd', spdRouter)
// app.use('/chart', chartRouter)
// app.use('/rank', rankRouter)
//
app.use(function(req, res, next) {
    if(req.url === '/' || req.uri === '/') {
        res.send('OK');
    }
    console.log(req.url);
});

app.listen(3333, () => {
    console.log('Server is running on 3333')
})
