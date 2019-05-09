// pages/uniformTest/uniformTest.js

var app = getApp()
var sliderWidth = 96    // 需要设置slider的宽度，用于计算中间位置
var myMessClickNum = 0  //我的消息tab页被点击次数

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["行业信息","共享测试"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,

    DataSource: [],
    
    photoWidth: wx.getSystemInfoSync().windowWidth / 5,

    popTop: 0, //弹出点赞评论框的位置
    popWidth: 0, //弹出框宽度
    isShow: true, //判断是否显示弹出框

    searchCondition: "", //查询条件
    messageList: [],     //消息列表
    allMessageList: [],   //全部消息列表

    userNewMessage:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

    this.setData({
      userNewMessage: app.globalData.userNewMessage
    })

    //关闭红点,我的消息也没有未读的情况关闭
    if (this.data.userNewMessage == 0){
      wx.hideTabBarRedDot({
        index: 2,
      })
    }

    //更新用户已读行业信息数量
    wx.getStorage({
      key: 'userReadMessage',
      success: function (res) {
        var userReadMessage = res.data
        userReadMessage.readinformationCont = app.globalData.currInformmationCont

        wx.setStorage({
          key: 'userReadMessage',
          data: userReadMessage
        })
      },
    })

    //获取共享测试列表
    wx.request({
      url: app.globalData.getUniformTestList,
      data: {},
      method: 'GET',
      success: function (res) {
        var list = res.data.uniformTestList
        var showList = new Array()
        if (list == undefined) {
        } else {

          for(var i = 0; i < list.length; i++){
            var uniformTest = new Object()
            var date = list[i].date
            uniformTest.month = date.substring(5,7)
            uniformTest.day = date.substring(8,10)
            uniformTest.ifFold = list[i].content.length > 66 ? true : false
            uniformTest.isFolded = list[i].content.length > 66 ? true : false
            uniformTest.content = list[i].content
            uniformTest.imgs = list[i].materialList

            showList.push(uniformTest)
          }
        }

        that.setData({
          DataSource: showList
        })
      }
    })

    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    })

    //获取行业信息列表
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
            var information = new Object()
            var date = list[i].date
            information.title = list[i].title
            information.date = list[i].date
            information.mainImg = list[i].materialList == null ? '' : list[i].materialList[0]
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
   * 切换测试进度、我的消息
   */
  tabClick: function (e) {

    if (e.currentTarget.id == 1){
      myMessClickNum++

      if (myMessClickNum == 1) {  //第一次点击我的消息,关闭红点
        wx.hideTabBarRedDot({
          index: 2,
        })

        this.setData({
          userNewMessage:0
        })

        //更新用户已读测试进度数量
        wx.getStorage({
          key: 'userReadMessage',
          success: function (res) {
            var userReadMessage = res.data
            userReadMessage.readUniformTestCont = app.globalData.currUniformTestCont

            wx.setStorage({
              key: 'userReadMessage',
              data: userReadMessage
            })
          },
        })
      }
    }

    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },

  // 点击图片进行大图查看
  LookPhoto: function (e) {
    var id = e.currentTarget.dataset.id
    var index = e.currentTarget.dataset.index;
    wx.previewImage({
      current: this.data.DataSource[id].imgs[index],
      urls: this.data.DataSource[id].imgs,
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
  onPullDownRefresh: function(e) {
    this.onLoad()
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

  /**
   * 控制文本显示
   */
  changeFolded: function (e) {
    var index = e.currentTarget.dataset.index
    var fold = this.data.DataSource[index].isFolded;
    this.data.DataSource[index].isFolded = !fold
    this.setData({
      DataSource: this.data.DataSource
    })
  },

  /**
   * 获取查询条件
   */
  wxSearchInput: function (e) {
    this.setData({
      searchCondition: e.detail.value
    })
  },

  /**
   * 消息搜索
   */
  search: function () {
    if (this.data.searchCondition != "") {
      var newMessageList = new Array();
      for (var i = 0; i < this.data.allMessageList.length; i++) {
        if (this.data.allMessageList[i].title.indexOf(this.data.searchCondition) != -1) {
          newMessageList.push(this.data.allMessageList[i])
        }
      }
      this.setData({
        messageList: newMessageList
      })
    } else {
      this.setData({
        messageList: this.data.allMessageList
      })
    }
  },

  /**
   * 查看消息详情
   */
  checkDetails: function (e) {
    var index = e.currentTarget.dataset.index
    var message = JSON.stringify(this.data.messageList[index])
    wx.navigateTo({
      url: '/pages/uniformTest/userMessageDetails/userMessageDetails?message=' + message
    })
  }
})
