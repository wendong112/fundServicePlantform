// pages/uniformTest/uniformTest.js

const app = getApp();
var versionList = {};
var selectVersionName = wx.getStorageSync("currentVersionName");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['项目进展', '测试报告查询'],
    currentTab: 0,

    // 项目进度
    newsContent: "",
    projectProgressImage: "",

    // 历次质量报表的版本选择，版本数据
    versionArray: {},
    index: 0,
    errorHidden: true,
    imgSrc: ""
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    var that = this

    // 设置公共变量
    versionList = {};

    // 展示测试报告
    console.log("报告图片位置", app.globalData.uniformImgServerURL + "progress.png")
    that.setData({
      projectProgressImage: app.globalData.uniformImgServerURL + "progress.png"
    })

    // 获取最新动态
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: app.globalData.getNewStatus,
      data: {},
      method: 'GET',
      success: function (res) {
        wx.hideLoading()

        var list = res.data.getNewStatus;
        console.log("查询结果:", res.data)
        if (list == undefined) {
          wx.showToast({
            title: "连接失败",
            icon: 'loading'
          });
        } else {
          // 页面设置
          that.setData({
            newsContent: list[0].projectDetail
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

    // 获取当前生产版本
    console.log("获取当前生产版本")
    var currentVersion = wx.getStorageSync("currentVersionName")
    console.log("展示报告的版本名称", currentVersion)

    // 获取所有的版本
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: app.globalData.getAllVersion,
      data: {},
      method: 'GET',
      success: function(res) {
        wx.hideLoading()

        var list = res.data.getAllVersion;
        console.log("查询结果:", res.data)
        if (list == undefined) {
          wx.showToast({
            title: "连接失败",
            icon: 'loading'
          });
        } else {
          // 设置公共变量
          versionList = list

          // 获取index值
          var currentIndex = that.getItemIndex(versionList, currentVersion)
          console.log("获取index", currentIndex)

          // 页面设置
          that.setData({
            versionArray: list,
            index: currentIndex,
            imgSrc: app.globalData.uniformImgServerURL + currentVersion + ".png"
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
  onPullDownRefresh: function(e) {
    var that = this;
    wx.showNavigationBarLoading()

    // 展示测试报告
    console.log("报告图片位置", app.globalData.uniformImgServerURL + "progress.png")
    that.setData({
      projectProgressImage: app.globalData.uniformImgServerURL + "progress.png"
    })

    // 获取生产版本
    var currentIndex = that.getItemIndex(versionList, selectVersionName)
    console.log("获取index", currentIndex)

    // 页面设置
    that.setData({
      versionArray: versionList,
      index: currentIndex,
      imgSrc: app.globalData.uniformImgServerURL + selectVersionName + ".png"
    })

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

  // 获取index值
  getItemIndex: function(searchList, searchValue) {
    var currentIndex = 0;

    // 获取index值
    for (var i in searchList) {
      var item = searchList[i]
      if (item.versionName == searchValue) {

        currentIndex = i;
        break
      }
    }
    return currentIndex;
  },

  // 点击图片跳转到项目详情
  clickProjectProcess: function() {
    console.log("跳转到项目详情界面");
    wx.navigateTo({
      url: app.globalData.projectProgressDetail,
    })
  },

  //历次质量报表，版本选择对应的处理函数
  selectVersion: function(e) {
    var that = this;
    var index = e.detail.value

    console.log('版本选择改变，携带值为', index)
    var tmpVersionName = versionList[index].versionName
    console.log("选中版本为", tmpVersionName)

    // 设置选中的版本名称
    selectVersionName = tmpVersionName

    that.setData({
      index: index,
      imgSrc: app.globalData.uniformImgServerURL + tmpVersionName + ".png"
    })
  },

  imageNotShow: function(e) {
    this.setData({
      errorHidden: false
    })
  },

  imageShow: function(e) {
    this.setData({
      errorHidden: true
    })
  },

  // 点击下载测试报告
  downloadReport: function(e) {
    var that = this;
    var versionName = e.currentTarget.dataset.version;
    console.log("下载报告版本", versionName)

    var url = app.globalData.downloadURL + "?fileName=" + versionName + ".doc";
    console.log("下载链接为：", url)

    wx.showLoading({
      title: '正在下载...',
    })
    wx.downloadFile({
      url: url,
      success: function(res) {
        wx.hideLoading()
        console.log("临时文件位置：", res.tempFilePath);

        wx.showLoading({
          title: '正在打开文件',
        })
        wx.openDocument({
          filePath: res.tempFilePath,
          success: function(res) {
            wx.hideLoading()
            console.log("打开成功", res)
          },
          fail: function(res) {
            wx.hideLoading()
            console.log("打开失败", res)
            wx.showToast({
              title: '打开失败',
              icon: "loading"
            })
          }
        })
        // wx.saveFile({
        //   tempFilePath: res.tempFilePath,
        //   success: function (res) {
        //     wx.showToast({
        //       title: '下载成功',
        //     })
        //     console.log("下载后信息：", res)

        //     that.setData({
        //       savePath: res.savedFilePath
        //     })

        //     wx.showLoading({
        //       title: '正在打开文件',
        //     })
        //     wx.openDocument({
        //       filePath: res.savedFilePath,
        //       success: function (res) {
        //         wx.hideLoading()
        //         console.log("打开成功", res)
        //       },
        //       fail: function (res) {
        //         wx.hideLoading()
        //         console.log("打开失败", res)
        //         wx.showToast({
        //           title: '下载失败',
        //           icon: "loading"
        //         })
        //       }
        //     })
        //   }
        // })
      },
      fail: function(res) {
        wx.hideLoading()

        console.log("下载文件失败")
        wx.showToast({
          title: '下载失败',
          icon: "loading"
        })
      }
    })
  },

  // 点击标签页进行切换
  navbarTap: function(e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  }
})
