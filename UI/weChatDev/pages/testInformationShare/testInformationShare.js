// pages/testInformationShare/testInformationShare.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    /* 图片样式 */
    reqImg: app.globalData.reqImg,
    sceneImg: app.globalData.sceneImg,

    reqArray: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    console.log("查询数据库")
    var that = this;

    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: app.globalData.getTop3BusinessReq,
      data: {},
      method: 'GET',
      success: function (res) {
        var list = res.data.getTop3BusinessReq;
        console.log("查询结果", res.data)
        if (list == undefined) {
          wx.showToast({
            title: "连接失败",
            icon: 'loading'
          });
        } else {
          if (list.length == 0) {
            wx.showToast({
              title: '无结果',
              icon: "loading"
            })
          } else {
            that.setData({
              reqArray: list
            })
          }
        }
      },
      fail: function () {
        wx.showToast({
          title: '查询失败',
          icon: "loading"
        })
      },
      complete: function () {
        wx.hideLoading()
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

  // 点击提交测试需求按钮
  clickReqCommit: function() {
    console.log("点击提交测试需求按钮");
    wx.navigateTo({
      url: app.globalData.reqCommit,
    })
  },

  // 点击查看测试场景
  clickSceneView: function() {
    console.log("点击查看测试场景");
    wx.navigateTo({
      url: app.globalData.sceneView,
    })
  },

  // 跳转到业务场景详情界面
  clickSpecScene: function(e) {
    console.log(e.target);
    var reqId = e.target.id;
    console.log("跳转到业务场景详情界面", reqId);

    wx.navigateTo({
      url: app.globalData.sceneDetail + "?id=" + reqId,
    })
  }
})