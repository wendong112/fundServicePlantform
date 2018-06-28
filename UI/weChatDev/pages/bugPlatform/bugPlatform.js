// pages/bugPlatform/bugPlatform.js

//获取应用实例 
var app = getApp()


//导入js文件
var WxSearch = require('../../wxSearchView/wxSearchView.js');


var specifiedSearchScope = undefined;

var anonyRadioCheckOrNotStringValue = undefined;

var findVersionId = 1;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['缺陷提交', '缺陷搜索',],
    currentTab: 0,

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


    addUrl: "http://172.27.228.136:8080/defectplatform/superadmin/adddefect",

    //缺陷列表，为跟踪页面准备的数据
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

  //按照版本提交或者按关键字提交 radio button
  radioChangeByVersionIdOrKeyword: function (e) {
  console.log('radio发生change事件，携带value值为：', e.detail.value)

    specifiedSearchScope = e.detail.value

  },

  /**
    * 生命周期函数--监听页面加载
    */
  onLoad: function () {

  },


  searchFormSubmit: function (e) {
    var that = this;
    var formData = e.detail.value;
    var sKeyWord = formData.searchKeyWord

    //如果用户没有输入搜索内容，提示用户输入
    if (sKeyWord == undefined || sKeyWord == "") {
      var toastText = '请输入搜索内容';
      wx.showToast({
        title: toastText,
        icon: '',
        duration: 3000
      });
      return;
    }

    //如果没有选择搜索范围，提示用户相应的信息。
    if (specifiedSearchScope == undefined) {
      var toastText = '请选择搜索范围';
      wx.showToast({
        title: toastText,
        icon: '',
        duration: 3000
      });
      return;
    }

    //如果用户选择了按版本搜索，程序会进入如下if语句内处理
    if (specifiedSearchScope == 'findVersionIdRadioBtn') {

      console.log('specifiedSearchScope值为：', specifiedSearchScope)

      if (sKeyWord != undefined) {
        var findVersionIdName = sKeyWord;

        // if (findVersionIdName == "20160122D") {
        //   findVersionId = 329;
        // }
        
        switch (findVersionIdName) {
          case "20160122D":
            findVersionId = 329;
            break;
          case "20160122G_65":
            findVersionId = 401;
            break;
          case "20160122G_23":
            findVersionId = 402;
            break;
          case "20160122_D22":
            findVersionId = 403;
            break;
          case "20160122H_9":
            findVersionId = 404;
            break;
          
          case "20160122H_19":
            findVersionId = 405;
            break;
          case "20160122X":
            findVersionId = 406;
            break;

          default:
            findVersionIdName="noThisFindVersion"
        }

        //如果没有对应的搜索版本，提示用户相应的信息。
        if (findVersionIdName == "noThisFindVersion") {
          var toastText = '无此发现版本。';
          wx.showToast({
            title: toastText,
            icon: '',
            duration: 3000
          });
          return;
        }

        wx.request({
          url: "http://127.0.0.1:8080/defectplatform/superadmin/getdefectbyfindversionid",
          data: { "findVersionId": findVersionId },
          method: 'GET',
          success: function (res) {
            var defect = res.data.defect;
            if (defect == undefined) {
              var toastText = '未搜到对应数据!' + res.data.errMsg;
              wx.showToast({
                title: toastText,
                icon: '',
                duration: 2000
              });

              var toastText = '请重新输搜索词!'
              wx.showToast({
                title: toastText,
                icon: '',
                duration: 3000
              });
            } else {

              var toastText = '获取数据成功!';
              wx.showToast({
                title: toastText,
                icon: '',
                duration: 2000
              });
              that.setData({
                defectList: defect
              });
              wx.navigateTo({
                url: '../searchResultPage/searchResultPage?defectId=' + defectId,
              })
            }
          }
        })
      }

    }

    //如果用户选择了按关键字搜索，程序会进入如下if语句内处理
    if (specifiedSearchScope == 'searchByKeywordRadioBtn') {
      console.log('specifiedSearchScope值为：', specifiedSearchScope)

      if (sKeyWord != undefined) {

        var severityName = sKeyWord.trim();

        //缺陷严重程度在数据库后端对应的id值，
        //设置初始值为10, 有效值为13，14，15，16，17
        var severityId = 10;

        if (severityName == "改善" || severityName == "gaishan" || severityName == "建议" || severityName == "jianyi" || severityName == "改善建议" || severityName == "gaishanjianyi") {
          severityId = 13;
        }

        if (severityName == "轻微" || severityName == "qingwei" || severityName == "轻微问题" || severityName == "qingweiwenti") {
          severityId = 14;
        }

        if (severityName == "一般" || severityName == "yiban" || severityName == "一般问题" || severityName == "yibanwenti") {
          severityId = 15;
        }

        if (severityName == "严重" || severityName == "yanzhong" || severityName == "严重问题" || severityName == "yanzhongwenti") {
          severityId = 16;
        }

        if (severityName == "致命" || severityName == "zhiming" || severityName == "致命问题" || severityName == "zhimingwenti") {
          severityId = 17;
        }

        //如果severityId==10，那么表明用户输入的值不在搜索关键词内，
        //提示用户重新输入
        if (severityId == 10) {

          var toastText = '请输有效搜索词!'
          wx.showToast({
            title: toastText,
            icon: '',
            duration: 3000
          });

          return;
        }

        wx.request({
          url: "http://172.27.228.136:8080/defectplatform/superadmin/getdefectbyseverityid",
          data: { "severityId": severityId },
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
              wx.navigateTo({
                url: '../searchResultPage/searchResultPage?severityId=' + severityId,
              })
            }
          }
        })
      }
    }

    // if (specifiedSearchScope == 'statusIdName') {
    //   console.log('specifiedSearchScope值为：', specifiedSearchScope)
    // }



  },

  //点击”提交缺陷“按钮，进行数据提交处理
  bindFormSubmit: function (e) {
    var that = this;
    var formData = e.detail.value;
    var url = that.data.addUrl;


    var temAnonyRadioCheckOrNotStringValue = anonyRadioCheckOrNotStringValue;

    formData.anonyRadioCheckOrNotStringValue = temAnonyRadioCheckOrNotStringValue



    // var temAnonyRadioCheckOrNot = anonyRadioCheckOrNot;

    // var temAnonyRadioCheckOrNot = anonyRadioCheckOrNot;

    // formData.anonyRadioCheckOrNot = temAnonyRadioCheckOrNot

    // formData.setDataanonyRadioCheckOrNot = temAnonyRadioCheckOrNot;


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
          toastText = "操作失败" + res.data.errMsg;
        }
        wx.showToast({
          title: toastText,
          icon: '',
          duration: 2000
        });

        if (result == true) {
          wx.navigateTo({

            //点击提交按钮，提交完成后，跳转到'保存完成'页面
            url: '/pages/submitFinishedPage/submitFinishedPage',

          })
        }
      }
    })
  },

  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
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



  //转发函数，固定部分，直接拷贝即可
  wxSearchInput: WxSearch.wxSearchInput,  // 输入变化时的操作
  wxSearchKeyTap: WxSearch.wxSearchKeyTap,  // 点击提示或者关键字、历史记录时的操作
  wxSearchDeleteAll: WxSearch.wxSearchDeleteAll, // 删除所有的历史记录
  wxSearchConfirm: WxSearch.wxSearchConfirm,  // 搜索函数
  wxSearchClear: WxSearch.wxSearchClear,  // 清空函数

  //搜索回调函数  
  mySearchFunction: function (value) {
    // do your job here
    // 示例：跳转
    wx.redirectTo({
      url: '../index/index?searchValue=' + value
    })
  },

  //返回回调函数
  myGobackFunction: function () {
    // do your job here
    // 示例：返回
    wx.redirectTo({
      url: '../index/index?searchValue=返回'
    })
  }


})

