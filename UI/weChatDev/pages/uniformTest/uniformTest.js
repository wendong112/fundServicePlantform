// pages/uniformTest/uniformTest.js

const app = getApp();
var versionList = {};

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
    versionArray: {},
    index: 0,
    imgSrc: ""
  },


  /**
    * 生命周期函数--监听页面加载
    */
  onLoad: function () {
    var that = this;
    // 获取所有的版本
    wx.showLoading({
      title: '加载中...',
    })
    console.log("获取所有版本")
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
          // 获取当前生产版本
          var currentVersion = wx.getStorageSync("currentVersionName")
          var currentIndex = 0;

          // 获取index值
          for (var i in versionList) {
            var item = versionList[i]
            if (item.versionName == currentVersion) {
              currentIndex = i;
              break
            }
          }

          // 页面设置
          that.setData({
            versionArray: list,
            index: currentIndex,
            imgSrc: app.globalData.uniformImgServerURL + currentVersion + ".jpg"
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
    var index = e.detail.value
    console.log('版本选择改变，携带值为', index )
    var tmpVersionName = versionList[index].versionName
    this.setData({
      index: index,
      imgSrc: app.globalData.uniformImgServerURL + tmpVersionName + ".jpg"
    })
  },

  // 点击标签页进行切换
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  }
})
