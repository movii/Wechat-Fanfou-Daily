// pages/detail/index.js
// 状态详情

let app = getApp()
let store = app.globalData.store

Page({

  /**
   * 页面的初始数据
   */
  data: {
    status: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading && wx.showLoading({
      title: "加载中...",
      mask: true
    });

    let condition = options
    && options.statusid
    && options.entry

    if ( condition ) {
      store.fetch_status(options.statusid).then(status => {
        this.setData({'status': status });
        if ( wx.hideLoading ) {
          setTimeout(() => wx.hideLoading(), 100)
        }
      }, err => console.log(err))
    }
  },

  onShareAppMessage: function () {
    return {
      title: `饭否每日精选 | by ${this.data.status.get('realname')}`,
      path: '/pages/index/index'
    }
  },

  previewImage: function (evt) {
    let _src = evt.target.dataset.src
    wx.previewImage({
      current: _src,
      urls: [_src]
    })
  }


})