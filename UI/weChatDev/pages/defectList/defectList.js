// pages/bugManager/bugManager.js
const app = getApp()
var sortIdIndex = 0
var sortBriefIndex = 0
var sortStatusIndex = 0
var sortVersionNameIndex = 0

var allDefect = []   //所有缺陷
//筛选条件列表
var filterList = {
  "search": "",
  "version": [],
  "severity": [],
  "status": []
}  

Page({
  /**
   * 页面的初始数据
   */
  data: {
    sortIdDesc:true,
    sortBriefDesc:true,
    sortStatusDesc:true,
    sortVersionNameDesc:true,
    defectCount:0,
    filterList:[],

    versionArray: [],
    indexOfVersion: 0,

    moduleArray: [],
    indexOfModule: 0,

    inputHidden: false,
    pickerHidden: true,

    bugList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    allDefect = app.globalData.defectList     //获取所有缺陷
    // var index = allDefect.length
    // for(var i = 0; i < allDefect.length; i++){
    //   allDefect[i].index = index
    //   index--
    // }

    //获取筛选条件
    filterList = JSON.parse(options.fileters)
    this.searchDefectByfilters()

    var fileters = new Array()

    if (filterList.version.length != 0){
      for (var i = 0; i < filterList.version.length; i++) {
        fileters.push(filterList.version[i].versionName)
      }
    }

    if (filterList.severity.length != 0) {
      for (var i = 0; i < filterList.severity.length; i++) {
        fileters.push(filterList.severity[i].severityName)
      }
    }
    
    if (filterList.status.length != 0) {
      for (var i = 0; i < filterList.status.length; i++) {
        fileters.push(filterList.status[i].statusName)
      }
    }

    this.setData({
      filterList: fileters
    })


    //录音
    this.recorderManager = wx.getRecorderManager();
    this.recorderManager.onError(function () {
      that.tip("录音失败！")
    });

    this.recorderManager.onStop(function (res) {
      that.setData({
        recorderSrc: res.tempFilePath,
        recordText: "重录"
      })
      that.tip("录音完成！")
    });

    //播放录音
    this.innerAudioContext = wx.createInnerAudioContext();
    this.innerAudioContext.onError((res) => {
      that.tip("播放录音失败！")
    })

    this.innerAudioContext.onEnded(function () {
      that.setData({ played: false });
    })
  },

  /**
  * 提示
  */
  tip: function (msg) {
    wx.showModal({
      title: '提示',
      content: msg,
      showCancel: false
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

  clickDetail: function (e) {
    //检查用户是否登录
    if (app.globalData.userInfo == null){
      wx.showModal({
        title: '提示',
        content: '请先登录！',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: "/pages/login/login"
            })
          } else if (res.cancel) {

          }
        }
      })
    } else{
      var index = e.currentTarget.id
      var targetDefect = this.data.bugList[index]
      targetDefect.title = '' //防止&等特殊符号在url里传递出现问题
      var defect = JSON.stringify(targetDefect)

      wx.navigateTo({
        url: '/pages/defectDetailedInfo/defectDetailedInfo?defect=' + defect
      })
    }
  },

  // 点击id部分的排序
  sortById: function (e) {
    var that = this;
    // 点击第一次根据从小到大的顺序排序
    var tmpList = that.data.bugList;
    if (sortIdIndex % 2 == 0) {
      tmpList.sort(that.compareUp(tmpList, "id"))
      that.setData({
        bugList: tmpList,
        sortIdDesc:false
      })
    } else {
      tmpList.sort(that.compareDown(tmpList, "id"))
      that.setData({
        bugList: tmpList,
        sortIdDesc:true
      })
    }

    sortIdIndex += 1
  },

  // 点击title部分进行排序
  sortByBrief: function (e) {
    var that = this;
    var tmpList = that.data.bugList;
    // 点击第一次，根据中文排序
    if (sortBriefIndex % 2 == 0) {
      that.sortChinese(tmpList, "title")

      that.setData({
        bugList: tmpList,
        sortBriefDesc:false
      })
      // 点击第二次降序
    } else {
      tmpList.reverse()

      that.setData({
        bugList: tmpList,
        sortBriefDesc:true
      })
    }

    sortBriefIndex += 1
  },

  // 点击status部分进行排序
  sortByStatus: function (e) {
    var that = this;
    var tmpList = that.data.bugList;
    // 点击第一次，根据中文排序
    if (sortStatusIndex % 2 == 0) {
      that.sortChinese(tmpList, "statusName")

      that.setData({
        bugList: tmpList,
        sortStatusDesc: false
      })
      // 点击第二次降序
    } else {
      tmpList.reverse()

      that.setData({
        bugList: tmpList,
        sortStatusDesc: true
      })
    }

    sortStatusIndex += 1
  },

  // 点击发现版本部分进行排序
  sortByVersionName: function (e) {
    var that = this;
    var tmpList = that.data.bugList;
    // 点击第一次，根据中文排序
    if (sortVersionNameIndex % 2 == 0) {
      that.sortChinese(tmpList, "versionName")

      that.setData({
        bugList: tmpList,
        sortVersionNameDesc: false
      })
      // 点击第二次降序
    } else {
      tmpList.reverse()

      that.setData({
        bugList: tmpList,
        sortVersionNameDesc: true
      })
    }

    sortVersionNameIndex += 1
  },

  //排序列表+字典中的数字
  compareUp: function (data, propertyName) { // 升序排序
    if ((typeof data[0][propertyName]) != "number") { // 属性值为非数字
      return function (object1, object2) {
        var value1 = object1[propertyName];
        var value2 = object2[propertyName];
        return value1.localeCompare(value2);
      }
    } else {
      return function (object1, object2) { // 属性值为数字
        var value1 = object1[propertyName];
        var value2 = object2[propertyName];
        return value1 - value2;
      }
    }
  },
  compareDown: function (data, propertyName) { // 降序排序
    if ((typeof data[0][propertyName]) != "number") { // 属性值为非数字
      return function (object1, object2) {
        var value1 = object1[propertyName];
        var value2 = object2[propertyName];
        return value2.localeCompare(value1);
      }
    } else {
      return function (object1, object2) { // 属性值为数字
        var value1 = object1[propertyName];
        var value2 = object2[propertyName];
        return value2 - value1;
      }
    }
  },

  // 排序列表+字典中的中文，参数：arr 排序的数组; dataLeven 数组内的需要比较的元素属性
  sortChinese: function (arr, dataLeven) {
    /* 获取数组元素内需要比较的值 */
    function getValue(option) { // 参数： option 数组元素
      if (!dataLeven) return option
      var data = option
      dataLeven.split('.').filter(function (item) {
        data = data[item]
      })
      return data + ''
    }
    arr.sort(function (item1, item2) {
      return getValue(item1).localeCompare(getValue(item2), 'zh-CN');
    })
  },

  /**
   * 删除筛选条件
   */
  deleteFilter: function (e) {
    var index = e.currentTarget.dataset.index;
    var deleteFilter = this.data.filterList[index]

    if (filterList.version.length != 0) {
      for (var i = 0; i < filterList.version.length; i++) {
        if (deleteFilter == filterList.version[i].versionName){
          filterList.version.splice(i, 1)
        }
      }
    }

    if (filterList.severity.length != 0) {
      for (var i = 0; i < filterList.severity.length; i++) {
        if (deleteFilter == filterList.severity[i].severityName) {
          filterList.severity.splice(i, 1)
        }
      }
    }

    if (filterList.status.length != 0) {
      for (var i = 0; i < filterList.status.length; i++) {
        if (deleteFilter == filterList.status[i].statusName) {
          filterList.status.splice(i, 1)
        }
      }
    }

    this.data.filterList.splice(index, 1)
    this.searchDefectByfilters()
    this.setData({
      filterList: this.data.filterList
    })
  }, 

  /**
   * 根据筛选条件查询
   */
  searchDefectByfilters: function () {
    var lastSearchList = new Array()
    var currSearchList = new Array()

    //根据输入内容筛选
    if (filterList.search != "") {
      for (var i = 0; i < allDefect.length; i++) {
        if (allDefect[i].title.indexOf(filterList.search) != -1) {
          currSearchList.push(allDefect[i])
        }
      }
      lastSearchList = currSearchList
      currSearchList = []
    } else {
      lastSearchList = allDefect
    }

    if (lastSearchList.length > 0) {
      //根据版本筛选
      if (filterList.version.length > 0) {
        for (var i = 0; i < filterList.version.length; i++) {
          for (var j = 0; j < lastSearchList.length; j++) {
            if (lastSearchList[j].versionName.indexOf(filterList.version[i].versionName) != -1) {
              currSearchList.push(lastSearchList[j])
            }
          }
        }

        lastSearchList = currSearchList
        currSearchList = []
      }

      //根据严重度筛选
      if (lastSearchList.length > 0) {
        if (filterList.severity.length > 0) {
          for (var i = 0; i < filterList.severity.length; i++) {
            for (var j = 0; j < lastSearchList.length; j++) {
              if (lastSearchList[j].severityId == filterList.severity[i].severityId) {
                currSearchList.push(lastSearchList[j])
              }
            }
          }

          lastSearchList = currSearchList
          currSearchList = []
        }

        //根据状态筛选
        if (lastSearchList.length > 0) {
          if (filterList.status.length > 0) {
            for (var i = 0; i < filterList.status.length; i++) {
              for (var j = 0; j < lastSearchList.length; j++) {
                if (lastSearchList[j].statusId == filterList.status[i].statusId) {
                  currSearchList.push(lastSearchList[j])
                }
              }
            }

            lastSearchList = currSearchList
            currSearchList = []
          }
        }
      }
    }

    this.setData({
      bugList: lastSearchList,
      defectCount: lastSearchList.length
    })
  }

})