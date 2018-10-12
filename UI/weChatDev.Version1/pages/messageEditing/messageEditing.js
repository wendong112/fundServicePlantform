const app = getApp();
var defectId = "";
var updateAtTelephone = ""

Page({

  /**
   * 页面的初始数据
   */
  data: {
    atHidden: true,
    atUserName: "",
    title: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("页面入参", options)
    var that = this;
    var id = options.defectId;
    var atUserName = options.atUserName;
    var atTelephone = options.atTelephone;

    // 设置公共变量
    defectId = id
    updateAtTelephone = atTelephone

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
      
      // 是否展示回复信息
      if (atUserName != undefined) {
        that.setData({
          atHidden: false,
          atUserName: atUserName
        })
      } else {
        that.setData({
          atHidden: true,
          atUserName: ""
        })
      }
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
    return {
      title: app.globalData.transferTitle,
      path: app.globalData.startPage,
      imageUrl: app.globalData.transferImage
    }
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
    
    // 设置回复人手机号码
    if (updateAtTelephone != undefined) {
      tmpData["atTelephone"] = updateAtTelephone
    }

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
            title: "留言失败",
            icon: 'loading'
          });
        } else {
          // 留言成功
          wx.hideLoading()
          console.log("跳转回上一页")
          wx.navigateBack({});
        }
      },
      fail: function () {
        wx.hideLoading()
        wx.showToast({
          title: '留言提交失败',
          icon: "loading"
        })
      }
    })

  }
})