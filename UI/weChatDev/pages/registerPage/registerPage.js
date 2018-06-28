// pages/registerPage/registerPage.js
var util = require("../../utils/util.js");
const app = getApp();
var nickName = "";

Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取微信昵称，用于插入数据库

    wx.getUserInfo({
      success: function (res) {
        nickName = res.userInfo.nickName;
        console.log("注册界面，获取用户昵称:", nickName);
      },
      fail: function () {
        console.log("获取昵称失败");
      }
    });

    this.setData ({
        array: ["南方基金", "测试基金", "其他基金"],
        index: 0
      }
    )
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

  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  formRegister: function (e) {
    console.log("当前用户使用用户的昵称:", nickName);

    // 获取表单信息
    var that = this;
    var formData = e.detail.value;
    console.log("表单信息: ", formData);

    // 注册页面信息跳转
    if (this.checkPageMsg(formData)) {
      // 页面信息插入数据库
      //
      //
      //
      //

      // 弹出提示信息
      wx.showModal({
        title: '温馨提示',
        content: '请先等待，我们确认后会第一时间联系您！',
        showCancel: false,
        confrimText: "确定",
        confirmColor: "#8B0000",
        success: function(res) {
          wx.reLaunch({
            url: app.globalData.startPage,
          })
        }
      })
    }
  },


  // 私有方法
  checkPageMsg: function(param) {
    console.log("检查页面信息是否合法！")
    // 检查用户名
    if (param.name.length == 0 || param.name.trim().length == 0) {
      wx.showToast({
        title: '姓名必填',
        icon: "loading"
      })
      return false;
    }

    // 检查公司名称
    if (param.companyName.length == 0) {
      wx.showToast({
        title: '公司名称必填',
        icon: "loading"
      })
      return false;
    }

    // 检查工作邮箱
    var email = util.regexConfig().email;
    if (!email.test(param.companyMailboxName)) {
      wx.showToast({
        title: '邮箱错误',
        icon: "loading"
      })
      return false;
    }

    // 检查手机号
    var phone = util.regexConfig().phone;
    if (!phone.test(param.telNumberName)) {
      wx.showToast({
        title: '手机号错误',
        icon: "loading"
      })
      return false;
    }

    // 返回信息正确
    return true;
  }
})