// pages/defectSubmit/defectSubmit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    //缺陷提交的版本选择，版本数据
    array: ['20160122V', '201701102V', '20170908V', '20180203V'],
    objectArray: [
      {
        id: 0,
        name: '20160122V'
      },
      {
        id: 1,
        name: '201701102V'
      },
      {
        id: 2,
        name: '20170908V'
      },
      {
        id: 3,
        name: '20180203V'
      }
    ],
    index: 0,

    //缺陷提交的模块选择，模块(Module)数据
    arrayOfModule: ['指令模块', 'AB模块', 'CD模块', 'EF模块'],
    objectArray: [
      {
        id: 0,
        name: '指令模块'
      },
      {
        id: 1,
        name: 'AB模块'
      },
      {
        id: 2,
        name: 'CD模块'
      },
      {
        id: 3,
        name: 'EF模块'
      }
    ],
    indexOfModule: 0,

    //缺陷提交的缺陷程度选择，缺陷程度(Level)数据
    arrayOfLevel: ['改善建议', '影响使用', '严重问题', '非常严重'],
    objectArray: [
      {
        id: 0,
        name: '改善建议'
      },
      {
        id: 1,
        name: '影响使用'
      },
      {
        id: 2,
        name: '严重问题'
      },
      {
        id: 3,
        name: '非常严重'
      }
    ],
    indexOfLevel: 0,

    sources:'', //照片文件列表
  },

  //版本选择处理函数
  bindPickerChooseVersion: function (e) {
    console.log('bindPickerChooseVersion版本选择，发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  //模块选择处理函数
  bindPickerChooseModule: function (e) {
    console.log('bindPickerChooseModule模块选择，发送选择改变，携带值为', e.detail.value)
    this.setData({
      indexOfModule: e.detail.value
    })
  },

  //缺陷程度选择处理函数
  bindPickerChooseBugLevel: function (e) {
    console.log('bindPickerChooseBugLevel缺陷程度选择，发送选择改变，携带值为', e.detail.value)
    this.setData({
      indexOfLevel: e.detail.value
    })
  },

  //拍摄照片
  takePhoto:function(){
    var self=this;
    wx.chooseImage({
      count:1,
      sizeType: ['original','compressed'], //原图和压缩图
      sourceType: ['camera'], //直接调用相机

      //成功时的回调
      success: function(res) {
        console.log(res);
        self.setData({
          sources: res.tempFilePaths  //更新相片列表
        })
      }
    })
  },

  //点击页面button, 进入缺陷详细描述页面
  clickDefectDetailButton: function () {
   wx.navigateTo({
     url: '/pages/defectDetailDescribtion/defectDetailDescribtion',
   })
  },

  //选择照片/拍照
  choosingOrTakingPhoto: function () {
    var self = this;
    wx.chooseImage({
      count: 3, //最多三张照片
      sizeType: ['original'], //使用原图

      sourceType: ['album','camera'], //从相册中选择

      //成功时的回调
      success: function (res) {
        console.log(res);
        self.setData({
          sources: res.tempFilePaths  //更新相片列表
        })
      }
    })
  },

  //点击提交按钮，跳转到'保存完成'页面
  clickingSubmitButton: function () {
    wx.navigateTo({
      url: '/pages/submitFinishedPage/submitFinishedPage',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  
  }
})