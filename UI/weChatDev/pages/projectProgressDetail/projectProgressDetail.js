// pages/projectProgressDetail/projectProgressDetail.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    projectArray: [],
    index: 0,

    threeLineIcon: app.globalData.threeLineIcon
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this;

    // 获取项目详情
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: app.globalData.getProjectProgress,
      data: {},
      method: 'GET',
      success: function (res) {
        wx.hideLoading()

        var list = res.data.getProjectProgress;
        console.log("查询结果:", res.data)
        if (list == undefined) {
          wx.showToast({
            title: "连接失败",
            icon: 'loading'
          });
        } else {
          // 页面设置
          that.setData({
            projectArray: list
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
    return {
      title: app.globalData.transferTitle,
      path: app.globalData.startPage,
      imageUrl: app.globalData.transferImage
    } 
  },

  //历次质量报表，版本选择对应的处理函数
  selectProject: function (e) {
    console.log('选中的picker携带值为', e.detail.value)

    this.setData({
      index: e.detail.value
    })
  },
})