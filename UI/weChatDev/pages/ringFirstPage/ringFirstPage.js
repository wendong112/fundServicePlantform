// pages/ringFirstPage/ringFirstPage.js

var wxCharts = require('../../utils/wxcharts.js');
var app = getApp();
var ringChart = null;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentVersion: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {

    var leftCavArray = {
      canvasName: "leftCanvas",
      title: "缺陷总数",
      percent: 2
    }
    this.drawCircle(leftCavArray);

    var rightCavArray = {
      canvasName: "rightCanvas",
      title: "已修复",
      percent: 1.5
    }
    this.drawCircle(rightCavArray);
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
    var radius = width * 0.1

    // 页面渲染完成
    var cxt_arc = wx.createCanvasContext(canvasName);//创建并返回绘图上下文context对象
    // 设置文字
    cxt_arc.setFontSize(12)
    cxt_arc.setFillStyle("#8B0000")
    cxt_arc.fillText(title, x - radius * 0.6, y + radius * 0.1);

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
    cxt_arc.arc(x, y, radius, 0, Math.PI * percent, false);
    cxt_arc.stroke();//对当前路径进行描边

    cxt_arc.draw();
  }
})
