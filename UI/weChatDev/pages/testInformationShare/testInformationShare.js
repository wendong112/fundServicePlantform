// pages/testInformationShare/testInformationShare.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    /* 图片样式 */
    reqImg: app.globalData.reqImg,
    sceneImg: app.globalData.sceneImg,

    reqArray: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //
    // 从数据库中获取相关的需求的id，日期，共建伙伴，详情
    //
    this.setData({
      reqArray: [{
        requirementId: "1",
        requirementBriefDescription: "ETF发行短业务测试场景库",
        requirementDescription: "基于跨市场债券ETF，分别对上交所深交所发行端的银行间交易流程（包含指令端、交易端、清算过程、财务对账）",
        company: "南方基金",
        topFlag: "1",
        createDate: "2018-5-30 14:05:20"
      }, {
        requirementId: "5",
        requirementBriefDescription: "银行间债券借贷业务",
        requirementDescription: "test基于跨市场债券ETF，分别对上交所深交所发行端的银行间交易流程（包含指令端、交易端、清算过程、财务对账）",
        company: "测试基金",
        topFlag: "2",
        createDate: "2018-5-30 13:05:20"
      }, {
        requirementId: "8",
        requirementBriefDescription: "证券公司间债券借贷业务",
        requirementDescription: "testtest基于跨市场债券ETF，分别对上交所深交所发行端的银行间交易流程（包含指令端、交易端、清算过程、财务对账）",
        company: "华夏基金",
        topFlag: "3",
        createDate: "2018-5-31 13:05:20"
      }]
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

  // 点击提交测试需求按钮
  clickReqCommit: function() {
    console.log("点击提交测试需求按钮");
    wx.navigateTo({
      url: app.globalData.reqCommit,
    })
  },

  // 点击查看测试场景
  clickSceneView: function() {
    console.log("点击查看测试场景");
    wx.navigateTo({
      url: app.globalData.sceneView,
    })
  },

  // 跳转到业务场景详情界面
  clickSpecScene: function(e) {
    console.log(e.target);
    var reqId = e.target.id;
    console.log("跳转到业务场景详情界面", reqId);
    //
    //
    //
  }
})