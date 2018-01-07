const transformer = require('../utils/status.transformer');
const LeanCloud = require('./LEANCLOUD');
const Calendar  = require('./Calendar');

class Store {
  constructor() {
    this.LeanCloud = new LeanCloud();
    this.Calendar  = new Calendar();

    this.store = {
      dailys: null,
      statuses: null
    };
  }

  init () {
    this.fetch_entries()
  }

  get entries() {
    return this.store.entries
    ? Promise.resolve(this.store.entries)
    : this.fetch_entries();
  }

  set entries( value ) {
    this.store.entries = value;
  }

  fetch_daily (date) {
    let query = new this.LeanCloud.AV.Query('STATUSES');
    query.equalTo('date', date);
    query.descending('createdAt');

    // strip out HTML tags
    return query.find().then(statuses => {
      statuses.forEach(status =>  status.set('msg', transformer(status.get('msg'))))
      return statuses
    })
  }

  fetch_entries () {
    return new Promise((resolve, rejcect) => {
      new this.LeanCloud.AV.Query('ENTRIES').first().then(res => {
        let entries = res.get('data');
        let today = [...entries].shift();
        this.entries = entries;
        this.today = today;
        resolve(this.entries);
      })
      .catch(err => reject(err));
    })
  }

  fetch_status (statusid) {
    let query = new this.LeanCloud.AV.Query('STATUSES')
    query.equalTo('statusid', statusid)
    query.limit(1)

    return query.find().then(results => {
      results[0].set('msg', transformer(results[0].get('msg')))
      return results[0]
    }, err => console.log(err))
  }

  fetch_today () {
    return this.entries.then(entries => {
      let date_string = [...entries].shift().replace(/\.daily\.json/ig, '');
      return this.fetch_daily(date_string);
    }, err => console.log(err))
  }

  get_calendars () {
    return new Promise((resolve, reject) => {
      return this.entries.then(entries => {
        // 配合原来写的 Calendays
        let days = entries.map(item => item.replace(/\.json/ig, ''))
        return resolve(this.Calendar.generate(days))
      })
    })
  }
}

module.exports = Store;