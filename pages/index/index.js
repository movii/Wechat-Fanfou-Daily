// cache global store
Page({

  /**
   * 页面的初始数据
   */
  data: {
    today: null,
    statuses: [],
    hide_footer: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.showLoading) {
      wx.showLoading({
        title: "加载中...",
        mask: true
      })
    }

    let app = getApp()
    let store = app.globalData.store

    store.fetch_today().then(data => {
      this.setData({ 'statuses': data, 'hide_footer': false });
      if ( wx.hideLoading ) {
        setTimeout(() => wx.hideLoading(), 100)
      }
    })
  },

  /*** 生命周期函数--监听页面初次渲染完成 */
  onReady: function () {},

  /*** 生命周期函数--监听页面显示 */
  onShow: function () {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: `饭否每日精选 | 今天`,
      path: '/pages/index/index'
    }
  },

  previewImage: function (evt) {
    let _src = evt.target.dataset.src
    wx.previewImage({
      current: _src,
      urls: [_src]
    })
  },

  goToDetail (evt) {
    let id = evt.currentTarget.dataset.statusid
    let entry = evt.currentTarget.dataset.entry

    wx.navigateTo({
      url: `/pages/detail/index?statusid=${id}&entry=${entry}`
    })
  }
})