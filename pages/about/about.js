var initData = '您的收藏夹还是空的~\n查找书时点击爱心即可收藏'
var extraLine = [];
Page({
  data: {
    text: initData
  },
  add: function (e) {
    extraLine.push('other line')
    this.setData({
      text: initData + '\n' + extraLine.join('\n')
    })
  },
  remove: function (e) {
    if (extraLine.length > 0) {
      extraLine.pop()
      this.setData({
        text: initData + '\n' + extraLine.join('\n')
      })
    }
  }
})