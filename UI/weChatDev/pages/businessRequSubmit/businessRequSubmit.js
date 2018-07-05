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
    var formData = e.detail.value;
    var that = this;

    var currentDate = util.formatTime(new Date).replace(new RegExp("/",'g'), "-");
    console.log("提交缺陷的时间为", currentDate);

    if (this.checkBriefNotEmpty(formData)) {
      //提交需求到数据库中
      console.log("提交数据到数据库中: ", formData)
      //
      //
      //
      // 清空数据
      console.log("清空表单数据")
      this.setData({
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
        confirmColor: "#8B0000",
        /*
        success: function (res) {
          wx.reLaunch({
            url: app.globalData.startPage,
          })
        }*/
      })
    }
  },

  // 检查需求概述已经填写
  checkBriefNotEmpty: function (param) {
    console.log("检查需求概述是否填写")
    if (param.reqBriefDesc.length == 0 || param.reqBriefDesc.trim().length == 0) {
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