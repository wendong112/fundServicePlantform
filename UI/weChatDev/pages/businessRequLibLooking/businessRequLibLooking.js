
//获取应用实例 
var app = getApp()

//导入js文件
var WxSearch = require('../../wxSearchView/wxSearchView.js');

var specifiedSearchScope = undefined;


var findVersionId = 1;

Page({

  /**
   * 页面的初始数据
   */
  data: {

    //仅查看本司（本基金公司） radio button
    itemsOfOnlyLookingSelfC: [
      { name: 'onlyLookingSelf', value: '仅查看本司' },
    ],

    //按关键字的 radio button
    items: [
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


    //缺陷列表
    defectList: [],
  },


  //按照关键字提交 radio button
  radioChangeByKeyword: function (e) {
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

    //如果用户选择了按关键字搜索，程序会进入如下if语句内处理
    if (specifiedSearchScope == 'searchByKeywordRadioBtn') {

      console.log('specifiedSearchScope值为：', specifiedSearchScope)

      if (sKeyWord != undefined) {

        // var severityName = sKeyWord.trim();

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

    // var that = this;

    // wx.request({
    //   url: "http://127.0.0.1:8080/defectplatform/superadmin/listdefect",
    //   data: {},
    //   method: 'GET',
    //   success: function (res) {
    //     var list = res.data.defectList;
    //     if (list == null) {
    //       var toastText = '获取数据失败' + res.data.errMsg;
    //       wx.showToast({
    //         title: toastText,
    //         icon: '',
    //         duration: 2000
    //       });
    //     } else {
    //       that.setData({
    //         defectList: list
    //       });
    //     }
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