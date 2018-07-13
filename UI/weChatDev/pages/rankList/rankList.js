// pages/rankList/rankList.js
const app = getApp();
var modifyArray = {}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgSrc: app.globalData.redStarImg,
    listData: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    console.log("从数据库中取数据并加值和重新排序")
    var that = this;
    var telNum = wx.getStorageSync("telNum")
    console.log("当前用户的手机号码", telNum)

    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: app.globalData.getRankList,
      data: {},
      method: 'GET',
      success: function (res) {
        wx.hideLoading()

        var allList = res.data.getRankList;
        console.log("查询结果:", res.data)
        if (allList == undefined) {
          wx.showToast({
            title: "连接失败",
            icon: 'loading'
          });
        } else {
          var result = []
          // 添加第一个元素
          for (var i = 0; i < allList.length; i++) {
            if (allList[i].telephone == telNum) {
              allList[i]["imageSrc"] = app.globalData.grayHeartImg
              allList[i]["hasChange"] = false
              result.push(allList[i])
            }
          }

          // 添加其他元素
          for (var i = 0; i < allList.length; i++) {
            allList[i]["imageSrc"] = app.globalData.grayHeartImg
            allList[i]["hasChange"] = false
            result.push(allList[i])

          }
          that.setData({
            listData: result,
          })
        }
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    console.log("清空待操作的表");
    modifyArray = {}
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    for (var key in modifyArray) {
      var tmpData = modifyArray[key]
      console.log("更新", tmpData)
  
      wx.request({
        url: app.globalData.modifyLikeCountByPhone,
        data: JSON.stringify(tmpData),
        method: 'POST',
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          var result = res.data.modifyLikeCountByPhone
          console.log("操作结果:", res.data)
          if (result != true) {
            console.log("操作失败")
          } else {
            console.log("操作成功")
          }
        }
      })
    }
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

  },

  // 点击赞
  clickAgree: function(e) {
    var index = e.currentTarget.dataset.curindex;
    console.log("点击的行数为：", index)

    var currentList = this.data.listData;

    var item = currentList[index]
    if (item) {
      var hasChange = item.hasChange;
      if (hasChange !== undefined) {
        var onum = item.likeCount;
        if (hasChange) {
          item.likeCount = (parseInt(onum) - 1);
          item.hasChange = false;
          item.imageSrc = app.globalData.grayHeartImg
        } else {
          item.likeCount = (parseInt(onum) + 1);
          item.hasChange = true;
          item.imageSrc = app.globalData.redHeartImg
        }

        // 变化加入modifyList中
        modifyArray[item.serialNo] = item
        console.log(modifyArray)

        // 设置界面
        this.setData({
          listData: currentList
        })
      }
    }
  }
})