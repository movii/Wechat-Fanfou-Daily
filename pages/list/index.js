const app = getApp();
const store = app.globalData.store;

Page({
  data: {
    date: null,
    statuses: {},
    hide_footer: true
  },

  onLoad: function (options) {
    this.setData({
      date: options.entry.replace(/\.daily/ig, '')
    })
  },

  onShow () {
    if (wx.showLoading) {
      wx.showLoading({
        title: "加载中...",
        mask: true
      })
    }

    store.getDaily(this.data.date).then(statuses => {
      this.setData({
       'statuses': statuses,
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