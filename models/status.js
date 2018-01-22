import { AV } from '../store/LEANCLOUD'; 

class Status extends AV.Object {
  get statusid () {
    return this.get('statusid')
  }

  get shift () {
    return this.get('shift')
  }

  /* eslint-disable */
  /*
   * For consistency between local property and remote api
   */
  get shift_cn () {
    return this.get('shift_cn')
  }
  /* eslint-enable */

  get date () {
    return this.get('date')
  }

  get time () {
    return this.get('time')
  }

  get realname () {
    return this.get('realname')
  }

  get loginname () {
    return this.get('loginname')
  }

  get msg (){
    return this.get('msg')
  }

  // get id () {
  //   return this.get('id')
  // }

  get avatar () {
    return this.get('avatar')
  }

  get count () {
    return this.get('count')
  }

  get img () {
    return this.get('img')
  }
}

AV.Object.register(Status, 'STATUSES')
export default Status