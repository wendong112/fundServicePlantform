// pages/projectProgressDetail/projectProgressDetail.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    projectArray:[
      {
        projectName: "全年六次指定版本验收测试",
        projectDetail: "第一次验收测试：已完成\n测试版本：20160122J_14\n周期：17年10月9日-11月17日\n\n第二次验收测试：已完成\n测试版本：201600630B\n周期：17年12月4日-2018年3月9日\n\n第三次验收测试：已完成\n测试版本：201600630C\n周期：18年4月2日-5月18日\n\n第死次验收测试：已完成\n测试版本：201600630C_7\n周期：18年5月*日-*月*日\n\n截止**日项目进展为60%\n其他详细信息********************************"
      }, {
        projectName: "行业故障平台建设",
        projectDetail: "test1第一次验收测试：已完成\n测试版本：20160122J_14\n周期：17年10月9日-11月17日\n\n第二次验收测试：已完成\n测试版本：201600630B\n周期：17年12月4日-2018年3月9日\n\n第三次验收测试：已完成\n测试版本：201600630C\n周期：18年4月2日-5月18日\n\n第死次验收测试：已完成\n测试版本：201600630C_7\n周期：18年5月*日-*月*日\n\n截止**日项目进展为60%\n其他详细信息********************************"
      }, {
        projectName: "新业务测试用例设计",
        projectDetail: "test2第一次验收测试：已完成\n测试版本：20160122J_14\n周期：17年10月9日-11月17日\n\n第二次验收测试：已完成\n测试版本：201600630B\n周期：17年12月4日-2018年3月9日\n\n第三次验收测试：已完成\n测试版本：201600630C\n周期：18年4月2日-5月18日\n\n第死次验收测试：已完成\n测试版本：201600630C_7\n周期：18年5月*日-*月*日\n\n截止**日项目进展为60%\n其他详细信息********************************"
      }],
    index: 0,

    threeLineIcon: app.globalData.threeLineIcon
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
  
  },

  //历次质量报表，版本选择对应的处理函数
  selectProject: function (e) {
    console.log('选中的picker携带值为', e.detail.value)

    this.setData({
      index: e.detail.value
    })
  },
})