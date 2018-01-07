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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  previewImage: function (evt) {
    let _src = evt.target.dataset.src
    wx.previewImage({
      current: _src,
      urls: [_src]
    })
  }


})