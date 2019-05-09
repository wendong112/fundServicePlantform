// pages/autoTest/autoTest.js
var app = getApp()
var sliderWidth = 96 // 需要设置slider的宽度，用于计算中间位置

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["2017", "2018"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,

    upgradeMessage_0: [],
    upgradeMessage_1: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        })
      }
    })

    //获取升级信息列表
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: app.globalData.getUpgradeList,
      data: "",
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        wx.hideLoading()

        var result = res.data.upgradeMessageList
        if(result != undefined){
          var list_0 = new Array()
          var list_1 = new Array()

          for (var i = 0; i < result.length; i++) {
            var content = result[i].content
            var contentList = content.split("*")
            result[i].contentList = contentList

            if (result[i].type == 0){
              list_0.push(result[i])
            } else if (result[i].type == 1){
              list_1.push(result[i])
            }
          }

          that.setData({
            upgradeMessage_0: list_0,
            upgradeMessage_1: list_1
          })
        } else {
          console.log("无升级信息")
        }
      },
      fail: function () {
        wx.hideLoading()
        that.tip("系统错误")
      }
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

  /**
  * 切换注册、登录
  */
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },

  upgradeDetail: function(e){
    var index = e.currentTarget.dataset.id;
    var detail = new Object()
    if (this.data.activeIndex == 0){
      detail = this.data.upgradeMessage_0[index]
    } else {
      detail = this.data.upgradeMessage_1[index]
    }
    var detailJsonStr = JSON.stringify(detail)

    wx.navigateTo({
      url: '/pages/autoTest/upgradeDetail/upgradeDetail?upgradeDetail=' + detailJsonStr
    })
  }
})