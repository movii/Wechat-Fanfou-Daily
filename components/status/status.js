// component: status
Component({
  properties: {
    status: {
      type: Object,
      default: null
    }
  },
  methods: {
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
        url: '/pages/detail/index?statusid=' + id + '&entry=' + entry
      })
    }
  }
})
