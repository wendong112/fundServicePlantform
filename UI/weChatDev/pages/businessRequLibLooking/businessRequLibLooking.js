//获取应用实例 
const app = getApp()
var allList = [];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchContent: "",
    companyChecked: false,
    keywordChecked: false,

    // 需求列表
    reqList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    var that = this;
    wx.request({
      url: app.globalData.getAllBusinessReq,
      data: {},
      method: 'GET',
      success: function (res) {
        var list = res.data.getAllBusinessReq;
        console.log("查询结果:", res.data)
        if (list == undefined) {
          wx.showToast({
            title: "连接失败",
            icon: 'loading'
          });
        } else {
          allList = list;

          that.setData({
            reqList: list
          })
        }
      },
      fail: function () {
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

    var content = formData.searchContent.trim();
    var list = []
    console.log("开始提交搜索内容", formData);

    // 检查内容是否符合要求
    if (this.checkPageRight(formData)) {
      // 查看全部
      var allFlag = (findCompany == 0 && findKeyword == 0)
      if (allFlag) {
        console.log("本公司和关键字都为空，查看全部")
        list = allList
      }

      // 只查看本公司
      var onlyCompany = (findCompany != 0 && findKeyword == 0)
      if (onlyCompany) {
        console.log("只查看本公司");
        var currentCompany = wx.getStorageSync("currentCompany")
        for (var i in allList) {
          var item = allList[i]
          if (item.companyName == currentCompany) {
            list.push(item)
          }
        }
      }

      // 只查看关键字
      var onlyKeyWord = (findCompany == 0 && findKeyword != 0)
      if (onlyKeyWord) {
        console.log("只查看关键字");
        for (var i in allList) {
          var item = allList[i]
          if (item.requirementBriefDescription.indexOf(content) != -1 || item.requirementDescription.indexOf(content) != -1) {
            list.push(item)
          }
        }
      }

      // 本公司+关键字
      var companyKeyword = (findCompany != 0 && findKeyword != 0)
      if (companyKeyword) {
        console.log("本公司+关键字");
        var currentCompany = wx.getStorageSync("currentCompany")
        for (var i in allList) {
          var item = allList[i]
          if (item.companyName == currentCompany) {
            if (item.requirementBriefDescription.indexOf(content) != -1 || item.requirementDescription.indexOf(content) != -1) {
              list.push(item)
            }
          }
        }
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

    // 版本关键字未被勾选，有搜索内容
    var error2 = (findCompany == 0 && findKeyword == 0 && findContent != 0)
    if (error2) {
      console.log("版本关键字未被勾选，有搜索内容")
      wx.showToast({
        title: '选择勾选框',
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