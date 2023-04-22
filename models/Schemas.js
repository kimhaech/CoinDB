const mongoose = require('mongoose')
const Schema = mongoose.Schema

const coinSchema = new Schema({
  Greed_Fear_Score: { type: Number },
  date: { type: String },
  close: { type: Number },
  predict_close: { type: Number },
  vol: { type: Number },
  predict_date: { type: String },
  percent: { type: Number },
})

const BITCOIN = mongoose.model('BITCOIN_costs', coinSchema, 'BITCOIN_costs')
const ADA = mongoose.model('ADA_costs', coinSchema, 'ADA_costs')
const ANKR = mongoose.model('ANKR_costs', coinSchema, 'ANKR_costs')
const DOGECOIN = mongoose.model('DOGECOIN_costs', coinSchema, 'DOGECOIN_costs')
const EOS = mongoose.model('EOS_costs', coinSchema, 'EOS_costs')
const ETC = mongoose.model('ETC_costs', coinSchema, 'ETC_costs')
const ETH = mongoose.model('ETH_costs', coinSchema, 'ETH_costs')
const IOTA = mongoose.model('IOTA_costs', coinSchema, 'IOTA_costs')
const POLYGON = mongoose.model('POLYGON_costs', coinSchema, 'POLYGON_costs')
const SOL = mongoose.model('SOL_costs', coinSchema, 'SOL_costs')
const WAVES = mongoose.model('WAVES_costs', coinSchema, 'WAVES_costs')
const XRP = mongoose.model('XRP_costs', coinSchema, 'XRP_costs')
const ZILLIQA = mongoose.model('ZILLIQA_costs', coinSchema, 'ZILLIQA_costs')

const Coinlist = new Schema({
  today: { type: String },
  name: { type: String },
  arr: { type: Array },
})

const COIN = mongoose.model('coinlists', Coinlist, 'coinlists')

const mySchemas = {
  BITCOIN: BITCOIN,
  ADA: ADA,
  ANKR: ANKR,
  DOGECOIN: DOGECOIN,
  EOS: EOS,
  ETC: ETC,
  ETH: ETH,
  IOTA: IOTA,
  POLYGON: POLYGON,
  SOL: SOL,
  WAVES: WAVES,
  XRP: XRP,
  ZILLIQA: ZILLIQA,
  COIN: COIN,
}

module.exports = mySchemas
