// pages/defectDetailedInfo/defectDetailedInfo.js

Page({

  /**
   * 页面的初始数据
   */
  data: {

    defectId: '',
    title: '',
    severityID: '',

    createdUserIdName: '',
    businessFieldIdName: '',
    tradeTypeIDName:'',
    findVersionIdName: '',

    prepareProperty3: '',

    modifyUrl: "http://127.0.0.1:8080/defectplatform/superadmin/modifydefect"

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

    // add one more wx.request -----start
    wx.request({
      url: "http://127.0.0.1:8080/defectplatform/superadmin/getdefectviewbyid",
      data: { "id": options.defectId },
      method: 'GET',
      success: function (res) {
        var defectView = res.data.defectView;

        if (defectView == undefined) {
          var toastText = '获取数据失败' + res.data.errMsg;
          wx.showToast({
            title: toastText,
            icon: '',
            duration: 2000
          });
        } else {

          that.setData({

            //缺陷提交人
            createdUserIdName: defectView.createdUserIdName,

            //二级模块名字
            businessFieldIdName: defectView.businessFieldIdName,

            //三级模块名字
            tradeTypeIDName: defectView.tradeTypeIDName,
           
            //缺陷发现版本
            findVersionIdName: defectView.findVersionIdName,

          });
        }
      }
    }),
    // add one more wx.request -----end


    wx.request({
      url: "http://127.0.0.1:8080/defectplatform/superadmin/getdefectbyid",
      data: { "id": options.defectId },
      method: 'GET',
      success: function (res) {
        var defect = res.data.defect;

        var temDateTimeNumFormat = defect.createdDate;

        var format = 'Y-M-D h:m:s';

        var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
        var returnArr = [];

        var date = new Date(temDateTimeNumFormat);
        returnArr.push(date.getFullYear());

        var temMonth=date.getMonth() + 1
        if (temMonth<10){
          temMonth = "0" + temMonth;
        }
        returnArr.push(temMonth);

        var temDate = date.getDate()
        if (temDate < 10) {
          temDate = "0" + temDate;
        }
        returnArr.push(temDate);

        var temHours = date.getHours()
        if (temHours < 10) {
          temHours = "0" + temHours;
        }
        returnArr.push(temHours);

        var getMinutes = date.getMinutes()
        if (getMinutes < 10) {
          getMinutes = "0" + getMinutes;
        }
        returnArr.push(getMinutes);

        var getSeconds = date.getSeconds()
        if (getSeconds < 10) {
          getSeconds = "0" + getSeconds;
        }
        returnArr.push(getSeconds);

        for (var i in returnArr) {
          format = format.replace(formateArr[i], returnArr[i]);
        }
   
        var formatedDateTime = format;

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
            //缺陷状态
            statusIdName: defect.statusIdName,
            //缺陷描述
            title: defect.title,
            //提交人员

            //提交时间
            createdDate: formatedDateTime,
            // createdDate: defect.createdDate,
            
            //一级模块
            firstLevelModulePriorityIdName: defect.firstLevelModulePriorityIdName,

            //严重程度
            severity: defect.severity,

            //前提条件
            preCondition: defect.preCondition,
            //重现步骤
            reoccurSteps: defect.reoccurSteps,
            //预期结果
            expectedResult: defect.expectedResult,
            //实际结果
            actualResult: defect.actualResult,
 
            //计划修复版本
            prepareProperty3: defect.prepareProperty3,

          });
        }
      }
    })
  }, 


  formSubmit: function (e) {
    var that = this;
    var formData = e.detail.value;
        
    var createdDate= formData.createdDate;

    formData.statusIdName="";
    formData.createdUserIdName="";
    formData.createdDate = "";
    formData.firstLevelModulePriorityIdName="";
    formData.businessFieldIdName="";
    formData.tradeTypeIDName="";
    formData.preCondition="";
    formData.reoccurSteps="";
    formData.expectedResult="";
    formData.actualResult="";

    var handledFormData = formData

    var url = that.data.modifyUrl;

    // if (that.data.defectId != undefined) {
    //   formData.defectId = that.data.defectId;
    //   url = that.data.modifyUrl;
    // }


    wx.request({
      url: url,
      data: JSON.stringify(handledFormData),
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