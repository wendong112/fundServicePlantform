// pages/bugSearchingPage/bugSearchingPage.js

//获取应用实例 
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchContent: "",
    companyChecked: false,
    versionChecked: false,
    keywordChecked: false,
    //缺陷列表
    defectList: [],

    // 使用到的链接
    allBugURL: app.globalData.allBugURL,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var version = options.version;
    if (version == null) {
      console.log("没有入参传入", options);
      console.log("获取所有的缺陷进行展示: ", this.data.allBugURL);

      var that = this;

      // 获取全部bug进行初始展示
      //
      //
      //
      list = [{
        "id": 3,
        "createdUserId_Name": "清清",
        "title": "个别C类风控失效",
        "statusIdName": "新建"
      }, {
        "id": 2,
        "createdUserId_Name": "小月",
        "title": "CJHB处理异常3",
        "statusIdName": "新建"
        }, {
          "id": 1,
          "createdUserId_Name": "小心",
          "title": "补券任务处理异常",
          "statusIdName": "新建"
        }]

      that.setData({
        defectList: list
      })
    } else {
      console.log("搜索指定version: ", version)
      //
      //
      // 从数据库中获取指定数据
      //
      var list = [{
        "id": 1,
        "createdUserId_Name": "清清",
        "title": "跳转版本测试数据",
        "statusIdName": "新建"
      }]

      this.setData({
        searchContent: version,
        companyChecked: false,
        versionChecked: true,
        keywordChecked: false,
        //缺陷列表
        defectList: list,        
      })
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

  //处理radio的多次点击
  clickCompany: function(e) {
    this.setData({
      companyChecked: !this.data.companyChecked,
    })
  },

  // 按版本和按关键字互斥
  clickVersion: function(e) {
    if (this.data.versionChecked == false) {
      this.setData({
        versionChecked:true,
        keywordChecked: false,
      })
    } else {
      this.setData({
        versionChecked: false,
      })
    }
  },

  clickKeyword: function (e) {
    if (this.data.keywordChecked == false) {
      this.setData({
        keywordChecked: true,
        versionChecked: false,
      })
    } else {
      this.setData({
        keywordChecked: false,
      })
    }
  },

  // 提交需求
  searchFormSubmit: function (e) {
    var that = this;
    var formData = e.detail.value;

    var findCompany = formData.searchCompany.length;
    var findVersion = formData.searchVersion.length;
    var findKeyword = formData.searchKeyword.length;
    var findContent = formData.searchContent.trim().length;

    var content = formData.searchContent;
    var list = []
    console.log("开始提交搜索内容", formData);
    
    // 检查内容是否符合要求
    if (this.checkPageRight(formData)) {
      // 只查看本公司
      var onlyCompany = (findCompany != 0 && findVersion == 0 && findKeyword == 0)
      if (onlyCompany) {
        console.log("只查看本公司");
        //
        //
        //
        list = [{
          "id": 1,
          "createdUserId_Name": "林梓",
          "title": "公司内部测试数据",
          "statusIdName": "新建"
        }]
      }

      // 只查看版本
      var onlyVersion = (findCompany == 0 && findVersion != 0)
      if (onlyVersion) {
        console.log("只查看版本");
        //
        //
        //
        list = [{
          "id": 1,
          "createdUserId_Name": "小月",
          "title": "版本测试数据",
          "statusIdName": "新建"
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
          "id": 1,
          "createdUserId_Name": "清清",
          "title": "关键字测试数据",
          "statusIdName": "新建"
        }]
      }
      
      // 本公司+版本
      var companyVersion = (findCompany != 0 && findVersion != 0)
      if (companyVersion) {
        console.log("本公司+版本");
        //
        //
        //
        list = [{
          "id": 1,
          "createdUserId_Name": "test",
          "title": "本公司+版本",
          "statusIdName": "新建"
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
          "id": 1,
          "createdUserId_Name": "test",
          "title": "本公司+关键字",
          "statusIdName": "新建"
        }]
      }

      that.setData({
        defectList: list,
      })
    }


  },

  checkPageRight: function(formData) {
    var findCompany = formData.searchCompany.length;
    var findVersion = formData.searchVersion.length;
    var findKeyword = formData.searchKeyword.length;
    var findContent = formData.searchContent.trim().length;

    // 版本关键字被勾选，没有搜索内容
    var error1 = ((findVersion != 0 || findKeyword != 0) && findContent == 0)
    
    if (error1) {
      console.log("版本关键字被勾选，没有搜索内容")
      wx.showToast({
        title: '内容必填',
        icon: "loading",
        duration: 2000,
      })

      return false;
    }

    // 版本关键字不勾选，本公司也为空
    var error2 = (findCompany == 0 && findVersion == 0 && findKeyword == 0)
    if (error2) {
      console.log("版本关键字不勾选，本公司也为空")
      wx.showToast({
        title: '勾选框必选',
        icon: "loading",
        duration: 2000,
      })

      return false;
    }

    return true;
  },

  // 跳转到缺陷详情中
  clickDetail: function(e) {
    var id = e.target.id;
    console.log("跳转到缺陷详情中", id)
    wx.navigateTo({
      url: app.globalData.bugDetail + "?defectId=" + id,
    })
  }
})