const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Coinlist = new Schema({
  name: { type: String },
  arr: { type: Array },
})

const coinlists = mongoose.model('coinlists', Coinlist, 'coinlists')
const cSchemas = { coinlists: coinlists }

module.exports = cSchemas
