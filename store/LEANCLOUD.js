class LEANCLOUD {
  constructor(appId = '', appKey = '') {
    this.AV = require('./../utils/av-weapp-min')
    this.AV.init({appId,appKey})
  }

  QUERY(class_name, object_id) {
    return new Promise((resolve, reject) => {
      (new this.AV.Query(class_name)).get(object_id)
        .then(obj => resolve(obj)).catch(err => reject(err))
    })
  }
}

module.exports = LEANCLOUD;