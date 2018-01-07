const transformer = require('../utils/status.transformer')
const LEANCLOUD = require('./LEANCLOUD')
const Calendar = require('./Calendar');

class Store {
  constructor() {
    this.LEANCLOUD = new LEANCLOUD();
    this.Calendar = new Calendar();

    this.store = {
      data: Object.create(null),
      today: Object.create(null),
      days: Object.create(null),
      dailys: Object.create(null),
      statuses: Object.create(null),
      calendars: Object.create(null)
    };

    this.getData().then($this => $this.getToday())
  }

  get data() { return this.store.data; }
  set data(value) { this.store.data = value; }

  get today() { return this.store.today; }
  set today(value) { this.store.today = value }

  get days() { return this.store.days; }
  set days(value) { this.store.days = value; }

  get daily () { return this.store.dailys; }
  set daily (value) { this.store.dailys = value; }
 
  get statuses () { return this.store.statuses; }
  set statuses (value) { this.store.statuses = value; }
 
  get calendars () { return this.store.calendars; }
  set calendars (value) { this.store.calendars = value; }

  getData() {
    if (Object.keys(this.data).length) {
      return Promise.resolve(this)
    }
    else {
      return this.LEANCLOUD.QUERY('ENTRIES', '').then(data => {
        this.data = JSON.parse(data.get('entries'))
        this.days = Object.keys(this.data)
        return this
      });
    }
  }

  getToday() {
    let date = [...this.days].pop();
    return this.getDaily(date).then(data => {
      this.saveLocal(date, data)
      this.today = data
      return data
    })
  }

  getDaily(date) {
    if (this.daily[date]) {
      return Promise.resolve(this.daily[date])
    }
    else {
      return this.LEANCLOUD.QUERY('ENTRY', this.data[date]).then(data => {
        return JSON.parse(data.get('entry'))
      });
    }
  }

  getEntry(statusid, date) {
    return this.getDaily(date).then(data => {
      this.saveLocal(date, data);
      return this;
    })
  }

  saveLocal(date, entry) {
    entry.msgs.forEach(msg => {
      msg.entry = entry.date + '.daily'
      msg.msg = transformer(msg.msg);
      this.statuses[msg.statusid] = msg;
    })
    this.daily[date] = entry;
  }

  getStatus(statusid, date) {
    if (this.statuses[statusid]) {
      return Promise.resolve(this.statuses[statusid])
    }
    else {
      console.log(statusid, date)
      return this.getData().then($this => $this.getEntry(statusid, date).then((data) => {
        return this.statuses[statusid]
      }))
    }
  }

  getCalendars () {
    return new Promise((resolve, reject) => {
      this.getData().then(() => resolve(this.Calendar.generate(this.days)))
    })
  }
}

module.exports = Store;