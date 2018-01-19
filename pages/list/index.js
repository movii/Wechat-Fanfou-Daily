// pages/list/index.js
Page({
  data: {
    date: null,
    statuses: {},
    hide_footer: true
  },

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

    let date = options.entry.replace(/\.daily/ig, '')

    store.fetch_list(date).then(data => {
      this.setData({
       'date': date,
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
      path: `/pages/list/index?entry=${this.data.date}`
    }
  }
})