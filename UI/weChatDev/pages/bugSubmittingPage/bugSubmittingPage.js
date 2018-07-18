
const app = getApp();

var allImageArray = []

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 选择模块等部分
    versionArray: [],
    indexOfVersion: 0,

    moduleArray: [],
    indexOfModule: 0,

    severityArray: [],
    indexOfSeverity: 0,

    // 输入内容部分
    title: "",
    defectDescription: "",
    expectDescription: "",
    solutionDescription: "",

    // 匿名提交部分
    noNameChecked: false,
  },

  /**
    * 生命周期函数--监听页面加载
    */
  onLoad: function () {
    var that = this;

    // 获取所有version
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: app.globalData.getAllVersion,
      data: {},
      method: 'GET',
      success: function (res) {
        wx.hideLoading()

        var list = res.data.getAllVersion;
        console.log("查询结果:", res.data)
        if (list == undefined) {
          wx.showToast({
            title: "连接失败",
            icon: 'loading'
          });
        } else {
          that.setData({
            versionArray: list
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

    // 获取所有module
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: app.globalData.getAllModule,
      data: {},
      method: 'GET',
      success: function (res) {
        wx.hideLoading()

        var list = res.data.getAllModule;
        console.log("查询结果:", res.data)
        if (list == undefined) {
          wx.showToast({
            title: "连接失败",
            icon: 'loading'
          });
        } else {
          that.setData({
            moduleArray: list
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

    // 获取所有severity
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: app.globalData.getAllSeverity,
      data: {},
      method: 'GET',
      success: function (res) {
        wx.hideLoading()

        var list = res.data.getAllSeverity;
        console.log("查询结果:", res.data)
        if (list == undefined) {
          wx.showToast({
            title: "连接失败",
            icon: 'loading'
          });
        } else {
          that.setData({
            severityArray: list
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

  // 点击选择版本
  chooseVersion: function(e) {
    console.log('版本选择，发送选择改变，携带值为', e.detail.value)
    this.setData({
      indexOfVersion: e.detail.value
    })
  },

  // 点击选择模块
  chooseModule: function (e) {
    console.log('模块选择，发送选择改变，携带值为', e.detail.value)
    this.setData({
      indexOfModule: e.detail.value
    })
  },

  // 点击选择缺陷程度
  chooseLevel: function (e) {
    console.log('缺陷程度选择，发送选择改变，携带值为', e.detail.value)
    this.setData({
      indexOfSeverity: e.detail.value
    })
  },

  // 点击匿名提交
  clickNoName: function() {
    this.setData({
      noNameChecked: !this.data.noNameChecked
    })
  },

  // 进行图片留痕
  uploadImage: function() {
    wx.showToast({
      title: '暂未实现',
      icon: "loading"
    })
    // allImageArray = [];

    // wx.chooseImage({
    //   sizeType: ['compressed'],
    //   sourceType: ['album', 'camera'],
    //   success: function(res) {
    //     allImageArray = res.tempFilePaths

    //     if (allImageArray.length > 3) {
    //       wx.showToast({
    //         title: '仅限3张',
    //         icon: "loading"
    //       })
    //       return;
    //     } else {
    //       wx.showToast({
    //         title: '选中' + allImageArray.length + "张",
    //         icon: "success"
    //       })
    //     }
    //   },
    // })

  },

  //进行缺陷提交
  bugSubmit: function(e) {
    var that = this;
    var formData = e.detail.value;

    if (this.checkBriefNotEmpty(formData)) {
      var telephone = wx.getStorageSync("telNum");
      var tmpData = formData;
      tmpData["telephone"] = telephone
      tmpData["createdDate"] = new Date
      if (tmpData.anonymousFlag != "2") {
        tmpData["anonymousFlag"] = "1"
      }

      // 提交缺陷到数据库中
      console.log("提交数据到数据库中: ", tmpData)
      wx.showLoading({
        title: '加载中...',
      })
      wx.request({
        url: app.globalData.addNewDefect,
        data: JSON.stringify(tmpData),
        method: 'POST',
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          wx.hideLoading()

          var result = res.data.addNewDefect
          console.log("操作结果", res.data)
          if (result != true) {
            wx.showToast({
              title: "插入失败",
              icon: 'loading'
            });
          } else {
            // 清空数据
            console.log("清空表单数据")
            that.setData({
              title: "",
              defectDescription: "",
              expectDescription: "",
              solutionDescription: "",

              // 匿名提交部分
              noNameChecked: false,
            })

            // 弹出提示信息
            console.log("弹出提示信息")
            wx.showModal({
              title: '温馨提示',
              content: '缺陷提交成功！',
              showCancel: false,
              confrimText: "确定",
              confirmColor: "#8B0000"
            })
          }
        },
        fail: function () {
          wx.hideLoading()

          wx.showToast({
            title: '提交失败',
            icon: "loading"
          })
        }
      })
    }
  },


  // 检查概述已经填写
  checkBriefNotEmpty: function (param) {
    console.log("检查缺陷概述是否填写")
    if (param.title.length == 0 || param.title.trim().length == 0) {
      wx.showToast({
        title: '缺陷概述必填',
        icon: "loading"
      })
      return false;
    }

    // 返回信息正确
    return true;
  },

  // 上传图片
  upload: function (defectId) {
    console.log("准备上传图片")
    wx.showToast({
      title: '正在上传...',
      icon: "loading",
      duration: 10000,
    })

    var uploadCount = 0;
    for (var i = 0, h = allImageArray.length; i < h; i++) {
      console.log("上传", allImageArray[i])
      wx.uploadFile({
        url: app.global.uploadServerURL,
        filePath: allImageArray[i],
        name: 'uploadImage',

        formData: {
          "defectId": defectId,
          "imageName": i + ".png"
        },

        header: {
          "Content-Type": "multipart/form-data"
        },

        success: function (res) {
          uploadCount++;

          if (uploadCount == allImageArray.length) {
            wx.hideToast();
          }
        },

        fail: function (res) {
          wx.hideToast();
          wx.showModal({
            title: '错误提示',
            content: '上传图片失败',
            showCancel: false,
          })
        }
      })
    }
  }
})


