var store = require('../../store/index');

// 场景测试
// path: pages/detail/detail
// args: statusid=ktGFApqYG6Q&&entry=2017-05-21.daily

// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusid: null,
    status: null,
    entry: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(option) {
    let app = getApp();
    let store = app.globalData.store;


    store.getStatus(option.statusid, option.entry).then(status => {
      this.setData({ statusid: option.statusid });
      this.setData({ status: status });
      this.setData({ entry: option.entry })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  previewImage: function(evt) {
    let _src = evt.target.dataset.src
    wx.previewImage({
      current: _src, // 当前显示图片的http链接
      urls: [_src] // 需要预览的图片http链接列表
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: '饭否精选',
      path: [
        '/pages/detail/detail?statusid=' + this.data.statusid,
        '&entry=' + this.data.entry
      ].join(''),
      success: function(res) {
        // 转发成功
      },
      fail: function(res) {
        // 转发失败
      }
    }
  }
})