const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    defectArray: {},
    commentList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.defectId;
    console.log("查询的缺陷id为:", id)
 

    this.setData({
      defectArray: this.getBugDetail(id)
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
    //
    // 由于留言从留言编辑界面返回时需要刷新，所以放到此处
    // 需要从数据库中获取
    //

    var id = this.data.defectArray.id;
    console.log("获取留言：", id)

    var commentList = [{
      messageId: "3",
      userName: "小明",
      company: "南方基金",
      messageContent: "很赞！该缺陷反应了目前系统的在头寸计算的出入"
    }, {
      messageId: "2",
      userName: "小哄",
      company: "北方基金",
      messageContent: "同意"
    }, {
      messageId: "1",
      userName: "小哄",
      company: "华夏基金",
      messageContent: "666"
    }]

    this.setData({
      commentList: commentList
    })
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

  // 点击写留言
  clickMessage: function(e) {
    var id = e.target.id;
    var url = app.globalData.messageEdit;
    console.log("跳转到", url)
  
    wx.navigateTo({
      url: url + "?defectId=" + id
    })
  },

  // 点击查看照片留痕
  //
  //
  //
  clickViewImage: function() {
    wx.showToast({
      title: '暂未实现',
      icon: "loading"
    })
  },

  // 提交表单
  formSubmit: function(e) {
    var formData = e.detail.value;
    var id = formData.id;

    var updateData = {
      "id": formData.id,
      "defectDescription": formData.defectDescription,
      "solutionDescription": formData.solutionDescription
    }

    // 根据id更新数据库
    //
    //
    console.log("更新缺陷详情：", updateData);
    wx.showModal({
      title: '温馨提示',
      content: '缺陷更新成功！',
      showCancel: false,
      confrimText: "确定",
      confirmColor: "#8B0000",
    })

    // 刷新页面
    this.setData({
      defectArray: this.getBugDetail(id)
    })
  },

  // 公用方法 - 根据id获取缺陷详情
  getBugDetail: function (id) {
    //
    // 通过id从数据库中查找缺陷详情
    //
    var defectArray = {
      id: "1",
      statusIdName: "打开",
      title: "组合指令中个人参数的取整数功能未实现",
      createdUserIdName: "小明",
      createdDate: "2017-06-21",
      firstLevelModulePriorityIdName: "指令管理",
      severity: "一般问题",
      findVersionIdName: "20170630B",
      prepareProperty3: "20170630D",
      defectDescription: "[前提条件]\nNA\n[重现步骤]\n1.打开\n2.启动风控测试管理系统",
      solutionDescription: "暂无",
    }

    return defectArray;
  }
})