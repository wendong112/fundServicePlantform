const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "",
    id: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.defectId;

    if (id == undefined) {
      console.log("没有找到id")
    } else {
      //
      // 根据id从数据库中取信息
      //
      //

      this.setData({
        title: "测试填报title",
        id: id
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

  // 点击提交按钮
  messageSubmit: function(e) {
    // 根据id更新留言界面

    //
    // 根据缺陷id将数值插入留言
    //
    console.log("更新留言");
    wx.showModal({
      title: '温馨提示',
      content: '留言插入成功！',
      showCancel: false,
      confrimText: "确定",
      confirmColor: "#8B0000",
      success: function(res) {
        console.log("跳转回上一页")

        wx.navigateBack({});
      }
    })
  }
})