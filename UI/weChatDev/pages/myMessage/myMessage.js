// pages/myMessage/myMessage.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchCondition:"", //查询条件
    messageList:[],     //消息列表
    allMessageList:[]   //全部消息列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    app.globalData.userNewMessage = 0;

    //获取测试进度列表
    wx.request({
      url: app.globalData.getInformationList,
      data: {},
      method: 'GET',
      success: function (res) {
        var list = res.data.informationList

        var showList = new Array()
        if (list == undefined) {
        } else {

          for (var i = 0; i < list.length; i++) {
            console.log(list[i].content.length)
            var information = new Object()
            var date = list[i].date
            information.title = list[i].title
            information.date = list[i].date
            information.mainImg = list[i].materialList[0]
            information.description = list[i].content

            showList.push(information)
          }
        }

        that.setData({
          messageList: showList,
          allMessageList: showList
        })
      }
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

  /**
   * 获取查询条件
   */
  wxSearchInput:function(e){
    this.setData({
      searchCondition: e.detail.value
    })
  },

  /**
   * 消息搜索
   */
  search:function(){
    console.log(this.data.searchCondition)
    if (this.data.searchCondition != ""){
      var newMessageList = new Array();
      for (var i = 0; i < this.data.allMessageList.length; i++) {
        console.log(this.data.allMessageList[i].title)
        if (this.data.allMessageList[i].title.indexOf(this.data.searchCondition) != -1) {
          newMessageList.push(this.data.allMessageList[i])
        }
      }
      console.log(newMessageList);
      this.setData({
        messageList: newMessageList
      })
    } else{
      this.setData({
        messageList: this.data.allMessageList
      })
    }
  },

  /**
   * 查看消息详情
   */
  checkDetails: function(e){
    var index = e.currentTarget.dataset.index
    var message = JSON.stringify(this.data.messageList[index])
    wx.navigateTo({
      url: '/pages/uniformTest/userMessageDetails/userMessageDetails?message=' + message
    })
  }
})