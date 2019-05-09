// pages/my/my.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModal: false,

    userName:"",      //用户名
    userCompany:"",   //用户公司
    headPath:"",      //头像路径

    userNewMessage:0, //用户新消息数
    userlogin:false,  //用户登录标志
    isVipUser:false   //是否vip用户
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

    this.setData({
      userNewMessage: app.globalData.userNewMessage,
    })

    //检查是否登录
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        if (res.data.wechatId == app.globalData.userOpenid){
          var ifVip = app.globalData.userInfo.vipLevel == 2 ? true : false
          that.setData({
            userlogin: true,
            userName: app.globalData.userInfo.userName,
            userCompany: app.globalData.userInfo.companyName,
            headPath: app.globalData.userInfo.headPath,
            isVipUser: ifVip
          })
        }
      },
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
    var that = this
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        if (res.data.wechatId == app.globalData.userOpenid) {
          var ifVip = app.globalData.userInfo.vipLevel == 2 ? true : false
          that.setData({
            userlogin: true,
            userName: app.globalData.userInfo.userName,
            userCompany: app.globalData.userInfo.companyName,
            headPath: app.globalData.userInfo.headPath,
            isVipUser: ifVip
          })
        }
      },
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

  login: function() {
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },

  /**
   * 展示联系客服弹窗
   */
  showTel: function() {
    this.actioncnt()
  },

  /**
   * 联系客服弹窗
   */
  actioncnt: function () {
    wx.showActionSheet({
      itemList: ['0411-84807328', '呼叫'],
      success: function (res) {

        if (res.tapIndex == 1){
          wx.makePhoneCall({
            phoneNumber: '0411-84807328'
          })
        }
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },

  /**
   * 切换行业系统
   */
  changeIndustry: function () {
    wx.showActionSheet({
      itemList: ['基金O32'],
      success: function (res) {
        console.log(res.tapIndex)
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },

  /**
   * 检查未读消息
   */
  checkNewMessage:function(){
    app.globalData.userNewMessage = 0
    this.setData({
      userNewMessage: 0
    })
    
    //关闭红点
    wx.hideTabBarRedDot({
      index: 3,
    })

    //更新用户已读测试进度数量
    wx.getStorage({
      key: 'userReadMessage',
      success: function (res) {
        var userReadMessage = res.data
        userReadMessage.readinformationCont = app.globalData.currInformmationCont

        wx.setStorage({
          key: 'userReadMessage',
          data: userReadMessage
        })
      },
    })
  },

  /**
   * 退出登录
   */
  loginOut: function(){
    var that = this
    wx.removeStorage({
      key: 'userInfo',
      success(res) {
        app.globalData.userInfo = null
        that.setData({
          userlogin: false,
          userName: "",
          userCompany: "",
          headPath: ""
        })
      }
    })
  },

  advertisement: function(){
    wx.navigateTo({
      url: '/pages/my/webpage/webpage',
    })
  },

  // 外面的弹窗
  btn: function () {
    this.setData({
      showModal: true
    })
  },

  // 禁止屏幕滚动
  preventTouchMove: function () {
  },

  // 弹出层里面的弹窗
  ok: function () {
    this.setData({
      showModal: false
    })
  },

  /**
  *  图片预览方法
  *  此处注意的一点就是，调用 "wx.previewImage"时，第二个参数要求为数组形式哦
  *  当然，做过图片上传功能的应该会注意到，如果涉及到多张图片预览，图片链接数组集合即为参数 urls！
  */
  previewImage: function (e) {
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current,
      urls: [current]
    })
  }
})