/***
 * // 定义数据格式
 * "wxSearchData":{
 *  configconfig:{
 *    style: "wxSearchNormal"
 *  },
 *  view:{
 *    hidden: true,
 *    searchbarHeght: 20
 *  }
 *  hotKeys:[],//自定义热门搜索
 *  his:[]//历史搜索关键字
 *  value
 * }
 */

// 提示集合
var __tipKeys = [];
// 搜索回调函数 
var __searchFunction = null;
// 返回函数 
var __goBackFunction = null;
// 应用变量
var __that = null;

// 初始化函数
function init(that, hotKeys, tipKeys, searchFunction, goBackFunction) {

  __that = that;
  __tipKeys = tipKeys;
  __searchFunction = searchFunction;
  __goBackFunction = goBackFunction;

  var temData = {};
  var barHeight = 43;
  var view = {
    barHeight: barHeight
  }
  temData.hotKeys = hotKeys;

  wx.getSystemInfo({
    success: function (res) {
      var wHeight = res.windowHeight;
      view.seachHeight = wHeight - barHeight;
      temData.view = view;
      __that.setData({
        wxSearchData: temData
      });
    }
  });

  getHisKeys(__that);
}

// 搜索框输入时候操作
function wxSearchInput(e) {
  var inputValue = e.detail.value;
  // 页面数据
  var temData = __that.data.wxSearchData;
  // 寻找提示值 
  var tipKeys = [];
  if (inputValue && inputValue.length > 0) {
    for (var i = 0; i < __tipKeys.length; i++) {
      var mindKey = __tipKeys[i];
      // 包含字符串
      if (mindKey.indexOf(inputValue) != -1) {
        tipKeys.push(mindKey);
      }
    }
  }
  // 更新数据
  temData.value = inputValue;
  temData.tipKeys = tipKeys;
  // 更新视图
  __that.setData({
    wxSearchData: temData
  });
}

