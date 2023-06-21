const calendar = require('./calendar')

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

exports.get_beforedate = get_beforedate
exports.get_period_data = get_period_data
exports.get_vol_gfs = get_vol_gfs