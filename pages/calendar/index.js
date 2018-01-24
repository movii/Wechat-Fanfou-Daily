const app = getApp();
const store = app.globalData.store;

Page({
  data: {
    store: null,
    calendars: [],
    hide_footer: true
  },

  onShow () {
    wx.showLoading && wx.showLoading({
      title: "加载中...",
      mask: true
    });

    store.get_calendars().then(data => {
      this.setData({ 
        calendars: data, 
        'hide_footer': false
      })
      
      if ( wx.hideLoading ) {
        setTimeout(() => wx.hideLoading(), 100)
      }
    });
  },

  onShareAppMessage: function () {
    return {
      title: `饭否每日精选 | 日历`,
      path: '/pages/calendar/index'
    }
  },

  goToIndex (evt) {
    let entry = evt.currentTarget.dataset.entry;
    wx.navigateTo({
      url: '/pages/list/index?entry=' + entry
    })
  }
})