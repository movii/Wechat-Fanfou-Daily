// pages/calendar/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    store: null,
    calendars: [],
    hide_footer: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.showLoading && wx.showLoading({
      title: "加载中...",
      mask: true
    });

    let app = getApp();
    let store = app.globalData.store;

    store.get_calendars().then(data => {
      this.setData({ calendars: data, 'hide_footer': false })
      if ( wx.hideLoading ) {
        setTimeout(() => wx.hideLoading(), 400)
      }
    });
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

  goToIndex (evt) {
    let entry = evt.currentTarget.dataset.entry;
    wx.navigateTo({
      url: '/pages/list/index?entry=' + entry
    })
  }
})