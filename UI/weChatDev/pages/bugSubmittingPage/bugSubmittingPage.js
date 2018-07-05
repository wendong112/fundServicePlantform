
var anonyRadioCheckOrNotStringValue = undefined;

Page({

  /**
   * 页面的初始数据
   */
  data: {

    //匿名提交 radio button
    itemsOfAnonymousSubmit: [
      { name: 'anonymousSubmitting', value: '匿名提交' },
    ],

    //仅查看本司（本基金公司） radio button
    itemsOfOnlyLookingSelfC: [
      { name: 'onlyLookingSelf', value: '仅查看本司' },
    ],

    //按发现版本 按关键字的 radio button
    items: [
      { name: 'findVersionIdRadioBtn', value: '按版本' },
      { name: 'searchByKeywordRadioBtn', value: '按关键字' },

    ],


    findVersion: '',
    firstLevelModulePriorityIdName: '',
    severity: '',

    title: '',
    preCondition: '',
    reoccurSteps: '',
    expectedResult: '',
    actualResult: '',
    defectNote: '',


    addUrl: "http://127.0.0.1:8080/defectplatform/superadmin/adddefect",

    //缺陷列表，
    defectList: [],

    //缺陷提交的版本选择，版本数据
    array: ['20160122X', '20160122D_7', '20160122D', '20160122I_3'],
    objectArray: [
      {
        id: 0,
        name: '20160122X'
      },
      {
        id: 1,
        name: '20160122D_7'
      },
      {
        id: 2,
        name: '20160122D'
      },
      {
        id: 3,
        name: '20160122I_3'
      }
    ],
    indexOfVersion: 0,

    //缺陷提交的模块选择，模块(Module)数据
    arrayOfModule: ['风险控制', '基金财务', '交易管理', '日终清算'],
    objectArray: [
      {
        id: 0,
        name: '风险控制'
      },
      {
        id: 1,
        name: '基金财务'
      },
      {
        id: 2,
        name: '交易管理'
      },
      {
        id: 3,
        name: '日终清算'
      }
    ],
    indexOfModule: 0,

    //缺陷提交的缺陷程度选择，缺陷程度(Level)数据
    arrayOfLevel: ['1-改善建议', '2-轻微问题', '3-一般问题', '4-严重问题', '5-致命问题'],
    objectArray: [
      {
        id: 0,
        name: '1-改善建议'
      },
      {
        id: 1,
        name: '2-轻微问题'
      },
      {
        id: 2,
        name: '3-一般问题'
      },
      {
        id: 3,
        name: '4-严重问题'
      },
      {
        id: 4,
        name: '5-致命问题'

      }
    ],
    indexOfLevel: 0,

    sources: '', //照片文件列表
  },

  //匿名提交radio button
  radioChangeOfAnonymousButton: function (e) {
    console.log('匿名提交radio发生change事件，携带value值为：', e.detail.value)

    anonyRadioCheckOrNotStringValue = e.detail.value

  },


  /**
    * 生命周期函数--监听页面加载
    */
  onLoad: function () {

  },


  //点击”提交缺陷“按钮，进行数据提交处理
  bindFormSubmit: function (e) {
    var that = this;
    var formData = e.detail.value;
    var url = that.data.addUrl;

    var temAnonyRadioCheckOrNotStringValue = anonyRadioCheckOrNotStringValue;


    //如果用户选择了匿名提交，那么将更新defect_detailed表的第30个预留字段（PREPARE_PROPERTY_30）的值为1。如果没有选择匿名提交那么这个字段不更新，数据库中还是默认的值。
    if (temAnonyRadioCheckOrNotStringValue=="anonymousSubmitting"){

      formData.anonyRadioCheckOrNotStringValue ="1";

    }


    // formData.anonyRadioCheckOrNotStringValue = temAnonyRadioCheckOrNotStringValue

    wx.request({
      url: url,
      data: JSON.stringify(formData),
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        var result = res.data.success
        var toastText = "操作成功！";
        if (result != true) {
          toastText = "操作失败!" + res.data.errMsg;
        }
        wx.showToast({
          title: toastText,
          icon: '',
          duration: 2500
        });

        if (result == true) {

          // wx.request({
          //   url: url,
          //   data: JSON.stringify(formData),
          //   method: 'POST',
          //   header: {
          //     'Content-Type': 'application/json'
          //   },
          //   success: function (res) {
          //     var result = res.data.success
          //     var toastText = "操作成功！";
          //     if (result != true) {
          //       toastText = "操作失败" + res.data.errMsg;
          //     }
          //     wx.showToast({
          //       title: toastText,
          //       icon: '',
          //       duration: 2000
          //     });
          //     if (result == true) {
          //       wx.navigateTo({
          //         //点击提交按钮，提交完成后，跳转到'保存完成'页面
          //         url: '/pages/submitFinishedPage/submitFinishedPage',

          //       })
          //     }
          //   }
          // })





          wx.navigateTo({

            //点击提交按钮，提交完成后，跳转到'保存完成'页面
            url: '/pages/submitFinishedPage/submitFinishedPage',

          })
        }
      }
    })
  },


  //版本选择处理函数
  bindPickerChooseVersion: function (e) {
    console.log('bindPickerChooseVersion版本选择，发送选择改变，携带值为', e.detail.value)
    this.setData({
      indexOfVersion: e.detail.value
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
  takePhoto: function () {
    var self = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], //原图和压缩图
      sourceType: ['camera'], //直接调用相机

      //成功时的回调
      success: function (res) {
        console.log(res);
        self.setData({
          sources: res.tempFilePaths  //更新相片列表
        })
      }
    })
  },

  //选择照片/拍照
  choosingOrTakingPhoto: function () {
    var self = this;
    wx.chooseImage({
      count: 1, //最多三张照片
      sizeType: ['original'], //使用原图

      sourceType: ['album', 'camera'], //从相册中选择

      //成功时的回调
      success: function (res) {
        console.log(res);
        self.setData({
          sources: res.tempFilePaths  //更新相片列表
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
    var that = this;

    wx.request({
      url: "http://127.0.0.1:8080/defectplatform/superadmin/listdefect",
      data: {},
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


