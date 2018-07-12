// pages/uniformTest/uniformTest.js

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['项目进展', '测试报告查询'],
    currentTab: 0,

    // 项目进度
    newsContent: "2018年7月初行业测试信息共享平台正式对客户开放试用，目前已得到数家基金公司的强烈号召与对应！",
    projectProgressImage: app.globalData.progressImg,

    // 历次质量报表的版本选择，版本数据
    array: app.globalData.versionArray,
    indexOfVersion: 0
  },


  /**
    * 生命周期函数--监听页面加载
    */
  onLoad: function () {
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
    wx.showNavigationBarLoading()
    this.onLoad()
    wx.hideNavigationBarLoading()
    wx.stopPullDownRefresh()
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

  clickProjectProcess: function() {
    console.log("跳转到项目详细界面");
    wx.navigateTo({
      url: app.globalData.projectProgressDetail,
    })
  },

  //历次质量报表，版本选择对应的处理函数
  selectVersion: function (e) {
    console.log('版本选择改变，携带值为', e.detail.value)

    this.setData({
      indexOfVersion: e.detail.value
    })
  },

  // 点击标签页进行切换
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  }
})
