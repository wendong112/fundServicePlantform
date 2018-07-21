// pages/businessRequSubmit/businessRequSubmit.js
var util = require("../../utils/util.js");
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    reqBriefDesc: '',
    reqDetailDesc: '',
    remark: ''
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
    wx.showModal({
      title: '温馨提示',
      content: '由于微信缺陷，每个区域输入后请点击键盘上的“完成”； 若有遗漏，可重新点击输入区域，之后点击键盘上的“完成”',
      showCancel: false,
      confrimText: "确定",
      confirmColor: "#8B0000"
    })
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
  
  reqSubmit: function(e) {
    console.log("触发提交操作")
    var formData = e.detail.value;
    var that = this;

    if (this.checkBriefNotEmpty(formData)) {
      console.log("开始提交")
      // 获取其他数据
      var telephone = wx.getStorageSync("telNum");
      var processStatus = "计划阶段"
      var tmpData = formData;
      tmpData["telephone"] = telephone
      tmpData["processStatus"] = processStatus
      tmpData["createDate"] = new Date

      //提交需求到数据库中
      console.log("提交数据到数据库中: ", tmpData)
      wx.showLoading({
        title: '加载中...',
      })
      wx.request({
        url: app.globalData.addBusinessReq,
        data: JSON.stringify(tmpData),
        method: 'POST',
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          wx.hideLoading()

          var result = res.data.addBusinessReq
          console.log("操作结果", res.data)
          if (result != true) {
            wx.showToast({
              title: "插入失败",
              icon: 'loading'
            });
          } else {
            // 清空数据
            console.log("清空表单数据")
            that.setData({
              reqBriefDesc: '',
              reqDetailDesc: '',
              remark: ''
            })

            // 弹出提示信息
            console.log("弹出提示信息")
            wx.showModal({
              title: '温馨提示',
              content: '业务需求提交成功！',
              showCancel: false,
              confrimText: "确定",
              confirmColor: "#8B0000"
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
  },

  // 检查需求概述已经填写
  checkBriefNotEmpty: function (param) {
    console.log("检查需求概述是否填写")
    var briefDes = param.requirementBriefDescription;
    if (briefDes.length == 0 || briefDes.trim().length == 0) {
      wx.showToast({
        title: '需求概述必填',
        icon: "loading"
      })
      return false;
    }

    // 返回信息正确
    return true;
  }
})