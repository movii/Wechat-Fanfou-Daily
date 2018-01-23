import transformer from '../utils/status.transformer'
import Calendar from './Calendar'
import { AV } from '../leancloud/index'

import Status from '../models/status'
import Entries from '../models/entries'

import {
  fetchEntries,
  fetchStatus,
  fetchDaily,
  fetchRandom,
  search
} from './api'

import status from '../models/status';

class Store {
  constructor() {
    this.Calendar  = new Calendar();

    this.store = {
      entries: [],
      dailys: [],
      statuses: [],
      queries: []
    }
  }

  init () {
    this.getEntries()
  }

  get entries() {
    return this.store.entries && this.store.entries.length
    ? Promise.resolve(this.store.entries)
    : this.getEntries();
  }

  set entries(value) {
    this.store.entries = value;
  }

  saveStatus(statusid, status) {
    this.store.statuses[statusid] = status
    return Promise.resolve(status)
  }

  getStatus (statusid) {
    return this.store.statuses[statusid] 
    ? Promise.resolve(this.store.statuses[statusid])
    : fetchStatus(statusid).then(status => this.saveStatus(statusid, status))
  }

  saveDaily (date, statuses) {
    statuses.forEach(status => this.saveStatus(status.statusid, status))
    this.store.dailys[date] = statuses
    return Promise.resolve(statuses)
  }

  getDaily (date) {
    return this.store.dailys[date]
      ? Promise.resolve(this.store.dailys[date])
      : fetchDaily(date).then(statuses => this.saveDaily(date, statuses)).catch(err => console.log(err))
  }

  saveQuery (query, statuses) {
    this.store.queries[query] = statuses
    return Promise.resolve(statuses)
  }

  getQuery (query) {
    return this.store.queries[query]
      ? Promise.resolve(this.store.queries[query])
      : search(query).then(statuses => this.saveQuery(query, statuses))
  }

  getEntries () {
    return new Promise((resolve, rejcect) => {
      return fetchEntries()
        .then(res => {
          let entries = res.data;
          let today = [...entries].shift().replace(/\.daily\.json/ig, '');
          this.entries = entries;
          this.store.today = today;
          resolve(this.entries);
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  getToday () {
    return this.store.today
      ? this.getDaily(this.store.today)
      : this.entries.then(() => this.getDaily(this.store.today))
  }

  performSearch (query) {
    return search(query)
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