const app = getApp();
var defectId = "";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var id = options.defectId;
    // 设置公共变量
    defectId = id

    if (id == undefined) {
      console.log("没有找到id")
    } else {
      // 查询缺陷详情
      wx.showLoading({
        title: '加载中...',
      })
      wx.request({
        url: app.globalData.getDefectById,
        data: { "id": id },
        method: 'GET',
        success: function (res) {
          wx.hideLoading()

          var list = res.data.getDefectById;
          console.log("查询结果:", res.data)
          if (list == undefined) {
            wx.showToast({
              title: "连接失败",
              icon: 'loading'
            });
          } else {
            that.setData({
              title: list[0].title
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

  // 点击提交按钮
  messageSubmit: function(e) {
    // 根据id更新留言界面
    var formData = e.detail.value;
    console.log("更新留言", formData);

    var telNum = wx.getStorageSync("telNum")
    var tmpData = formData;
    tmpData["defectId"] = defectId
    tmpData["telephone"] = telNum
    tmpData["messageDate"] = new Date

    //提交留言到数据库中
    console.log("提交数据到数据库中: ", tmpData)
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: app.globalData.addMessage,
      data: JSON.stringify(tmpData),
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        wx.hideLoading()

        var result = res.data.addMessage
        console.log("操作结果", res.data)
        if (result != true) {
          wx.showToast({
            title: "插入失败",
            icon: 'loading'
          });
        } else {
          // 弹出提示信息
          console.log("弹出提示信息")
          wx.showModal({
            title: '温馨提示',
            content: '留言插入成功！',
            showCancel: false,
            confrimText: "确定",
            confirmColor: "#8B0000",
            success: function(res) {
              console.log("跳转回上一页")

              wx.navigateBack({});
            }
          })
        }
      },
      fail: function () {
        wx.hideLoading()

        wx.showToast({
          title: '提交失败',
          icon: "loading"
        })
      }
    })

  }
})