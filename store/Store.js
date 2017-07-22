const data = require('./data');
const Calendar = require('./Calendar');

class Store {
  constructor() {
    this.Calendar = new Calendar();

    this.store = Object.create(null);
    this.store.data = Object.create(null);
    this.store.days = Object.create(null);
    this.store.calendars = Object.create(null);
  }

  get data() { return this.store.data; }
  set data(value) { this.store.data = value; }

  get days() { return this.store.days; }
  set days(value) { this.store.days = value; }

  get calendars() { return this.store.calendars; }
  set calendars(value) { this.store.calendars = value; }

  getCalendars() {
    this.data = data;
    this.days = Object.keys(this.data);
    return Promise.resolve(this.Calendar.generate(this.days));
  }
}

module.exports = Store;