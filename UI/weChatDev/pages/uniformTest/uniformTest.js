// pages/uniformTest/uniformTest.js

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['项目进展', '历次质量报表'],
    currentTab: 0,

    //历次质量报表的版本选择，版本数据
    array:[
      {
        version: '20160122X',
        imageURL: app.globalData.imgServerURL + "logo.png"
      }, {
        version: '20160122D_7',
        imageURL: app.globalData.imgServerURL + "pulpit.jpg"
      }, {
        version: '20160122D',
        imageURL: app.globalData.imgServerURL + "logo.png"
      }, {
        version: '20160122I_3',
        imageURL: app.globalData.imgServerURL + "pulpit.jpg"
      }
    ],
    indexOfVersion: 0
  },

  //历次质量报表，版本选择对应的处理函数
  bindPickerChooseVersion: function (e) {
    console.log('bindPickerChooseVersion版本选择，发送选择改变，携带值为', e.detail.value)
    console.log("新页面图片为: ", this.data.array[e.detail.value].imageURL)

    this.setData({
      indexOfVersion: e.detail.value,
      imgSrc: this.data.array[e.detail.value].imageURL
    })
  },

  /**
    * 生命周期函数--监听页面加载
    */
  onLoad: function () {
    console.log("页面初始图片为: ", this.data.array[this.data.indexOfVersion].imageURL)
    this.setData({
      imgSrc: this.data.array[this.data.indexOfVersion].imageURL
    }
      
    )
  },

  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
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

})
