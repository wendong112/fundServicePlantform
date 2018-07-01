// pages/ringFirstPage/ringFirstPage.js

var wxCharts = require('../../utils/wxcharts.js');
const app = getApp();
var ringChart = null;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentVersion: "",
    bugTotalNum: "",
    bugFixNum: "",

    bugArray: {},

    searchImage: app.globalData.searchImage,
    commitImage: app.globalData.commitImage,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    // 设置页面元素
    //
    // 需要从数据库中获取
    //
    this.setData({
      currentVersion: "20170630B",
      bugTotalNum: 40,
      bugFixNum: 28,
      bugArray: {
        "top1":"证券买入指令成交时，资金未扣除费用",
        "top1Id": 1,
        "top2":"撤销债券买入指令后，可用资金未解冻",
        "top2Id": 2,
        "top3": "现货自动拆分，可用扣减计算错误",
        "top3Id": 3,
      }
    })
    // 画图
    var leftCavArray = {
      canvasName: "leftCanvas",
      title: "缺陷总数",
      percent: 2
    }
    this.drawCircle(leftCavArray);

    var rightCavArray = {
      canvasName: "rightCanvas",
      title: "  已修复",
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

  // 点击缺陷提交
  clickBugCommit: function(e) {
    console.log("点击缺陷提交，准备跳转页面");
    wx.navigateTo({
      url: app.globalData.bugCommit,
    })
  },

  // 点击缺陷搜索
  clickBugSearch: function(e) {
    console.log("点击缺陷搜索，准备跳转页面");
    wx.navigateTo({
      url: app.globalData.bugSearch,
    })
  },

  // 点击缺陷详情
  clickBugDetail: function(e) {
    var defectId = e.target.id;
    console.log("缺陷id为: ", defectId)
    console.log("点击缺陷详情，准备跳转到对应界面")
    wx.navigateTo({
      url: app.globalData.bugDetail + "?defectId=" + defectId,
    })
  },

  // 点击更多
  clickMore: function(e) {
    var versionName = e.target.id;
    console.log("查询版本为: ", versionName);
    console.log("点击更多，准备跳转到对应界面")
    wx.navigateTo({
      url: app.globalData.bugSearch + "?version=" + versionName,
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
    // 设置文字
    cxt_arc.setFontSize(13)
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
