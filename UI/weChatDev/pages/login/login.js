// pages/login/login.js
var app = getApp()
var sliderWidth = 96 // 需要设置slider的宽度，用于计算中间位置
var util = require("../../utils/util.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["登录", "注册"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,

    companyName:"",
    index: 0,

    realName:"",
    registerTelephon:"",
    loginTelephon:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
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

  /**
   * 切换注册、登录
   */
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },

  /**
   * 记录公司
   */
  companyInput(e) {
    this.setData({
      companyName: e.detail.value
    })
  },

  /**
   * 记录姓名
   */
  nameInput: function(e){
    this.setData({
      realName: e.detail.value
    })
  },

  /**
   * 记录注册电话
   */
  telInput: function (e) {
    this.setData({
      registerTelephon: e.detail.value
    })
  },

  /**
   * 记录登录电话
   */
  loginTelInput:function(e){
    this.setData({
      loginTelephon: e.detail.value
    })
  },

  /**
   * 注册
   */
  register: function(e){
    var that = this
    var userInfo = e.detail.userInfo  //获取用户微信基础信息

    var userName = this.data.realName;
    var companyName = this.data.companyName;
    var telephone = this.data.registerTelephon;
    if (userName == "") {
      this.tip("姓名不能为空！");
      return;
    }

    if (companyName == "") {
      this.tip("公司名称不能为空！");
      return;
    }

    if (telephone == "") {
      this.tip("手机号不能为空！");
      return;
    } else if (!this.checkPhoneRight(telephone)) {
      this.tip("手机号不合法！");
      return;
    }

    var user = new Object();
    user.userName = userName
    user.companyName = companyName
    user.wechatId = app.globalData.userOpenid
    user.wechatName = userInfo.nickName
    user.headPath = userInfo.avatarUrl
    user.telephone = telephone
    user.authorizedFlag = "1"
    user.vipLevel = 0

    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: app.globalData.userRegister,
      data: JSON.stringify(user),
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        wx.hideLoading()

        var result = res.data.resultInfo
        if (result.status == 0) {
          //记录登录信息
          wx.setStorage({
            key: 'userInfo',
            data: user
          })
          
          app.globalData.userInfo = user

          wx.switchTab({
            url: "/pages/uniformTest/uniformTest"
          })
        } else {
          // 弹出提示信息
          console.log("弹出提示信息")
          that.tip(result.msg)
        }
      },
      fail: function () {
        wx.hideLoading()
        that.tip("系统错误")
      }
    })
  },

  /**
   * 用户登录
   */
  userLogin: function() {
    var that = this
    var telephone = this.data.loginTelephon

    if (telephone == "") {
      this.tip("手机号不能为空！")
      return;
    } else if (!this.checkPhoneRight(telephone)) {
      this.tip("手机号不合法！")
      return;
    }

    var user = new Object()
    user.wechatId = app.globalData.userOpenid
    user.telephone = telephone

    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: app.globalData.userLogin,
      data: JSON.stringify(user),
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        wx.hideLoading()

        var result = res.data.resultInfo
        console.log("操作结果", res)
        if (result.status == 0) {
          //记录登录信息
          wx.setStorage({
            key: 'userInfo',
            data: user
          })

          app.globalData.userInfo = result.data

          if (result.data.vipLevel == 0) {
            wx.switchTab({
              url: '/pages/uniformTest/uniformTest',
            })
          }

          if (result.data.vipLevel == 1) {
            wx.switchTab({
              url: '/pages/uniformTest/uniformTest',
            })
          }

          if (result.data.vipLevel == 2) {
            wx.switchTab({
              url: "/pages/qualityMessage/qualityMessage"
            })
          }
        } else {
          // 弹出提示信息
          console.log("弹出提示信息")
          that.tip(result.msg)
        }
      },
      fail: function () {
        wx.hideLoading()
        that.tip("系统错误")
      }
    })
  },

  // 检查手机号正确
  checkPhoneRight: function (telNum) {
    console.log("检查页面手机号是否合法")
    var phone = util.regexConfig().phone;
    if (!phone.test(telNum)) {
      return false;
    }

    // 返回信息正确
    return true;
  },

  /**
  * 提示
  */
  tip: function (msg) {
    wx.showModal({
      title: '提示',
      content: msg,
      showCancel: false
    })
  },
})