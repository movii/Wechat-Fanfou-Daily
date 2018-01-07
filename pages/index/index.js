
// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    today: null,
    statuses: []
  },

  /**
   * 生命周期函数--监听页面加载
   */

  
  onLoad: function (options) {
    let app = getApp()
    let store = app.globalData.store;

    store.getData().then(store => {
      if (! options.entry ) {
        store.getToday().then(today => {
          this.setData({ today: today })
          this.setData({ statuses: today.msgs })
        })
      }
      else {
        console.log(options.entry)
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // console.log(this.data)
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
    return {
      title: `饭否每日精选 ${this.data.today.date}`,
      path: '/pages/index/index',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },

  previewImage: function (evt) {
    let _src = evt.target.dataset.src
    wx.previewImage({
      current: _src, // 当前显示图片的http链接
      urls: [_src] // 需要预览的图片http链接列表
    })
  },

  goToDetail (evt) {
    let id = evt.currentTarget.dataset.statusid;
    let entry = evt.currentTarget.dataset.entry;
    wx.navigateTo({
      url: '/pages/detail/detail?statusid=' + id + '&entry=' + entry
    })
  }
})