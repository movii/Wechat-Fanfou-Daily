//app.js
App({

  globalData: {
    store: null
  },

  onLaunch() {
    var store = require('/store/index');
    this.globalData.store = store;
  }
});