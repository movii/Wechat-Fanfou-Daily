let app = getApp();
let store = app.globalData.store;

Page({
  data: {
    hasSearch: false,
    keyword: null,
    statuses: {},
    count: null
  },

  onLoad: function (options) {
    if (options && options.keyword) {
      this.search(options.keyword)
    }
  },

  onShareAppMessage: function () {
    return this.data.hasSearch 
      ? {
        title: `饭否每日精选 | 「${this.data.keyword}」的搜索结果`,
        path: `/pages/search/search?keyword=${this.data.keyword}`
      }
      : {
        title: `饭否每日精选 | 搜索`,
        path: `/pages/search/search`
      }
  },

  onInputSubmit (e) {
    let keyword = e.detail.value;

    if (!keyword.length) return

    this.setData({
      hasSearch: true,
      keyword: keyword
    })

    wx.showLoading({
      title: "搜索中...",
      mask: true
    })
    
    this.search(keyword)
  },

  search (keyword) {
    this.setData({
      keyword: keyword
    })

    wx.pageScrollTo({
      scrollTop: 0,
      duration: 0
    })

    store.performSearch(keyword)
      .then(statuses => {
        this.setData({
          statuses: statuses.length
            ? statuses
            : [],
          count: statuses.length
        })

        if (wx.hideLoading) {
          setTimeout(() => wx.hideLoading(), 200)
        }
      })
  }
})