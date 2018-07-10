// pages/loginRegisterPage/loginRegisterPage.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dialogShow: true,
    roundImage: app.globalData.roundImage,
    searchImage: app.globalData.searchImage,
    commitImage: app.globalData.commitImage,
  },

  /**
    * 生命周期函数--监听页面加载
    */
  onLoad: function () {
    // 判断逻辑
    var storeTelNum = wx.getStorageSync("telNum");
    console.log("缓存手机号为: ", storeTelNum);

    // 已经登录过
    if (storeTelNum.length != 0) {
      console.log("已经登录过, 直接跳转到首页");
      wx.switchTab({
        url: app.globalData.firstTab,
      })
    } else {
      console.log("没有登录过, 停留在当前页面")
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

  clickCancel: function (e) {
    console.log("跳转到注册界面");
    var userInfo = e.detail.detail.userInfo
    if (userInfo) {
      // 记录昵称
      console.log("记录昵称:", userInfo.nickName)
      wx.setStorageSync("nickName", userInfo.nickName)

      // 跳转到注册界面
      wx.navigateTo({
        url: app.globalData.registerPage,
      })
    } else {
      wx.showModal({
        title: '温馨提示',
        content: '未授权，无法使用小程序！',
        showCancel: false,
        confrimText: "确定",
        confirmColor: "#8B0000"
      });
    }
  },

  clickConfirm: function(e) {
    console.log("跳转到登录界面")
    var userInfo = e.detail.detail.userInfo
    if (userInfo) {
      // 记录昵称
      console.log("记录昵称:", userInfo.nickName)
      wx.setStorageSync("nickName", userInfo.nickName)

      // 跳转到登录界面
      wx.navigateTo({
        url: app.globalData.loginPage,
      })
    } else {
      wx.showModal({
        title: '温馨提示',
        content: '未授权，无法使用小程序！',
        showCancel: false,
        confrimText: "确定",
        confirmColor: "#8B0000"
      });
    }
  }
})
