// pages/searchResultPage/searchResultPage.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    defectList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      defectId: options.defectId,
      severityId: options.severityId
    });

    if (options.defectId != undefined) {
      wx.request({
        url: "http://172.27.228.136:8080/defectplatform/superadmin/getdefectbyid",
        data: { "id": options.defectId },
        method: 'GET',
        success: function (res) {
          var defect = res.data;
          if (defect == undefined) {
            var toastText = '获取数据失败' + res.data.errMsg;
            wx.showToast({
              title: toastText,
              icon: '',
              duration: 2000
            });
          } else {
            that.setData({
              defectId: defect.id,
              title: defect.title,
              severity: defect.severityID,
              defectList: res.data
            });
          }
        }
      })
    }
 

    if (options.severityId != undefined) {
      wx.request({
        url: "http://172.27.228.136:8080/defectplatform/superadmin/getdefectbyseverityid",
        data: { "severityId": options.severityId },
        method: 'GET',

        success: function (res) {
          var list = res.data.defectList;
          if (list == null) {
            var toastText = '获取数据失败' + res.data.errMsg;
            wx.showToast({
              title: toastText,
              icon: '',
              duration: 2000
            });
          } else {
            that.setData({
              defectList: list
            });
          }
        }
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

  },


})