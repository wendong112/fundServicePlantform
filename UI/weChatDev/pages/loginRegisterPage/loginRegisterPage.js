// pages/loginRegisterPage/loginRegisterPage.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['行业资讯', '排行榜'],
    currentTab: 0,
    dialogShow: true
  },

  /**
    * 生命周期函数--监听页面加载
    */
  onLoad: function () {
    var storeTelNum = wx.getStorageSync("telNum");

    console.log("缓存手机号为: ", storeTelNum);
    // 已经登录过
    if (storeTelNum.length != 0) {
      console.log("已经登录过, 直接跳转到首页");
      wx.switchTab({
        url: app.globalData.firstTab,
      })
    } else {
      console.log("没有登录过, 停留在注册页面")
    }
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

  clickCancel: function () {
    console.log("跳转到注册界面")
    wx.navigateTo({
      url: app.globalData.registerPage,
    })
  },

  clickConfirm: function() {
    console.log("跳转到登录界面")
    wx.navigateTo({
      url: app.globalData.loginPage,
    })
  }

})
