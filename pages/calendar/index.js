// pages/calendar/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    store: null,
    calendars: [],
    hide_footer: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.showLoading && wx.showLoading({
      title: "加载中...",
      mask: true
    });

    let app = getApp();
    let store = app.globalData.store;

    store.get_calendars().then(data => {
      this.setData({ 
        calendars: data, 
        'hide_footer': false
      })
      
      if ( wx.hideLoading ) {
        setTimeout(() => wx.hideLoading(), 400)
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
    console.log(`tap ${entry}`)
    wx.navigateTo({
      url: '/pages/list/index?entry=' + entry
    })
  }
})