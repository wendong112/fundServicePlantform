// pages/bugManager/bugManager.js
const app = getApp();

var sortBriefIndex = 0
var sortIdIndex = 0
var sortStatusIndex = 0
var sortUserIndex = 0
var sortVersionNameIndex = 0

var userAllbug = []

Page({

  /**
   * 页面的初始数据
   */
  data: {
    defectCount: 0,   //缺陷统计
    sortIdDesc: true,
    sortBriefDesc: true,
    sortStatusDesc: true,
    sortUserDesc: true,
    sortVersionNameDesc: true,

    searchContent:"",

    bugList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

    var user = new Object()
    user.wechatId = app.globalData.userInfo.wechatId
    console.log(user.wechatId)
    wx.showLoading({
      title: '数据加载中..',
    })

    wx.request({
      url: app.globalData.getUserDefectList,
      data: JSON.stringify(user),
      method: 'POST',
      success: function (res) {
        wx.hideLoading()

        userAllbug = res.data.userDefectList
        
        that.setData({
          bugList: userAllbug,
          defectCount: userAllbug.length
        })
      },
      fail: function () {
        wx.hideLoading()

        wx.showToast({
          title: '查询失败',
          icon: "loading"
        })
      }
    })

  },

  /**
  * 提示
  */
  tip: function (msg) {
    wx.showModal({
      title: '提示',
      content: msg,
      showCancel: false
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

  clickDetail: function (e) {
    var index = e.currentTarget.id
    var targetDefect = this.data.bugList[index]
    var defect = JSON.stringify(targetDefect)
 
    wx.navigateTo({
      url: '/pages/defectDetailedInfo/defectDetailedInfo?defect=' + defect
    })
  },

  // 点击id部分的排序
  sortById: function (e) {
    var that = this;
    // 点击第一次根据从小到大的顺序排序
    var tmpList = that.data.bugList;
    if (sortIdIndex % 2 == 0) {
      tmpList.sort(that.compareUp(tmpList, "id"))
      that.setData({
        bugList: tmpList,
        sortIdDesc: false
      })
    } else {
      tmpList.sort(that.compareDown(tmpList, "id"))
      that.setData({
        bugList: tmpList,
        sortIdDesc: true
      })
    }

    sortIdIndex += 1
  },

  // 点击title部分进行排序
  sortByBrief: function (e) {
    var that = this;
    var tmpList = that.data.bugList;
    // 点击第一次，根据中文排序
    if (sortBriefIndex % 2 == 0) {
      that.sortChinese(tmpList, "title")
      console.log("根据title中文排序：" + tmpList)
      that.setData({
        bugList: tmpList,
        sortBriefDesc: false
      })
      // 点击第二次降序
    } else {
      tmpList.reverse()
      console.log("根据中文反序：" + tmpList)
      that.setData({
        bugList: tmpList,
        sortBriefDesc: true
      })
    }

    sortBriefIndex += 1
  },

  // 点击status部分进行排序
  sortByStatus: function (e) {
    var that = this;
    var tmpList = that.data.bugList;
    // 点击第一次，根据中文排序
    if (sortStatusIndex % 2 == 0) {
      that.sortChinese(tmpList, "statusName")

      that.setData({
        bugList: tmpList,
        sortStatusDesc: false
      })
      // 点击第二次降序
    } else {
      tmpList.reverse()

      that.setData({
        bugList: tmpList,
        sortStatusDesc: true
      })
    }

    sortStatusIndex += 1
  },

  // 点击发现版本部分进行排序
  sortByVersionName: function (e) {
    var that = this;
    var tmpList = that.data.bugList;
    // 点击第一次，根据中文排序
    if (sortVersionNameIndex % 2 == 0) {
      that.sortChinese(tmpList, "versionName")

      that.setData({
        bugList: tmpList,
        sortVersionNameDesc: false
      })
      // 点击第二次降序
    } else {
      tmpList.reverse()

      that.setData({
        bugList: tmpList,
        sortVersionNameDesc: true
      })
    }

    sortVersionNameIndex += 1
  },

  //排序列表+字典中的数字
  compareUp: function (data, propertyName) { // 升序排序
    if ((typeof data[0][propertyName]) != "number") { // 属性值为非数字
      return function (object1, object2) {
        var value1 = object1[propertyName];
        var value2 = object2[propertyName];
        return value1.localeCompare(value2);
      }
    } else {
      return function (object1, object2) { // 属性值为数字
        var value1 = object1[propertyName];
        var value2 = object2[propertyName];
        return value1 - value2;
      }
    }
  },
  compareDown: function (data, propertyName) { // 降序排序
    if ((typeof data[0][propertyName]) != "number") { // 属性值为非数字
      return function (object1, object2) {
        var value1 = object1[propertyName];
        var value2 = object2[propertyName];
        return value2.localeCompare(value1);
      }
    } else {
      return function (object1, object2) { // 属性值为数字
        var value1 = object1[propertyName];
        var value2 = object2[propertyName];
        return value2 - value1;
      }
    }
  },

  // 排序列表+字典中的中文，参数：arr 排序的数组; dataLeven 数组内的需要比较的元素属性
  sortChinese: function (arr, dataLeven) {
    /* 获取数组元素内需要比较的值 */
    function getValue(option) { // 参数： option 数组元素
      if (!dataLeven) return option
      var data = option
      dataLeven.split('.').filter(function (item) {
        data = data[item]
      })
      return data + ''
    }
    arr.sort(function (item1, item2) {
      return getValue(item1).localeCompare(getValue(item2), 'zh-CN');
    })
  },

  changeInput: function(e) {
    this.setData({
      searchContent:e.detail.value
    })
  },

  searchBugSubmit: function (e) {
    var newBugList = new Array()
    for (var i = 0; i < userAllbug.length; i++){
      if (userAllbug[i].title.indexOf(this.data.searchContent) != -1){
        newBugList.push(userAllbug[i])
      }
    }

    this.setData({
      bugList: newBugList,
      defectCount: newBugList.length
    })
  }

})