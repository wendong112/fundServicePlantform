// pages/autoTest/upgradeDetail/upgradeDetail.js

var app = getApp()
var upgradeDetail = {}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: false,
    upgradeMessage:{},
    showAll:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

    //通过上页参数获得升级信息
    upgradeDetail = JSON.parse(options.upgradeDetail)

    var title = upgradeDetail.systemName;
    var ttl1 = title.split("-")[0]
    var ttl2 = title.split("-")[1]
    upgradeDetail.title1 = ttl1
    upgradeDetail.title2 = ttl2
    this.setData({
      upgradeMessage: upgradeDetail,
      showAll: upgradeDetail.contentList.length > 4 ? false : true
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
    // this.closeMask()

    return {
      title: this.data.upgradeMessage.address,
      path: "/pages/autoTest/upgradeDetail/upgradeLink?url=" + this.data.upgradeMessage.address,
      imageUrl: "http://www.fundserviceplatform.cn:8080/WeChat/advertisement/share_logo.png"
    }
  },

  /**
   * 关闭遮罩
   */
  closeMask: function () {
    this.setData({ flag: false })
  },

  /**
   * 打开遮罩
   */
  openMask: function () {
    this.setData({ flag: true })
  },


  linkTo:function () {
    wx.navigateTo({
      url: '/pages/autoTest/upgradeDetail/upgradeLink?url=' + this.data.upgradeMessage.address
    })
  },

  chingShowContent: function(){
    this.setData({
      showAll: this.data.showAll ? false : true
    })
  }

})