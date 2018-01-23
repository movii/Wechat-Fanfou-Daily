import { AV } from '../leancloud/index'
import Status from '../models/status'
import Entries from '../models/entries'
import transformer from '../utils/status.transformer'

import {
  generateRandom
} from '../utils/index'

export function fetchEntries () {
  return new AV.Query(Entries).first()
}

export function fetchStatus (statusid) {
  let query = new AV.Query(Status)
    
  query.equalTo('statusid', statusid)
  query.limit(1)

  return query.find().then(results => {
    results[0].msg = transformer(results[0].msg)
    return results[0]
  }, err => {
    console.log(err)
  })
}

export function fetchDaily (date) {
  let query = new AV.Query(Status);
  
  query.equalTo('date', date);
  query.descending('createdAt');

  return query.find().then(statuses => {
    statuses = statuses.map(status => {
      status.msg = transformer(status.msg)
      return status
    })
    return statuses
  })
}

export function search (query) {
  let search = new AV.Query(Status);

  search.contains('msg', query);
  search.descending('createdAt');
  search.limit(50);
  
  return search.find().then(statuses => {
    statuses.forEach(status =>  {
      status.set('msg', transformer(status.get('msg')))
    })
    return statuses
  })
}

export function fetchRandom () {
  let random = generateRandom()
  let query = new AV.Query(Status)
  query.skip(random);
  query.limit(20);

  return query.find().then(statuses => {
    statuses.forEach(status => {
      status.msg = transformer(status.get('msg'))
    })
    
    return statuses
  })
}