import transformer from '../utils/status.transformer'
import Calendar from './Calendar'
import { AV } from '../leancloud/index'

import Status from '../models/status';
import Entries from '../models/entries'

class Store {
  constructor() {
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

  fetch_random () {
    let randomArray = [
      Math.floor(Math.random() * Math.floor(50)),
      Math.floor(Math.random() * Math.floor(500)),
      Math.floor(Math.random() * Math.floor(2000)),
      Math.floor(Math.random() * Math.floor(5000)),
      Math.floor(Math.random() * Math.floor(6000)),
      Math.floor(Math.random() * Math.floor(8000)),
      Math.floor(Math.random() * Math.floor(10000)),
      Math.floor(Math.random() * Math.floor(20000))
    ]

    let random = randomArray[
      Math.floor(Math.random()*randomArray.length)
    ]

    let query = new AV.Query(Status)
    query.skip(random);
    query.limit(20);

    return query.find().then(statuses => {
      statuses.forEach(status =>  status.set('msg', transformer(status.get('msg'))))
      return statuses
    })
  }

  fetch_daily (date) {
    let query = new AV.Query(Status);
    query.equalTo('date', date);
    query.descending('createdAt');

    return query.find().then(statuses => {
      statuses.forEach(status =>  status.set('msg', transformer(status.msg)))
      return statuses
    })
  }

  fetch_entries () {
    return new Promise((resolve, rejcect) => {
      new AV.Query(Entries).first().then(res => {
        let entries = res.data;
        let today = [...entries].shift();
        this.entries = entries;
        this.today = today;
        resolve(this.entries);
      })
      .catch(err => reject(err));
    })
  }

  fetch_status (statusid) {
    let query = new AV.Query(Status)
    
    query.equalTo('statusid', statusid)
    query.limit(1)

    return query.find().then(results => {
      results[0].set('msg', transformer(results[0].msg))
      return results[0]
    }, err => console.log(err))
  }

  fetch_today () {
    return this.entries.then(entries => {
      let date_string = [...entries].shift().replace(/\.daily\.json/ig, '');
      return this.fetch_daily(date_string)
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

  performSearch (value) {
    let query = new AV.Query(Status);
    query.contains('msg', value);
    query.descending('createdAt');
    query.limit(50);
    
    return query.find().then(statuses => {
      statuses.forEach(status =>  status.set('msg', transformer(status.get('msg'))))
      return statuses
    })
  }
}

module.exports = Store;