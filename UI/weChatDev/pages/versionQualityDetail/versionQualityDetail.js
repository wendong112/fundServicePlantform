// pages/versionQualityDetail/versionQualityDetail.js
var wxCharts = require('../../utils/wxcharts.js');
var app = getApp();
var pieChart = null;
var versionMsg; //版本信息
var severity = ["致命", "严重", "一般", "轻微", "建议"]
// var severityColor = ["#D32F2F", "#F44336", "#FF9800", "#FFEB3B", "#CDDC39"]
var severityColor = ["#173246", "#994D52", "#D9742B", "#E6B450", "#E3E6C3"]
var scoreColors = ["#4CAF50", "#FF8000","#FF0000"]

Page({

  /**
   * 页面的初始数据
   */
  data: {
    versionName: "",
    versionScore: "",
    versionScoreColor: "",
    qualityList: [],
    moduleList: [],
    canvasHeight: 380
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    var windowWidth = 207;
    var windowHeight = 125;
    versionMsg = JSON.parse(options.versionMsg) //获取父页面传来的版本信息

    // 根据版本名称获取版本质量信息
    var qualityList = [{
        name: "指令管理",
        moduleScore: versionMsg.modleInstructMark,
        weight: "0.3",
        qualityScore: versionMsg.instructMark,
      },
      {
        name: "交易管理",
        moduleScore: versionMsg.modleTransactionMark,
        weight: "0.3",
        qualityScore: versionMsg.transactionMark
      },
      {
        name: "风险控制",
        moduleScore: versionMsg.modleRiskMark,
        weight: "0.3",
        qualityScore: versionMsg.riskMark
      },
      {
        name: "其他模块",
        moduleScore: versionMsg.modleOtherMark,
        weight: "0.1",
        qualityScore: versionMsg.otherMark
      },
    ]

    //根据版本名称获取当个模块的信息
    var moduleList = [{
        name: "指令管理模块评分",
        P0: versionMsg.modleInstructMarkDefect.modleDeadlyDefect,
        P1: versionMsg.modleInstructMarkDefect.modleFatefulDefect,
        P2: versionMsg.modleInstructMarkDefect.modleGeneralDefect,
        P3: versionMsg.modleInstructMarkDefect.modleSlightDefect,
        P4: versionMsg.modleInstructMarkDefect.modleSuggestedDefect,
        deftRepaired: versionMsg.instructMarkRepaired,
        total: versionMsg.modleInstructMark,
      },
      {
        name: "交易管理模块评分",
        P0: versionMsg.modleTransactionMarkDefect.modleDeadlyDefect,
        P1: versionMsg.modleTransactionMarkDefect.modleFatefulDefect,
        P2: versionMsg.modleTransactionMarkDefect.modleGeneralDefect,
        P3: versionMsg.modleTransactionMarkDefect.modleSlightDefect,
        P4: versionMsg.modleTransactionMarkDefect.modleSuggestedDefect,
        deftRepaired: versionMsg.transactionMarkRepaired,
        total: versionMsg.modleTransactionMark,
      },
      {
        name: "风险控制模块评分",
        P0: versionMsg.modleRiskMarkDefect.modleDeadlyDefect,
        P1: versionMsg.modleRiskMarkDefect.modleFatefulDefect,
        P2: versionMsg.modleRiskMarkDefect.modleGeneralDefect,
        P3: versionMsg.modleRiskMarkDefect.modleSlightDefect,
        P4: versionMsg.modleRiskMarkDefect.modleSuggestedDefect,
        deftRepaired: versionMsg.riskMarkRepaired,
        total: versionMsg.modleRiskMark,
      },
      {
        name: "其他模块评分",
        P0: versionMsg.modleOtherMarkDefect.modleDeadlyDefect,
        P1: versionMsg.modleOtherMarkDefect.modleFatefulDefect,
        P2: versionMsg.modleOtherMarkDefect.modleGeneralDefect,
        P3: versionMsg.modleOtherMarkDefect.modleSlightDefect,
        P4: versionMsg.modleOtherMarkDefect.modleSuggestedDefect,
        deftRepaired: versionMsg.otherMarkRepaired,
        total: versionMsg.modleOtherMark,
      }
    ]

    var versionColor;

    if (versionMsg.score >= 90) {
      versionColor = scoreColors[0]
    } else if (versionMsg.score >= 60) {
      versionColor = scoreColors[1]
    } else {
      versionColor = scoreColors[2]
    }

    //页面显示
    that.setData({
      versionName: versionMsg.versionName,
      versionScore: versionMsg.score,
      versionColor: versionColor,
      qualityList: qualityList,
      moduleList: moduleList,
      canvasHeight: windowHeight
    })

    // 画图
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth / 2;
      windowHeight = that.data.canvasHeight + 20;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }

    // 进行画图
    for (var i in moduleList) {
      var tmpArray = moduleList[i]
      tmpArray["canvasId"] = "canvas"+i
      tmpArray["width"] = windowWidth
      tmpArray["height"] = windowHeight
      that.drawCircle(tmpArray)
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  drawCircle: function(canvasArray) {
    var dataList = new Array()

    if (canvasArray.P0 != 0){
      var serie = new Object()
      serie.name = severity[0]
      serie.data = canvasArray.P0
      serie.color = severityColor[0]
      serie.format = function () {
        return severity[0] + ":" + canvasArray.P0
      }
      dataList.push(serie)
    }

    if (canvasArray.P1 != 0) {
      var serie = new Object()
      serie.name = severity[1]
      serie.data = canvasArray.P1
      serie.color = severityColor[1]
      serie.format = function () {
        return severity[1] + ":" + canvasArray.P1
      }
      dataList.push(serie)
    }

    if (canvasArray.P2 != 0) {
      var serie = new Object()
      serie.name = severity[2]
      serie.data = canvasArray.P2
      serie.color = severityColor[2]
      serie.format = function () {
        return severity[2] + ":" + canvasArray.P2
      }
      dataList.push(serie)
    }

    if (canvasArray.P3 != 0) {
      var serie = new Object()
      serie.name = severity[3]
      serie.data = canvasArray.P3
      serie.color = severityColor[3]
      serie.format = function () {
        return severity[3] + ":" + canvasArray.P3
      }
      dataList.push(serie)
    }

    if (canvasArray.P4 != 0) {
      var serie = new Object()
      serie.name = severity[4]
      serie.data = canvasArray.P4
      serie.color = severityColor[4]
      serie.format = function () {
        return severity[4] + ":" + canvasArray.P4
      }
      dataList.push(serie)
    }

    if (dataList.length == 0){
      var serie = new Object()
      serie.name = "未发现"
      serie.data = 1
      serie.format = function () {
        return "未发现"
      }

      dataList.push(serie)
    }

    pieChart = new wxCharts({
      animation: true,
      canvasId: canvasArray.canvasId,
      type: 'pie',
      dataPointShape:false,
      series: dataList,
      width: canvasArray.width,
      height: canvasArray.height,
      dataLabel: true,
      legend: false
    });
  }
})