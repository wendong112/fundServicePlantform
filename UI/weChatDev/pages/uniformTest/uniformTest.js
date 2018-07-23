// pages/uniformTest/uniformTest.js

const app = getApp();
var versionList = {};
var selectVersionName = wx.getStorageSync("currentVersionName");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['项目进展', '测试报告查询'],
    currentTab: 0,

    // 项目进度
    newsContent: "2018年7月初行业测试信息共享平台正式对客户开放试用，目前已得到数家基金公司的强烈号召与对应！",
    projectProgressImage: "",

    // 历次质量报表的版本选择，版本数据
    versionArray: {},
    index: 0,
    errorHidden: true,
    imgSrc: ""
  },


  /**
    * 生命周期函数--监听页面加载
    */
  onLoad: function () {
    // 获取当前生产版本
    console.log("获取当前生产版本")
    var currentVersion = wx.getStorageSync("currentVersionName")
    this.setData({
      projectProgressImage: app.globalData.uniformImgServerURL + "progress.png"
    })
    this.showReport({"currentVersionName": currentVersion})
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
  onPullDownRefresh: function (e) {
    wx.showNavigationBarLoading()
    this.setData({
      projectProgressImage: app.globalData.progressImg
    })
    this.showReport({ "currentVersionName": selectVersionName })
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

  showReport: function(e) {
    var that = this;
    var currentVersion = e.currentVersionName
    console.log("展示报告的版本名称", currentVersion)

    // 获取所有的版本
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: app.globalData.getAllVersion,
      data: {},
      method: 'GET',
      success: function (res) {
        wx.hideLoading()

        var list = res.data.getAllVersion;
        console.log("查询结果:", res.data)
        if (list == undefined) {
          wx.showToast({
            title: "连接失败",
            icon: 'loading'
          });
        } else {
          versionList = list
          var currentIndex = 0;

          // 获取index值
          for (var i in versionList) {
            var item = versionList[i]
            if (item.versionName == currentVersion) {
              console.log("获取index", i)
              currentIndex = i;
              break
            }
          }

          // 页面设置
          that.setData({
            versionArray: list,
            index: currentIndex,
            imgSrc: app.globalData.uniformImgServerURL + currentVersion + ".png"
          })
        }
      },
      fail: function () {
        wx.hideLoading()

        wx.showToast({
          title: '查询失败',
          icon: "loading"
        })
      }
    })
  },

  //历次质量报表，版本选择对应的处理函数
  selectVersion: function (e) {
    var that = this;
    var index = e.detail.value

    console.log('版本选择改变，携带值为', index )
    var tmpVersionName = versionList[index].versionName
    console.log("选中版本为", tmpVersionName)

    // 设置选中的版本名称
    selectVersionName = tmpVersionName

    that.setData({
      index: index,
      imgSrc: app.globalData.uniformImgServerURL + tmpVersionName + ".png"
    })
  },

  imageNotShow: function(e) {
    this.setData({
      errorHidden: false
    })
  },

  imageShow: function(e) {
    this.setData({
      errorHidden: true
    })
  },
  
  // 点击标签页进行切换
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  }
})
