//app.js 全局逻辑层
App({
  onLaunch: function() {
    var that = this;
    // 使用设备可视宽高
    wx.getSystemInfo({
      success: function (res) {
        that.globalData.windowWidth = res.windowWidth;
        that.globalData.windowHeight = res.windowHeight;
      }
    });
  },

  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function(res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },

  globalData: {
      userInfo: null,
      windowWidth: 0,
      windowHeight: 0,
      doubanBase: "https://api.douban.com",
      name:"/v2/book/:id",
      ISBN:"/v2/book/isbn/:name",
      search: "/v2/book/search"
   
  }
})
