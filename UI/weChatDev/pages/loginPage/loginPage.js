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
    wx.getUserInfo({
      success: function (res) {
        nickName = res.userInfo.nickName;
        console.log("登录界面获取的昵称:", nickName);
      },
      fail: function () {
        console.log("获取昵称失败");
      }
    });
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

  loginSubmit: function (e) {
    var that = this;
    var formData = e.detail.value;
    var telNum = formData.telNumberName;

    // 登录页面信息跳转
    //
    // 可能需要修改
    //
    //
    if (this.checkPhoneRight(telNum) && this.checkPhoneMatch(telNum) && this.checkNickMatch(telNum)) {
      wx.switchTab({
        url: app.globalData.firstTab,
      })
    }

  },

  // 检查手机号正确
  checkPhoneRight: function (telNum) {
    console.log("检查页面手机号是否合法")
    var phone = util.regexConfig().phone;
    if (!phone.test(telNum)) {
      wx.showToast({
        title: '手机号错误',
        icon: "loading"
      })
      return false;
    }

    // 返回信息正确
    return true;
  },

  // 检查当前用户手机号与数据库一致
  checkPhoneMatch: function (telNum) {
    // 待完成，需要和数据库联调
    //
    //
    //
    console.log("检查输入手机号是否在数据库中");
    console.log("当前手机号: ", telNum);
    var dbPhone = "15140335343";
    if (dbPhone == telNum) {
      return true;
    } else {
      // 弹出提示信息
      wx.showModal({
        title: '温馨提示',
        content: '未找到匹配手机号，请先注册！',
        showCancel: false,
        confrimText: "确定",
        confirmColor: "#8B0000",
        success: function(res) {
          if(res.confirm) {
            wx.navigateTo({
              url: app.globalData.registerPage,
            })
          }
        }
      });
      return false;
    }

  },

  // 检查当前用户昵称与数据库一致
  checkNickMatch: function (telNum) {
    //待完成，需要和数据库联调
    //
    //
    //
    

    // 获取微信昵称，用于比对
    console.log("检查昵称是否在数据库中");
    console.log("当前使用微信的昵称为: ", nickName);
    var dbNick = "清清";
    // 比对昵称
    if (dbNick == nickName) {
      // 记录登录信息
      wx.setStorageSync("telNum", telNum);

      // 出现成功信息
      wx.showToast({
        title: '登录成功',
        icon: "success"
      });
      return true;

    } else {
      // 弹出提示信息
      //
      //
      //
      //
      //
      console.log("数据库中找不到对应昵称！")
      wx.showModal({
        title: '温馨提示',
        content: '登录昵称与注册时昵称不相符，请联系管理员修改或重新注册！',
        showCancel: false,
        confrimText: "确定",
        confirmColor: "#8B0000",
        success: function(res) {
          if (res.confirm) {
            wx.reLaunch({
              url: app.globalData.startPage,
            })
          }
        }
      });
      return false;
    }
  }
})