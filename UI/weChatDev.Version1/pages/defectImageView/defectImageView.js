// pages/defectImageView/defectImageView.js
const app = getApp();
var defectId = "";
var maxNum = app.globalData.uploadMaxSize;
var allList = []
var removeList = []

Page({

  /**
   * 页面的初始数据
   */
  data: {
    errorHidden: true,
    imageArray: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var id = options.defectId;

    // 设置公共变量
    defectId = id
    removeList = []

    if (id == undefined) {
      console.log("没有找到id")
    } else {
      // 查询缺陷详情
      wx.showLoading({
        title: '加载中...',
      })
      wx.request({
        url: app.globalData.getDefectById,
        data: { "id": id },
        method: 'GET',
        success: function (res) {
          wx.hideLoading()

          var list = res.data.getDefectById;
          console.log("查询结果:", res.data)
          if (list == undefined) {
            wx.showToast({
              title: "连接失败",
              icon: 'loading'
            });
          } else {
            that.setData({
              title: list[0].title
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

      // 生成image列表（由于最多4张图）
      var imageArray = []
      for (var i = 0; i < maxNum; i++) {
        var tmpArray = {}
        var tmpItem = app.globalData.uploadViewServerURL + "/" + id + "/" + i + ".png"

        tmpArray["index"] = i
        tmpArray["url"] = tmpItem

        imageArray.push(tmpArray)
      }
      console.log("生成预览图片列表", imageArray)

      //设置公共变量
      allList = imageArray

      that.setData({
        imageArray: imageArray
      })
    }
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
    return {
      title: app.globalData.transferTitle,
      path: app.globalData.startPage,
      imageUrl: app.globalData.transferImage
    }
  },

  /**
   * 图片加载成功
   */
  showSuccess: function(e) {
    this.setData({
      errorHidden: true
    })
  },

  /**
   * 图片加载失败
   */
  showError: function(e) {
    var removeIndex = e.currentTarget.id;
    removeList.push(removeIndex)

    wx.showLoading({
      title: '加载中...',
    })
    // 重置元素，删除不显示的元素
    console.log("不显示元素列表", removeList)
    var tmpArray = []
    for (var i in allList) {
      var tmpItem = allList[i]
      if (removeList.indexOf(String(tmpItem.index)) == -1) {
        console.log("显示", tmpItem)
        tmpArray.push(tmpItem)
      }
    }

    // 隐藏提示框
    wx.hideLoading()
    this.setData({
      imageArray: tmpArray
    })

    // 显示无图片界面
    if (removeList.length == maxNum) {
      console.log("所有图片都不存在")
      this.setData({
        errorHidden: false
      })
    }
  },

  /**
   * 预览图片
   */
  showPreviewImage: function(e) {
    var current = e.target.dataset.src;
    // 获取当前页面image的URl
    console.log("不显示元素列表", removeList)
    var showList = []
    for (var i in allList) {
      var tmpItem = allList[i]
      if (removeList.indexOf(String(tmpItem.index)) == -1) {
        console.log("显示", tmpItem)
        showList.push(tmpItem.url)
      }
    }
  
    // 预览展示
    wx.previewImage({
      current: current,
      urls: showList
    })
  }
})