const Store = require('/store/index');

App({
  globalData: {
    store: null
  },

  onLaunch () {
    let store = new Store();
    this.globalData.store = store;
    store.init();
  }
});
