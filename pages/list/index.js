// pages/list/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: null,
    statuses: {},
    hide_footer: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let app = getApp();
    let store = app.globalData.store;
    let entry = options.entry;

    if (wx.showLoading) {
      wx.showLoading({
        title: "加载中...",
        mask: true
      })
    }

    let date = options && options.entry 
      ? `${options.entry.replace(/\.daily/ig, '')}`
      : 'today'

    store.fetch_list(date).then(data => {
      this.setData({
       'date': entry,
       'statuses': data,
       'hide_footer': false
      })

      if ( wx.hideLoading ) {
        setTimeout(() => wx.hideLoading(), 200)
      }
    })
  },

  onShareAppMessage: function () {
    return {
      title: `饭否每日精选 | ${this.data.date}`,
      path: '/pages/index/index'
    }
  }
})