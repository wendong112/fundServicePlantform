
Page({

  /**
   * 页面的初始数据
   */
  data: {


    defectId: '',
    
    //缺陷概述
    title: '',

  },


  //点击“留言按钮”，进行后台处理
  bindMessageSubmitForm: function (e) {
    var that = this;
    var formData = e.detail.value;

    wx.request({
      url: "http://127.0.0.1:8080/defectplatform/superadmin/detailedServiceName",

      data: JSON.stringify(formData),
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        var result = res.data.success
        var toastText = "操作成功！";
        if (result != true) {
          toastText = "操作失败" + res.data.errMsg;
        }
        wx.showToast({
          title: toastText,
          icon: '',
          duration: 2000
        });

        if (result == true) {
          wx.navigateTo({

            //点击留言按钮，后台操作完成后，跳转页面
            url: '/pages/defectDetailedInfo/defectDetailedInfo',

          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var that = this;

    // 页面初始化 options为页面跳转所带来的参数
    this.setData({

      defectId: options.defectId

    });

    if (options.defectId == undefined) {
      return;
    }

      wx.request({
        url: "http://127.0.0.1:8080/defectplatform/superadmin/getdefectbyid",
        data: { "id": options.defectId },
        method: 'GET',
        success: function (res) {

          var defect = res.data.defect;

         
          if (defect == undefined) {
            var toastText = '获取数据失败' + res.data.errMsg;
            wx.showToast({
              title: toastText,
              icon: '',
              duration: 2000
            });
          } else {

            that.setData({
              //缺陷序号
              id: defect.id,
            
              //缺陷描述
              title: defect.title,

            });
          }
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
  
  }
})