const app = getApp();
var allImageArray = [];

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
  onLoad: function() {
    // 展示提示信息
    wx.showModal({
      title: '温馨提示',
      content: '由于微信缺陷，每个区域输入后请点击键盘上的“完成”； 若有遗漏，可重新点击输入区域，之后点击键盘上的“完成”',
      showCancel: false,
      confrimText: "确定",
      confirmColor: "#8B0000"
    })

    var that = this;
    // 获取信息
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: app.globalData.getDefectPropertyValue,
      data: {},
      method: 'GET',
      success: function(res) {
        wx.hideLoading()

        var versionList = res.data.getMainVersion;
        var moduleList = res.data.getAllModule;
        var severityList = res.data.getHeavySeverity;
        console.log("查询结果:", res.data)
        if (versionList == undefined || moduleList == undefined || severityList == undefined) {
          wx.showToast({
            title: "连接失败",
            icon: 'loading'
          });
        } else {
          that.setData({
            versionArray: versionList,
            moduleArray: moduleList,
            severityArray: severityList

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

  // 点击选择版本
  chooseVersion: function(e) {
    console.log('版本选择，发送选择改变，携带值为', e.detail.value)
    this.setData({
      indexOfVersion: e.detail.value
    })
  },

  // 点击选择模块
  chooseModule: function(e) {
    console.log('模块选择，发送选择改变，携带值为', e.detail.value)
    this.setData({
      indexOfModule: e.detail.value
    })
  },

  // 点击选择缺陷程度
  chooseLevel: function(e) {
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
  chooseImage: function() {
    console.log("开始选择图片")
    allImageArray = [];

    wx.chooseImage({
      count: app.globalData.uploadMaxSize,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        allImageArray = res.tempFilePaths
        console.log("选择的临时文件位置为：", allImageArray)

        wx.showToast({
          title: '选中' + allImageArray.length + "张图片",
        })
      },
      fail: function(res) {
        console.log("选择文件失败", res)
        wx.showToast({
          title: "选图失败",
          icon: "loading"
        })
      }
    })
  },

  //进行缺陷提交
  bugSubmit: function(e) {
    var that = this;
    var formData = e.detail.value;

    if (this.checkBriefNotEmpty(formData)) {
      var telephone = wx.getStorageSync("telNum");
      var tmpData = formData;
      var that = this;
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
        success: function(res) {
          wx.hideLoading()

          var result = res.data.addNewDefect
          console.log("操作结果", res.data)
          if (result != true) {
            wx.showToast({
              title: "插入失败",
              icon: 'loading'
            });
          } else {
            // 上传图片
            var id = res.data.id;
            that.upload(id)

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
              content: '缺陷提交成功！\n上传图片数量:' + allImageArray.length,
              showCancel: false,
              confrimText: "确定",
              confirmColor: "#8B0000"
            })
          }
        },
        fail: function() {
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
  checkBriefNotEmpty: function(param) {
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
  upload: function(defectId) {
    console.log("准备上传图片")
    if (allImageArray.length > 0) {
      wx.showLoading({
        title: '图片上传',
      })
    }

    var uploadCount = 0;
    for (var i = 0, h = allImageArray.length; i < h; i++) {
      console.log("上传", allImageArray[i])
      wx.uploadFile({
        url: app.globalData.uploadServerURL,
        filePath: allImageArray[i],
        name: 'file',

        formData: {
          "folderName": defectId,
          "trueFileName": i + ".png"
        },

        header: {
          "Content-Type": "multipart/form-data"
        },

        success: function(res) {
          uploadCount++;

          if (uploadCount == allImageArray.length) {
            wx.hideLoading()
          }
        },

        fail: function(res) {
          wx.hideLoading()
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
