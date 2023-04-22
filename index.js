const mongoose = require('mongoose')
const cors = require('cors')
const express = require('express')
const app = express()
// const cSchemas = require('./models/CoinList')
const mySchemas = require('./models/Schemas')
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

console.log('App listen at port 5000')
app.use(express.json())
app.use(cors())

const today = [2022, 5, 14]
// for speedometer
app.get('/spd', (req, resp) => {
  const CostSchema = mySchemas.BITCOIN

  CostSchema.find({}, function (err, docs) {
    // const today = [2022, 5, 10]
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
    resp.send(JSON.stringify(speedometer))
  })
})

// for ChartPage
app.get('/chart', (req, resp) => {
  const BITCOIN = mySchemas.BITCOIN
  BITCOIN.find({}, function (err, docs) {
    // const today = [2022, 5, 10]
    const two_weeks_ago = get_beforedate(today[0], today[1], today[2], 14)
    const Chartdata = {
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
    resp.send(JSON.stringify(Chartdata))
  })
})

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

app.get('/rank', (req, resp) => {
  const COINS = mySchemas.COIN
  const BITCOIN = mySchemas.BITCOIN
  const ADA = mySchemas.ADA
  const ANKR = mySchemas.ANKR
  const DOGECOIN = mySchemas.DOGECOIN
  const EOS = mySchemas.EOS
  const ETC = mySchemas.ETC
  const ETH = mySchemas.ETH
  const IOTA = mySchemas.IOTA
  const POLYGON = mySchemas.POLYGON
  const WAVES = mySchemas.WAVES
  const XRP = mySchemas.XRP
  const ZILLIQA = mySchemas.ZILLIQA
  const SOL = mySchemas.SOL

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

  BITCOIN.find({ date: td }, function (err, docs) {
    const temp = new COINS({
      today: td,
      name: 'BITCOIN',
      arr: get_vol_gfs(docs, td),
    })
    COINS.deleteOne({ name: 'BITCOIN' }).then(() => {
      console.log('delete')
    })
    temp
      .save()
      .then(() => {
        console.log('코인 정보 저장 성공')
      })
      .catch((err) => {
        console.log(err)
      })
  })
  ADA.find({ date: td }, function (err, docs) {
    const temp = new COINS({
      today: td,
      name: 'ADA',
      arr: get_vol_gfs(docs, td),
    })
    COINS.deleteOne({ name: 'ADA' }).then(() => {
      console.log('delete')
    })

    temp
      .save()
      .then(() => {
        console.log('코인 정보 저장 성공')
      })
      .catch((err) => {
        console.log(err)
      })
  })
  ANKR.find({ date: td }, function (err, docs) {
    const temp = new COINS({
      today: td,
      name: 'ANKR',
      arr: get_vol_gfs(docs, td),
    })
    COINS.deleteOne({ name: 'ANKR' }).then(() => {
      console.log('delete')
    })

    temp
      .save()
      .then(() => {
        console.log('코인 정보 저장 성공')
      })
      .catch((err) => {
        console.log(err)
      })
  })
  DOGECOIN.find({ date: td }, function (err, docs) {
    const temp = new COINS({
      today: td,
      name: 'DOGECOIN',
      arr: get_vol_gfs(docs, td),
    })

    COINS.deleteOne({ name: 'DOGECOIN' }).then(() => {
      console.log('delete')
    })

    temp
      .save()
      .then(() => {
        console.log('코인 정보 저장 성공')
      })
      .catch((err) => {
        console.log(err)
      })
  })
  EOS.find({ date: td }, function (err, docs) {
    const temp = new COINS({
      today: td,
      name: 'EOS',
      arr: get_vol_gfs(docs, td),
    })
    COINS.deleteOne({ name: 'EOS' }).then(() => {
      console.log('delete')
    })

    temp
      .save()
      .then(() => {
        console.log('코인 정보 저장 성공')
      })
      .catch((err) => {
        console.log(err)
      })
  })
  ETC.find({ date: td }, function (err, docs) {
    const temp = new COINS({
      today: td,
      name: 'ETC',
      arr: get_vol_gfs(docs, td),
    })

    COINS.deleteOne({ name: 'ETC' }).then(() => {
      console.log('delete')
    })

    temp
      .save()
      .then(() => {
        console.log('코인 정보 저장 성공')
      })
      .catch((err) => {
        console.log(err)
      })
  })
  ETH.find({ date: td }, function (err, docs) {
    const temp = new COINS({
      today: td,
      name: 'ETH',
      arr: get_vol_gfs(docs, td),
    })

    COINS.deleteOne({ name: 'ETH' }).then(() => {
      console.log('delete')
    })

    temp
      .save()
      .then(() => {
        console.log('코인 정보 저장 성공')
      })
      .catch((err) => {
        console.log(err)
      })
  })
  IOTA.find({ date: td }, function (err, docs) {
    const temp = new COINS({
      today: td,
      name: 'IOTA',
      arr: get_vol_gfs(docs, td),
    })

    COINS.deleteOne({ name: 'IOTA' }).then(() => {
      console.log('delete')
    })

    temp
      .save()
      .then(() => {
        console.log('코인 정보 저장 성공')
      })
      .catch((err) => {
        console.log(err)
      })
  })
  POLYGON.find({ date: td }, function (err, docs) {
    const temp = new COINS({
      today: td,
      name: 'POLYGON',
      arr: get_vol_gfs(docs, td),
    })

    COINS.deleteOne({ name: 'POLYGON' }).then(() => {
      console.log('delete')
    })

    temp
      .save()
      .then(() => {
        console.log('코인 정보 저장 성공')
      })
      .catch((err) => {
        console.log(err)
      })
  })
  WAVES.find({ date: td }, function (err, docs) {
    const temp = new COINS({
      today: td,
      name: 'WAVES',
      arr: get_vol_gfs(docs, td),
    })

    COINS.deleteOne({ name: 'WAVES' }).then(() => {
      console.log('delete')
    })

    temp
      .save()
      .then(() => {
        console.log('코인 정보 저장 성공')
      })
      .catch((err) => {
        console.log(err)
      })
  })
  XRP.find({ date: td }, function (err, docs) {
    const temp = new COINS({
      today: td,
      name: 'XRP',
      arr: get_vol_gfs(docs, td),
    })

    COINS.deleteOne({ name: 'XRP' }).then(() => {
      console.log('delete')
    })

    temp
      .save()
      .then(() => {
        console.log('코인 정보 저장 성공')
      })
      .catch((err) => {
        console.log(err)
      })
  })
  ZILLIQA.find({ date: td }, function (err, docs) {
    const temp = new COINS({
      today: td,
      name: 'ZILLIQA',
      arr: get_vol_gfs(docs, td),
    })

    COINS.deleteOne({ name: 'ZILLIQA' }).then(() => {
      console.log('delete')
    })

    temp
      .save()
      .then(() => {
        console.log('코인 정보 저장 성공')
      })
      .catch((err) => {
        console.log(err)
      })
  })
  SOL.find({ date: td }, function (err, docs) {
    const temp = new COINS({
      today: td,
      name: 'SOL',
      arr: get_vol_gfs(docs, td),
    })

    COINS.deleteOne({ name: 'SOL' }).then(() => {
      console.log('delete')
    })

    temp
      .save()
      .then(() => {
        console.log('코인 정보 저장 성공')
      })
      .catch((err) => {
        console.log(err)
      })
  })

  COINS.find({}, function (err, docs) {
    let temp = {}
    for (let i = 0; i < docs.length; i++) {
      let k = docs[i].toObject().name
      let v = docs[i].toObject().arr
      temp[k] = v
    }
    resp.send(temp)
    // console.log(JSON.stringify(temp))
  })
})

// 각 월별 일자
const calendar = {
  1: 31,
  2: 28,
  3: 31,
  4: 30,
  5: 31,
  6: 30,
  7: 31,
  8: 31,
  9: 30,
  10: 31,
  11: 30,
  12: 31,
}

// functions ---------------------------------

// 시작 일자로 부터 h일 전의 날짜값 반환
function get_beforedate(y, m, d, h) {
  let b = d - h // 기준 일 - h일 전
  let result_date = []

  if (b < 1) {
    // b가 1보다 작은 경우 -> 전월
    if (m === 1) {
      m = 12
      y -= 1
      d = calendar[m] + b
    } else {
      m -= 1
      d = calendar[m] + b
    }
    result_date.push(y, m, d)
  } else {
    d -= h
    result_date.push(y, m, d)
  }

  return result_date
}

// 기간동안의 데이터 반환
function get_period_data(
  start_year,
  start_month,
  start_day,
  end_year,
  end_month,
  end_day,
  docs,
  op
) {
  let end = false
  let temp = []
  for (
    let s_year = start_year, s_month = start_month, s_day = start_day;
    end !== true;
    s_day++
  ) {
    if (s_year === end_year) {
      if (s_month === end_month) {
        if (s_day === end_day) {
          end = true
        }
      }
    }
    let td = ''
    if (s_month < 10) {
      td = s_year.toString().concat('-0', s_month.toString())
    } else {
      td = s_year.toString().concat('-', s_month.toString())
    }

    if (s_day < 10) {
      td = td.concat('-0', s_day.toString())
    } else {
      td = td.concat('-', s_day.toString())
    }
    if (s_day === calendar[s_month]) {
      s_day = 1
      s_month++
    }

    if (s_month === 13) {
      s_month = 1
      s_year++
    }

    // docs 하나씩 조회
    for (let i = 0; i < docs.length; i++) {
      if (op === 'pd') {
        // get predict close data
        if (docs[i].toObject().target_date === td) {
          temp.push(parseInt(docs[i].toObject().predict_close))
        }
      } else {
        if (docs[i].toObject().date === td) {
          if (op === 'sp') {
            // get speedometer data -> greed fear score
            temp.push(docs[i].toObject().Greed_Fear_Score)
          } else if (op === 'ch') {
            // get close data
            temp.push(parseInt(docs[i].toObject().close))
          } else if (op === 'td') {
            // get date
            temp.push(td)
          }
        }
      }
    }
  }
  return temp
}

function get_vol_gfs(docs, today) {
  let temp = []
  for (let i = 0; i < docs.length; i++) {
    if (docs[i].toObject().date === today) {
      temp.push(docs[i].toObject().vol)
      temp.push(docs[i].toObject().Greed_Fear_Score)
      temp.push(docs[i].toObject().close)
      temp.push(docs[i].toObject().percent)
    }
  }
  return temp
}

// // 오늘 날짜를 반환
// function get_today() {
//   let today = new Date()
//   let dd = today.getDate()
//   let mm = today.getMonth() + 1
//   let yyyy = today.getFullYear()
//   today = yyyy + '-' + mm + '-' + dd

//   console.log(today)
//   return [yyyy, mm, dd]
// }

app.listen(5000, () => {
  console.log('Server is running on 5000')
})
