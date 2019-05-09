const app = getApp();
var defectId = "";

var imageList=[];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    defectDetaile: {},
    commentArray: {},

    editable:false,
    showImages:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

    var targetDefect = JSON.parse(options.defect)
    // 设置公共变量
    defectId = targetDefect.id

    // 查询缺陷
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: app.globalData.getDefectById,
      data: targetDefect,
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        wx.hideLoading()

        var defectDetaile = res.data.defectDetail;

        if (defectDetaile == undefined) {
          wx.showToast({
            title: "连接失败",
            icon: 'loading'
          });
        } else {
          var hsImg = false
          if (defectDetaile.materialList != undefined){
            imageList = defectDetaile.materialList
            hsImg = true
          }
          
          that.setData({
            defectDetaile: defectDetaile,
            showImages: hsImg
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
    var that = this
    
    // console.log("根据缺陷id获取留言", defectId)
    // wx.showLoading({
    //   title: '加载中...',
    // })
    // wx.request({
    //   url: app.globalData.getMessageByDefectId,
    //   data: { "defectId": defectId },
    //   method: 'GET',
    //   success: function (res) {
    //     wx.hideLoading()

    //     var list = res.data.getMessageByDefectId;
    //     console.log("查询结果:", res.data)
    //     if (list == undefined) {
    //       wx.showToast({
    //         title: "连接失败",
    //         icon: 'loading'
    //       });
    //     } else {
    //       that.setData({
    //         commentArray: list
    //       })
    //     }
    //   },
    //   fail: function () {
    //     wx.hideLoading()

    //     wx.showToast({
    //       title: '查询失败',
    //       icon: "loading"
    //     })
    //   }
    // })

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

  // 点击写留言
  clickMessage: function(e) {
    var url = app.globalData.messageEdit + "?defectId=" + defectId;
    console.log("跳转到", url)
  
    wx.navigateTo({
      url: url
    })
  },

  // 点击回复
  clickAnswer: function(e) {
    console.log("控件数据", e);
    var atUserName = e.currentTarget.dataset.username;
    var atTelephone = e.currentTarget.dataset.telephone;

    console.log("回复用户为", atUserName)
    console.log("回复用户电话为", atTelephone)

    var curTel = wx.getStorageSync("telNum");
    if (atTelephone == curTel) {
      console.log("无法回复给自己")
      wx.showToast({
        title: '无法自我回复',
        icon: "loading"
      })
    } else {
      console.log("正常进行回复")
      var url = app.globalData.messageEdit + "?defectId=" + defectId + "&atUserName=" + atUserName + "&atTelephone=" + atTelephone;
      console.log("跳转到", url)

      wx.navigateTo({
        url: url
      })
    }
  },

  // 点击查看照片留痕
  clickViewImage: function(e) {
    var url = app.globalData.imageView + "?defectId=" + defectId;
    console.log("跳转到", url)

    wx.navigateTo({
      url: url
    })
  },

  // 提交表单
  formSubmit: function(e) {
    var formData = e.detail.value;

    // 根据id更新数据库
    console.log("提交数据到数据库中: ", formData)
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: app.globalData.modifyDefectById,
      data: JSON.stringify(formData),
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        wx.hideLoading()

        var result = res.data.modifyDefectById
        console.log("操作结果", res.data)
        if (result != true) {
          wx.showToast({
            title: "插入失败",
            icon: 'loading'
          });
        } else {
          // 弹出提示信息
          console.log("弹出提示信息")
          wx.showModal({
            title: '温馨提示',
            content: '缺陷修改成功！',
            showCancel: false,
            confrimText: "确定",
            confirmColor: "#8B0000"
          })
        }
      },
      fail: function () {
        wx.hideLoading()

        wx.showToast({
          title: '修改失败',
          icon: "loading"
        })
      }
    })
  },

  // 点击图片进行大图查看
  LookPhoto: function (e) {
    var id = e.currentTarget.dataset.id

    wx.previewImage({
      current: imageList[id],
      urls: imageList,
    })
  }
})