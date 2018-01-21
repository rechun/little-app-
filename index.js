//index.js
//获取应用实例
var app = getApp()
var requestUrl = "https://route.showapi.com/255-1";
var curPage = 1;
var isPullDownRefreshing = false;
Page({
  data: {
    jokes :{},
    hid:true,
    showBlue:'none',
    showWin:'none',
  },

  lower:function(){
    console.log("reach to lower...");
    var that = this;
    this.fetchJoke();
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    this.fetchJoke();
},
  onPullDownRefresh:function(){
    console.log('onPullDownRefresh...');
    curPage = 1;
    isPullDownRefreshing = true;
    this.fetchJoke();
  },

  fetchJoke:function(){
    wx.showNavigationBarLoading();
    var that = this;
    wx.request({
      url: requestUrl,
      data: {
        'showapi_appid':app.globalData.appid,
        'showapi_sign':app.globalData.apiKey,
        'page':curPage.toString(),
        'type':app.globalData.tText
      },
      method: 'GET',
      success: function(res){
        // success
        if(curPage == 1)
          that.setData({ jokes:res.data.showapi_res_body.pagebean.contentlist });
        else
          that.setData({ jokes: that.data.jokes.concat(res.data.showapi_res_body.pagebean.contentlist) });

        curPage = curPage + 1;
        wx.hideNavigationBarLoading();
        if(isPullDownRefreshing)
          wx.stopPullDownRefresh();
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  doctor:function(e){
    var shareNum = this.data.sharenumber;//股票代码
    this.setData({
      sharenumber:shareNum,
      showBlue:'block',
    });
    console.log(shareNum)
  },
  sendMessage:function(e){
    var inputPhone = this.data.inputphone;//手机号码
      this.setData({
        inputphone:inputPhone,
        showBlue:'none',
        showWin:'block',
      });
    var shareNum = this.data.sharenumber;
    console.log('inputPhone'+ inputPhone);
    console.log('shareNum'+shareNum);
    wx.request({
      url: 'https://laohuangli.intbull.com/Api/Cms/stock/m/'+inputPhone+'/sc/'+shareNum+'/c/2', 
      data: {
      },
      header: {
          'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        console.log(inputPhone);
        console.log(shareNum);
        console.log(res);
      }
    })
  },
  bindChange: function(e) {
     var id = e.currentTarget.id; // 获取当前股票Id
     var input = e.detail.value; // 获取当前股票输入框内容
     console.log(input);
    if(input) {
      this.setData({
        sharenumber:input
      });
    }else{
      console.log("请输入正确的股市代码");
    }
},
phoneChange: function(e) {
  var id = e.currentTarget.id; // 获取当前
  var inputphone = e.detail.value; // 获取当前手机号
  console.log('bindinput='+inputphone);
 if(inputphone) {
   this.setData({
    inputphone:inputphone
   });
 }else{
   console.log("请输入正确的手机号");
 }
},
cleanMessage:function(e){
  var that = this;
  that.setData({
    sharenumber:'',
    inputPhone:'',
    showBlue:'none',
    showWin:'none',
  });
},
// 接口请求
  onReady: function () {
    var that = this;
    console.log('jock');
    this.fetchJoke();
    wx.request({
      url: 'https://laohuangli.intbull.com/switch.json', 
      header: {
          'content-type': 'application/json' // 默认值
      },
      method:'GET',
      success: function(res) {
        console.log('stock_hid1'+res.data.stock_hid1 );
        that.setData({
            hid: res.data.stock_hid1 
          });
      }
    })
  }

})

