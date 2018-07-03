// pages/loginRegisterPage/loginRegisterPage.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dialogShow: true,
    searchImage: app.globalData.searchImage,
    commitImage: app.globalData.commitImage,
  },

  /**
    * 生命周期函数--监听页面加载
    */
  onLoad: function () {
    var leftCavArray = {
      canvasName: "leftCanvas"
    }
    this.drawCircle(leftCavArray);

    var rightCavArray = {
      canvasName: "rightCanvas"

    }
    this.drawCircle(rightCavArray);

    // 判断逻辑
    var storeTelNum = wx.getStorageSync("telNum");

    console.log("缓存手机号为: ", storeTelNum);
    // 已经登录过
    if (storeTelNum.length != 0) {
      console.log("已经登录过, 直接跳转到首页");
      wx.switchTab({
        url: app.globalData.firstTab,
      })
    } else {
      console.log("没有登录过, 停留在注册页面")
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

  clickCancel: function () {
    console.log("跳转到注册界面")
    wx.navigateTo({
      url: app.globalData.registerPage,
    })
  },

  clickConfirm: function() {
    console.log("跳转到登录界面")
    wx.navigateTo({
      url: app.globalData.loginPage,
    })
  },

  drawCircle: function (cavArray) {
    console.log("准备进行绘图")
    var height = wx.getSystemInfoSync().windowHeight;
    var width = wx.getSystemInfoSync().windowWidth
    console.log("屏幕高度:", height)
    console.log("屏幕宽度:", width)

    // 获取参数
    var position = cavArray.position;
    var canvasName = cavArray.canvasName;
    var title = cavArray.title;
    var percent = cavArray.percent;

    var x = width * 0.24
    var y = height * 0.11
    var radius = width * 0.13

    if (height < 600) {
      y = height * 0.15
    }

    // 页面渲染完成
    var cxt_arc = wx.createCanvasContext(canvasName);//创建并返回绘图上下文context对象
    // 外层圆圈
    cxt_arc.setLineWidth(16);
    cxt_arc.setStrokeStyle('#d2d2d2');
    cxt_arc.setLineCap('round')
    cxt_arc.beginPath();//开始一个新的路径
    cxt_arc.arc(x, y, radius, 0, 2 * Math.PI, false);//设置一个原点(106,106)，半径为100的圆的路径到当前路径
    cxt_arc.stroke();//对当前路径进行描边

    //内层圆圈
    cxt_arc.setLineWidth(16);
    cxt_arc.setStrokeStyle('#8b0000');
    cxt_arc.setLineCap('round')
    cxt_arc.beginPath();//开始一个新的路径
    cxt_arc.arc(x, y, radius, 0, 2 * Math.PI, false);
    cxt_arc.stroke();//对当前路径进行描边

    cxt_arc.draw();
  }

})
