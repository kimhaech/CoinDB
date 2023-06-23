const { Router } = require('express')
let router = Router();
const mySchemas = require('../models/Schemas')
const { get_vol_gfs } = require('../common/funcs')

const today = [2022, 5, 14]

const CN = [
    'BITCOIN',
    'ADA',
    'ANKR',
    'DOGECOIN',
    'EOS',
    'ETC',
    'ETH',
    'IOTA',
    'POLYGON',
    'WAVES',
    'XRP',
    'ZILLIQA',
    'SOL',
]

async function getDbModel(modelName) {
    return mySchemas[modelName]
}
async function saveCoinlist(models, td, COINS) {
    for (model in models) {
        models[model].find({date: td}).then((docs, err) => {
            const temp = new COINS({
                today: td,
                name: model,
                arr: get_vol_gfs(docs, td),
            })
            COINS.deleteOne({name: model}).then(()=>console.log('del'))
            temp.save().then(()=>console.log('suc')).catch(err=>console.log(err))
        })
    }
}

router.get('/', async (req, res, next) => {
    let models = {}
    for (let i = 0; i < CN.length; i++) {
        const temp = await getDbModel(CN[i])
        models[CN[i]]= temp
    }
    const COINS = mySchemas.COIN

    let td = ''
    if (today[1] < 10) {
        td = today[0].toString().concat('-0', today[1].toString())
    } else {
        td = today[0].toString().concat('-', today[1].toString())
    }

    if (today[2] < 10) {
        td = td.concat('-0', today[2].toString())
    } else {
        td = td.concat('-', today[2].toString())
    }

    await saveCoinlist(models,td,COINS)

    // BITCOIN.find({date: td}, function (err, docs) {
    //     const temp = new COINS({
    //         today: td,
    //         name: 'BITCOIN',
    //         arr: get_vol_gfs(docs, td),
    //     })
    //     COINS.deleteOne({name: 'BITCOIN'}).then(() => {
    //         console.log('delete')
    //     })
    //     temp
    //         .save()
    //         .then(() => {
    //             console.log('코인 정보 저장 성공')
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })
    // })
    // ADA.find({date: td}, function (err, docs) {
    //     const temp = new COINS({
    //         today: td,
    //         name: 'ADA',
    //         arr: get_vol_gfs(docs, td),
    //     })
    //     COINS.deleteOne({name: 'ADA'}).then(() => {
    //         console.log('delete')
    //     })
    //
    //     temp
    //         .save()
    //         .then(() => {
    //             console.log('코인 정보 저장 성공')
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })
    // })
    // ANKR.find({date: td}, function (err, docs) {
    //     const temp = new COINS({
    //         today: td,
    //         name: 'ANKR',
    //         arr: get_vol_gfs(docs, td),
    //     })
    //     COINS.deleteOne({name: 'ANKR'}).then(() => {
    //         console.log('delete')
    //     })
    //
    //     temp
    //         .save()
    //         .then(() => {
    //             console.log('코인 정보 저장 성공')
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })
    // })
    // DOGECOIN.find({date: td}, function (err, docs) {
    //     const temp = new COINS({
    //         today: td,
    //         name: 'DOGECOIN',
    //         arr: get_vol_gfs(docs, td),
    //     })
    //
    //     COINS.deleteOne({name: 'DOGECOIN'}).then(() => {
    //         console.log('delete')
    //     })
    //
    //     temp
    //         .save()
    //         .then(() => {
    //             console.log('코인 정보 저장 성공')
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })
    // })
    // EOS.find({date: td}, function (err, docs) {
    //     const temp = new COINS({
    //         today: td,
    //         name: 'EOS',
    //         arr: get_vol_gfs(docs, td),
    //     })
    //     COINS.deleteOne({name: 'EOS'}).then(() => {
    //         console.log('delete')
    //     })
    //
    //     temp
    //         .save()
    //         .then(() => {
    //             console.log('코인 정보 저장 성공')
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })
    // })
    // ETC.find({date: td}, function (err, docs) {
    //     const temp = new COINS({
    //         today: td,
    //         name: 'ETC',
    //         arr: get_vol_gfs(docs, td),
    //     })
    //
    //     COINS.deleteOne({name: 'ETC'}).then(() => {
    //         console.log('delete')
    //     })
    //
    //     temp
    //         .save()
    //         .then(() => {
    //             console.log('코인 정보 저장 성공')
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })
    // })
    // ETH.find({date: td}, function (err, docs) {
    //     const temp = new COINS({
    //         today: td,
    //         name: 'ETH',
    //         arr: get_vol_gfs(docs, td),
    //     })
    //
    //     COINS.deleteOne({name: 'ETH'}).then(() => {
    //         console.log('delete')
    //     })
    //
    //     temp
    //         .save()
    //         .then(() => {
    //             console.log('코인 정보 저장 성공')
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })
    // })
    // IOTA.find({date: td}, function (err, docs) {
    //     const temp = new COINS({
    //         today: td,
    //         name: 'IOTA',
    //         arr: get_vol_gfs(docs, td),
    //     })
    //
    //     COINS.deleteOne({name: 'IOTA'}).then(() => {
    //         console.log('delete')
    //     })
    //
    //     temp
    //         .save()
    //         .then(() => {
    //             console.log('코인 정보 저장 성공')
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })
    // })
    // POLYGON.find({date: td}, function (err, docs) {
    //     const temp = new COINS({
    //         today: td,
    //         name: 'POLYGON',
    //         arr: get_vol_gfs(docs, td),
    //     })
    //
    //     COINS.deleteOne({name: 'POLYGON'}).then(() => {
    //         console.log('delete')
    //     })
    //
    //     temp
    //         .save()
    //         .then(() => {
    //             console.log('코인 정보 저장 성공')
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })
    // })
    // WAVES.find({date: td}, function (err, docs) {
    //     const temp = new COINS({
    //         today: td,
    //         name: 'WAVES',
    //         arr: get_vol_gfs(docs, td),
    //     })
    //
    //     COINS.deleteOne({name: 'WAVES'}).then(() => {
    //         console.log('delete')
    //     })
    //
    //     temp
    //         .save()
    //         .then(() => {
    //             console.log('코인 정보 저장 성공')
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })
    // })
    // XRP.find({date: td}, function (err, docs) {
    //     const temp = new COINS({
    //         today: td,
    //         name: 'XRP',
    //         arr: get_vol_gfs(docs, td),
    //     })
    //
    //     COINS.deleteOne({name: 'XRP'}).then(() => {
    //         console.log('delete')
    //     })
    //
    //     temp
    //         .save()
    //         .then(() => {
    //             console.log('코인 정보 저장 성공')
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })
    // })
    // ZILLIQA.find({date: td}, function (err, docs) {
    //     const temp = new COINS({
    //         today: td,
    //         name: 'ZILLIQA',
    //         arr: get_vol_gfs(docs, td),
    //     })
    //
    //     COINS.deleteOne({name: 'ZILLIQA'}).then(() => {
    //         console.log('delete')
    //     })
    //
    //     temp
    //         .save()
    //         .then(() => {
    //             console.log('코인 정보 저장 성공')
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })
    // })
    // SOL.find({date: td}, function (err, docs) {
    //     const temp = new COINS({
    //         today: td,
    //         name: 'SOL',
    //         arr: get_vol_gfs(docs, td),
    //     })
    //
    //     COINS.deleteOne({name: 'SOL'}).then(() => {
    //         console.log('delete')
    //     })
    //
    //     temp
    //         .save()
    //         .then(() => {
    //             console.log('코인 정보 저장 성공')
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })
    // })
    //
    COINS.find({}).then((docs, err) => {
        let temp = {}
        for (let i = 0; i < docs.length; i++) {
            let k = docs[i].toObject().name
            let v = docs[i].toObject().arr
            temp[k] = v
        }
        res.send(temp)
    }).catch(err => console.log(err))
})

module.exports = router;