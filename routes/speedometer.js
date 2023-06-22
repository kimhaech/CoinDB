const { Router } = require('express')
let router = Router();
const mySchemas = require('../models/Schemas')
const { get_beforedate, get_period_data} = require('../common/funcs')

const today = [2022, 5, 14]

// for speedometer
router.get('/', (req, res, next) => {
    const CostSchema = mySchemas.BITCOIN;
    CostSchema.find({}).then((docs, err) => {
        const a_day_ago = get_beforedate(today[0], today[1], today[2], 1)
        const a_week_ago = get_beforedate(today[0], today[1], today[2], 7)
        const ten_days_ago = get_beforedate(today[0], today[1], today[2], 10)

        const speedometer = {
            t_v: get_period_data(
                today[0],
                today[1],
                today[2],
                today[0],
                today[1],
                today[2],
                docs,
                'sp'
            ),
            a_d: get_period_data(
                a_day_ago[0],
                a_day_ago[1],
                a_day_ago[2],
                today[0],
                today[1],
                today[2],
                docs,
                'sp'
            ),
            a_w: get_period_data(
                a_week_ago[0],
                a_week_ago[1],
                a_week_ago[2],
                today[0],
                today[1],
                today[2],
                docs,
                'sp'
            ),
            t_d: get_period_data(
                ten_days_ago[0],
                ten_days_ago[1],
                ten_days_ago[2],
                today[0],
                today[1],
                today[2],
                docs,
                'sp'
            ),
        }
        res.send(JSON.stringify(speedometer))
    }).catch(err => console.log(err))
})

module.exports = router;