const { Router } = require('express')
let router = Router();
const mySchemas = require('../models/Schemas')
const { get_beforedate, get_period_data} = require('../common/funcs')

const today = [2022, 5, 14]

// for ChartPage
router.get('/',  (req, res, next) => {
    const BITCOIN = mySchemas.BITCOIN
    BITCOIN.find({}).then((docs, err) => {
        const two_weeks_ago = get_beforedate(today[0], today[1], today[2], 14)
        const chartdata = {
            // normal close
            normal: get_period_data(
                two_weeks_ago[0],
                two_weeks_ago[1],
                two_weeks_ago[2],
                today[0],
                today[1],
                today[2],
                docs,
                'pd'
            ),
            //  predict close
            predict: get_period_data(
                two_weeks_ago[0],
                two_weeks_ago[1],
                two_weeks_ago[2],
                today[0],
                today[1],
                today[2],
                docs,
                'ch'
            ),
            date: get_period_data(
                two_weeks_ago[0],
                two_weeks_ago[1],
                two_weeks_ago[2],
                today[0],
                today[1],
                today[2],
                docs,
                'td'
            ),
        }
        res.send(JSON.stringify(chartdata))
    }).catch(err => console.log(err))
})

module.exports = router;