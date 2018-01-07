let t = new Date();
let todayString = `${t.getFullYear()}-${t.getMonth() + 1 < 10 ? '0' + (t.getMonth() + 1) : t.getMonth() + 1}-${t.getDate()}.daily`;

class Calendar {
  constructor() {
    this.month_olympic = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    this.month_normal = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  }

  generate(data) {
    return this.groupDate(data).then(dates => this.sort(dates))
  }

  // make a calendar using year: 2017, month '1', monthObj: obj
  make(year, month, monthObj) {
    let _year = parseInt(year),
      _month = parseInt(month) - 1,
      _monthObj = monthObj

    // the start day of the month
    let start = this.getStartDayInWeekOfSpecificMonth(_month, _year)
      // the count of day on the monthe
      ,
      count = this.getCountOfDayInSpecificMonth(_month, _year)
      // len for the for loop
      ,
      len = count + start;

    let calendar = Object.create(null);
    calendar.days = [];
    calendar.month = _month + 1;
    calendar.year = _year

    // 
    if (start == 0) {
      calendar.days = [...Array(6)].map((_, i) => ({
        value: 'placeholder',
        content: i
      }))
    } else if (start - 1 > 0) {
      calendar.days = [...Array(start - 1)].map((d, i) => ({
        value: 'placeholder',
        content: i - start
      }));
    }

    //
    [...Array(count)].map((d, i) => {
      let s = [
        _year, '-',
        (_month + 1) >= 10 ? (_month + 1) : '0' + (_month + 1), '-',
        (i + 1) >= 10 ? (i + 1) : '0' + (i + 1),
        '.daily'
      ].join('')

      calendar.days.push({
        value: _monthObj.includes(s) ? 'value' : 'empty',
        content: i + 1,
        entry: _monthObj.includes(s) ? s : null,
        isToday: s === todayString ? true : false
      });
    });

    return calendar;
  }

  // Group date by year, then by momth
  // sort method here help make an array contian calandar object
  // order by the :
  // first year: 2017, 2016, 2015
  // then monthe: 12, 11, 10, 9, 8, 7, 6, ... , 3, 2, 1
  // then daY: 1, 2, 3, 4, 5, ... , 30, 31
  sort(dates) {
    // _sort:
    // first level of date obj is:
    // {2015: {month: {...}}, 2016: {month: {...}}, 2017: {month: {...}}}
    // shoule be push into calendar array in order:
    // [2017.12, 2017.11, 2017.10, ..., 2017.1, 2016.12, 2016.11 ...]
    const _sort = (dateObj) => Object.keys(dateObj).sort((a, b) => b - a);

    return _sort(dates).reduce((yearArr, year) => {
      return _sort(dates[year]).reduce((monthObj, month) => {
        yearArr.push(this.make(year, month, dates[year][month]));
        return yearArr;
      }, {});
    }, []);
  }

  // turn Array: [2015-01-01, 2016-02-02, 2017-03-03] 
  // to Object: { 2015: {01: [2015-01-01]}, 2016: { 02: [2016-02-02] }. { 2017: { 03: [2017-03-03] } }}
  //
  groupDate(dates) {
    return new Promise((resolve, reject) => {
      resolve(dates.reduce((l, r) => {
        // 2017-01-01 => [2017, 01, 01]
        let date = r.split('-').map(s => parseInt(s))

        // date[0] => year: 2017, date[1] => month: 1. date[2] => day: 1
        if (typeof l[date[0]] === 'undefined') l[date[0]] = {}
        if (typeof l[date[0]][date[1]] === 'undefined') l[date[0]][date[1]] = []

        l[date[0]][date[1]].push(r)
        return l;
      }, {}))
    })
  }

  // get the start day in a week [0, 1, 2, 3, 4, 5, 6] of specific month in specific year
  //  
  getStartDayInWeekOfSpecificMonth(month, year) {
    return (new Date(year, month, 1)).getDay()
  }

  // get the count of days of specific month in specific year.
  // the month value starts from 0, end in 11.
  // eg: 2017-5 => (4, 2017) => 31
  //
  getCountOfDayInSpecificMonth(month, year) {
    return year % 4 === 0 ? this.month_olympic[month] : this.month_normal[month]
  }

}

module.exports = Calendar;