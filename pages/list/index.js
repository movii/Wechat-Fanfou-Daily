// pages/list/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '',
    statuses: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let app = getApp();
    let store = app.globalData.store;
    let entry = options.entry;

    store.getData().then(store => {
      store.getEntry(null, entry).then(data => {
        console.log(store.daily[entry].msgs)
        this.setData({
          date: store.daily[entry].date,
          statuses: store.daily[entry].msgs
        })
      })
    })
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