// 清空输入
function wxSearchClear() {
  // 页面数据
  var temData = __that.data.wxSearchData;
  // 更新数据
  temData.value = "";
  temData.tipKeys = [];
  // 更新视图
  __that.setData({
    wxSearchData: temData
  });
}

// 点击提示或者关键字、历史记录时的操作
function wxSearchKeyTap(e) {
  search(e.target.dataset.key);
}

// 确任或者回车
function wxSearchConfirm(e) {
  var key = e.target.dataset.key;
  if (key == 'back') {
    __goBackFunction();
  } else {
    search(__that.data.wxSearchData.value);
  }
}

function search(inputValue) {
  if (inputValue && inputValue.length > 0) {
    // 添加历史记录
    wxSearchAddHisKey(inputValue);
    // 更新
    var temData = __that.data.wxSearchData;
    temData.value = inputValue;
    __that.setData({
      wxSearchData: temData
    });
    // 回调搜索
    __searchFunction(inputValue);
  }
}

// 读取缓存
function getHisKeys() {
  var value = [];
  try {
    value = wx.getStorageSync('wxSearchHisKeys')
    if (value) {
      // Do something with return value
      var temData = __that.data.wxSearchData;
      temData.his = value;
      __that.setData({
        wxSearchData: temData
      });
    }
  } catch (e) {
    // Do something when catch error
  }
}

// 添加缓存
function wxSearchAddHisKey(inputValue) {
  if (!inputValue || inputValue.length == 0) {
    return;
  }
  var value = wx.getStorageSync('wxSearchHisKeys');
  if (value) {
    if (value.indexOf(inputValue) < 0) {
      value.unshift(inputValue);
    }
    wx.setStorage({
      key: "wxSearchHisKeys",
      data: value,
      success: function () {
        getHisKeys(__that);
      }
    })
  } else {
    value = [];
    value.push(inputValue);
    wx.setStorage({
      key: "wxSearchHisKeys",
      data: value,
      success: function () {
        getHisKeys(__that);
      }
    })
  }
}

// 删除缓存
function wxSearchDeleteAll() {
  wx.removeStorage({
    key: 'wxSearchHisKeys',
    success: function (res) {
      var value = [];
      var temData = __that.data.wxSearchData;
      temData.his = value;
      __that.setData({
        wxSearchData: temData
      });
    }
  })
}

// 导出接口
module.exports = {
  init: init, //初始化函数
  wxSearchInput: wxSearchInput,// 输入变化时的操作
  wxSearchKeyTap: wxSearchKeyTap, // 点击提示或者关键字、历史记录时的操作
  wxSearchDeleteAll: wxSearchDeleteAll, // 删除所有的历史记录
  wxSearchConfirm: wxSearchConfirm, // 搜索函数
  wxSearchClear: wxSearchClear,  // 清空函数
}