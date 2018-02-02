import {
  backToTop
} from '../../utils/index.js'

let app = getApp();
let store = app.globalData.store;

Page({
  // isCurrentPage: false,
  
  data: {
    hasSearch: false,
    keyword: null,
    statuses: {},
    count: null,
    resultTitle: null
  },

  onLoad (options) {
   if (options && options.keyword) {
     this.setData({
       keyword: options.keyword
     })
   }
  },

  onShow () {
    // this.isCurrentPage = true;
    // wx.onAccelerometerChange(this.onDiviceShake)

    let searchCondition = (!this.data.lastKeyword && this.data.keyword) 
    || (this.data.keyword && this.data.lastKeyword && this.data.keyword !== this.data.lastKeyword)

    if (searchCondition) {
      this.search(this.data.keyword)
    }
  },

  onHide: function () {
    // this.isCurrentPage = false 
    // wx.stopAccelerometer()
    if (this.data.keyword) {
      this.setData({
        lastKeyword: this.data.keyword
      })
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

    backToTop()

    store.getQuery(keyword)
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
  },

  onDiviceShake (acceleration) {
    if(!this.isCurrentPage){ return }
      if (
        acceleration.x > 1 
        && acceleration.y > .5
      ) {
        wx.showToast({ title: '正在加载' })
        wx.vibrateLong()
        this.refreshRandom()
      }
  },

  refreshRandom () {
    this.setData({ statuses: [] })
    wx.showLoading({
      title: "加载中...",
      mask: true
    })

    store.fetch_random().then(statuses => {
      this.setData({
        'statuses': statuses,
        resultTitle: '摇一摇'
      })

      if ( wx.hideLoading ) {
        setTimeout(() => wx.hideLoading(), 200)
      }
    })
  }
})