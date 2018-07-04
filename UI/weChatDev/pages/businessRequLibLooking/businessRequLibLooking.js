//获取应用实例 
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchContent: "",
    companyChecked: false,
    keywordChecked: false,
    //缺陷列表
    reqList: [],

    // 使用到的链接
    allReqURL: app.globalData.allReqURL,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    console.log("获取所有的需求进行展示: ", this.data.allReqURL);
    var that = this;

    var list = [{
      "requirementId": 3,
      "requirementBriefDescription": "股转市场集合竞价转让业务场景",
      "progressStatus": "已完成",
      "company": "南方基金"
    }, {
      "requirementId": 2,
      "requirementBriefDescription": "债券EFT发行端业务",
      "progressStatus": "对应中",
      "company": "华夏基金"
    }, {
      "requirementId": 1,
      "requirementBriefDescription": "银行间债券代结业务",
      "progressStatus": "对应中",
      "company": "益达基金"
      }]
    that.setData({
      reqList: list
    })

    // 获取全部需求进行初始展示
    /*
    wx.request({
      url: this.data.allReqURL,
      data: {},
      method: 'GET',
      success: function(res) {
        var list = res.data.requirementList;

        if (list == null) {
          console.log('获取数据失败', res.data.errMsg)

          wx.showToast({
            title: "获取数据失败",
            icon: 'loading',
            duration: 2000
          });

        } else {
          console.log("获取数据成功，进行页面展示");

          that.setData({
            reqList: list
          });
        }
      }
    }) */
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

  //处理radio的多次点击
  clickCompany: function (e) {
    this.setData({
      companyChecked: !this.data.companyChecked,
    })
  },

  clickKeyword: function (e) {
    this.setData({
      keywordChecked: !this.data.keywordChecked,
    })
  },

  // 提交需求
  searchFormSubmit: function (e) {
    var that = this;
    var formData = e.detail.value;

    var findCompany = formData.searchCompany.length;
    var findKeyword = formData.searchKeyword.length;
    var findContent = formData.searchContent.trim().length;

    var content = formData.searchContent;
    var list = []
    console.log("开始提交搜索内容", formData);

    // 检查内容是否符合要求
    if (this.checkPageRight(formData)) {
      // 只查看本公司
      var onlyCompany = (findCompany != 0 && findKeyword == 0)
      if (onlyCompany) {
        console.log("只查看本公司");
        //
        //
        //
        list = [{
          "requirementId": 3,
          "requirementBriefDescription": "只有本公司",
          "progressStatus": "已完成",
          "company": "南方基金"
        }]
      }

      // 只查看关键字
      var onlyKeyWord = (findCompany == 0 && findKeyword != 0)
      if (onlyKeyWord) {
        console.log("只查看关键字");
        //
        //
        //
        list = [{
          "requirementId": 2,
          "requirementBriefDescription": "只有关键字",
          "progressStatus": "已完成",
          "company": "南方基金"
        }]
      }

      // 本公司+关键字
      var companyKeyword = (findCompany != 0 && findKeyword != 0)
      if (companyKeyword) {
        console.log("本公司+关键字");
        //
        //
        //
        list = [{
          "requirementId": 2,
          "requirementBriefDescription": "本公司+关键字",
          "progressStatus": "已完成",
          "company": "南方基金"
        }]
      }

      that.setData({
        reqList: list,
      })
    }
  },

  checkPageRight: function (formData) {
    var findCompany = formData.searchCompany.length;
    var findKeyword = formData.searchKeyword.length;
    var findContent = formData.searchContent.trim().length;

    // 版本关键字被勾选，没有搜索内容
    var error1 = (findKeyword != 0 && findContent == 0)

    if (error1) {
      console.log("关键字被勾选，没有搜索内容")
      wx.showToast({
        title: '内容必填',
        icon: "loading",
        duration: 2000,
      })

      return false;
    }

    // 关键字不勾选，本公司也为空
    var error2 = (findCompany == 0 && findKeyword == 0)
    if (error2) {
      console.log("关键字不勾选，本公司也为空")
      wx.showToast({
        title: '勾选框必选',
        icon: "loading",
        duration: 2000,
      })

      return false;
    }

    return true;
  },

  // 跳转到需求详情界面
  clickDetail: function(e) {
    var reqId = e.target.id;
    console.log("跳转到需求详情界面", reqId)

    wx.navigateTo({
      url: app.globalData.sceneDetail + "?id=" + reqId,
    })
  }
})