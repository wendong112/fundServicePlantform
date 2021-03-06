// pages/ringFirstPage/ringFirstPage.js

var wxCharts = require('../../utils/wxcharts.js');
const app = getApp();
var ringChart = null;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bugBriefArray: {},
    bugArray: {},

    searchImage: app.globalData.searchImage,
    commitImage: app.globalData.commitImage,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    var that = this;
    var telNum = wx.getStorageSync("telNum");
    console.log("当前用户的手机号为：", telNum)

    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: app.globalData.getFirstPageInfo,
      data: {
        "telephone": telNum
      },
      method: 'GET',
      success: function(res) {
        wx.hideLoading()

        var userBugList = res.data.getUserBugInfo;
        var mainBugList = res.data.getMainBugInfo
        console.log("查询结果:", res.data)
        if (userBugList == undefined || mainBugList == undefined) {
          wx.showToast({
            title: "连接失败",
            icon: 'loading'
          });
        } else {
          // 对用户缺陷信息进行处理
          var currentVersionName = userBugList[0].versionName;
          // 设置公共变量
          console.log("当前用户的生产版本", currentVersionName);
          wx.setStorageSync("currentVersionName", currentVersionName)

          if (currentVersionName == null) {
            console.log("没有缺陷版本")
            wx.showModal({
              title: '温馨提示',
              content: '您没有选择生产版本，请联系管理员修改！',
              showCancel: false,
              confrimText: "确定",
              confirmColor: "#8B0000"
            })

            // 画图
            that.drawCircleImg(1, 0)
          } else {
            console.log("找到对应数据")
            // 画图
            var bugFixNum = userBugList[0].bugFixNum
            var bugNum = userBugList[0].bugNum

            that.drawCircleImg(1, bugFixNum / bugNum)

            // 界面显示
            that.setData({
              bugBriefArray: userBugList[0]
            })
          }

          // 对主流缺陷进行分类处理
          var tmpArray = {}
          for (var i in mainBugList) {
            var item = mainBugList[i]
            if (!tmpArray[item.mainFlag]) {
              tmpArray[item.mainFlag] = [item]
            } else {
              tmpArray[item.mainFlag].push(item)
            }
          }
          console.log("主流缺陷：", tmpArray)
          // 界面显示
          that.setData({
            bugArray: tmpArray
          })

        }
      },

      fail: function() {
        wx.hideLoading()

        wx.showToast({
          title: '查询失败',
          icon: "loading"
        })
      }
    })
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
    wx.showNavigationBarLoading()
    this.onLoad()
    wx.hideNavigationBarLoading()
    wx.stopPullDownRefresh()
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
    return {
      title: app.globalData.transferTitle,
      path: app.globalData.startPage,
      imageUrl: app.globalData.transferImage
    }
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
      url: app.globalData.bugSearch + "?versionName=" + versionName,
    })
  },

  // 点击缺陷总数
  showTotalBug: function(e) {
    var versionName = e.currentTarget.dataset.version;
    console.log("查询版本为: ", versionName);
    console.log("点击缺陷总数，准备跳转到对应界面")
    wx.navigateTo({
      url: app.globalData.bugSearch + "?versionName=" + versionName,
    })
  },

  // 点击已修复
  showFixBug: function(e) {
    var versionName = e.currentTarget.dataset.version;
    console.log("查询版本为: ", versionName);
    console.log("点击已修复，准备跳转到对应界面")
    wx.navigateTo({
      url: app.globalData.bugSearch + "?versionName=" + versionName + "&status=修复",
    })
  },

  // 画圆圈
  drawCircleImg: function(leftPer, rightPer) {
    var leftCavArray = {
      canvasName: "leftCanvas",
      title: "缺陷总数",
      percent: leftPer * 2
    }
    this.drawCircle(leftCavArray);

    var rightCavArray = {
      canvasName: "rightCanvas",
      title: "  已修复",
      percent: rightPer * 2
    }
    this.drawCircle(rightCavArray);
  },

  drawCircle: function(cavArray) {
    console.log("准备进行绘图")
    var query = wx.createSelectorQuery();
    query.select("#leftCanvas").boundingClientRect()
    query.exec(function(res) {

      var width = res[0].width;
      var height = res[0].height;

      console.log("屏幕高度:", height)
      console.log("屏幕宽度:", width)

      // 获取参数
      var canvasName = cavArray.canvasName;
      var title = cavArray.title;
      var percent = cavArray.percent;

      var x = width * 0.5
      var y = height * (5 / 12)
      var radius = height * 1 / 4

      var text_x = x - radius * 0.6
      var text_y = y + radius * 0.1

      // 页面渲染完成
      var cxt_arc = wx.createCanvasContext(canvasName); //创建并返回绘图上下文context对象
      // 设置文字
      cxt_arc.setFontSize(13)
      cxt_arc.setFillStyle("#800000")
      cxt_arc.fillText(title, text_x, text_y);

      // 外层圆圈
      cxt_arc.setLineWidth(16);
      cxt_arc.setStrokeStyle('#d2d2d2');
      cxt_arc.setLineCap('round')
      cxt_arc.beginPath(); //开始一个新的路径
      cxt_arc.arc(x, y, radius, -0.5 * Math.PI, 1.5 * Math.PI, false);
      cxt_arc.stroke(); //对当前路径进行描边

      //内层圆圈
      cxt_arc.setLineWidth(16);
      cxt_arc.setStrokeStyle('#800000');
      cxt_arc.setLineCap('round')
      cxt_arc.beginPath(); //开始一个新的路径
      cxt_arc.arc(x, y, radius, -0.5 * Math.PI, Math.PI * (percent - 0.5), false);
      cxt_arc.stroke(); //对当前路径进行描边
      cxt_arc.draw();
    })
  }
})
