// pages/bugManager/bugManager.js
const app = getApp()
var searchBugList = []
var sortBriefIndex = 0
var sortIdIndex = 0
var sliderWidth = 96 // 需要设置slider的宽度，用于计算中间位置
const sourceType = [['camera'], ['album'], ['camera', 'album']]
const sizeType = [['compressed'], ['original'], ['compressed', 'original']]
const recorderManager = wx.getRecorderManager() //录音对象
const innerAudioContext = wx.createInnerAudioContext()  //播放对象

var firstLoad = true      //是否初次登录

//筛选条件列表
var filterList={
  "search":"",
  "version":[],
  "severity":[],
  "status":[]
}
var allDefect //所有缺陷
var userInfo = app.globalData.userInfo  //用户信息

var startRecordTime = ""  //录音起始时间
var stopRecordTime = ""   //录音结束时间


//img
var adds = {}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    blur:false,   //页面模糊处理
    navbar: ['缺陷查询','缺陷提交'],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,

    versionArray: [],
    indexOfVersion: 0,

    moduleArray: [],
    indexOfModule: 0,

    imageList: [],
    sourceTypeIndex: 2,
    sourceType: ['拍照', '相册', '拍照或相册'],

    sizeTypeIndex: 2,
    sizeType: ['压缩', '原图', '压缩或原图'],

    index: 0,

    versionName: "",  //缺陷版本
    patchNum:"",      //补丁编号
    priorityId: "",   //缺陷模块

    defectTitle:"",    //缺陷标题

    //img
    img_arr: [],

    //re
    collected:false,
    recorderSrc:"",   //录音地址
    played:false,
    recordText:"录音",
    playText:"回放",
    readyPlay:false,
    audioTime:0,    //录音时间

    btbarHeight:60,

    //筛选
    characteristicList: [],
    severityList: [],
    statusList: [
      // { "statusId": "1", "statusName": "新建"},
      { "statusId": "2", "statusName": "打开" },
      { "statusId": "5", "statusName": "修复" },
      // { "statusId": "6", "statusName": "解决" },
      { "statusId": "8", "statusName": "关闭" },
    ],
    characteristicSelected: [false, false, false, false, false, false, false],
    severitySelected: [false, false, false, false, false, false, false],
    statusSelected: [false, false, false, false, false, false, false],
    selectedNumb: 0,
    allSelected:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    
    if (app.globalData.userInfo != null){
      if (app.globalData.userInfo.vipLevel == 0) {
        that.setData({
          blur: true
        })
        wx.showModal({
          title: '审核中',
          content: "信息审核中，请您耐心等待，同时对您提交的信息将进行严格保密！",
          showCancel: false,
          success(res) {
            wx.switchTab({
              url: '/pages/uniformTest/uniformTest',
            })
          }
        })
      }

      if (app.globalData.userInfo.vipLevel == 1) {
        that.setData({
          blur: true
        })
        wx.showModal({
          title: '未能通过权限审核',
          content: "很抱歉您未能通过本次权限审核，我们将尽快为您提供专属的查询权限，敬请期待！",
          showCancel: false,
          success(res) {
            wx.switchTab({
              url: '/pages/uniformTest/uniformTest',
            })
          }
        })
      }

      if (app.globalData.userInfo.vipLevel == 2) {
        that.setData({
          blur: false
        })
      }
    } else {
      that.setData({
        blur: true
      })
      wx.showModal({
        title: '注册并登录',
        content: "",
        success(res) {
          if (res.confirm){
            wx.redirectTo({
              url: "/pages/login/login"
            })
          } else {
            wx.switchTab({
              url: '/pages/uniformTest/uniformTest',
            })
          }
        }
      })
    }


    //计算tab的宽度
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.navbar.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.navbar.length * that.data.activeIndex
        })
      }
    })

    allDefect = app.globalData.defectList     //获取所有缺陷
    var versions = app.globalData.defectValues.allMainVersion     //获得所有版本号

    var severityList = app.globalData.defectValues.getHeavySeverity  //获得严重度

    //去除严重度名称前标号
    var tmpList = new Array()
    for (var i = 0; i < severityList.length; i++){
      var serv = new Object()
      var id = severityList[i].severityId
      var name = severityList[i].severityName

      serv.severityId = id
      serv.severityName = name.substring(4)
      tmpList.push(serv)
    }
    that.setData({
      characteristicList: versions,
      severityList: tmpList,
      selectedNumb: allDefect.length,
      moduleArray: app.globalData.defectValues.getAllModule,
      versionArray: app.globalData.defectValues.realMainVersion
    })

    //录音
    recorderManager.onError(function (e) {
      that.tip("录音失败！")
    });

    recorderManager.onStop(function (res) {
      that.setData({
        recorderSrc: res.tempFilePath,
        readyPlay:true
      })
    });

    //播放录音
    innerAudioContext.onError((res) => {
      that.tip("播放录音失败！")
    })

    innerAudioContext.onEnded(function(){
      that.setData({ 
        readyPlay: true, 
        played: false 
      });
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
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    if (firstLoad) {
      firstLoad = false
    } else {
      this.onLoad()
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    if (!firstLoad) {
      firstLoad = true;
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.onLoad()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  /**
   * 切换tab
   */
  tabClick: function (e) {
    if (e.currentTarget.id == 0 || app.globalData.userInfo != null){
      this.setData({
        sliderOffset: e.currentTarget.offsetLeft,
        activeIndex: e.currentTarget.id
      })
    } else {
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
    }
  },

  //记录查询条件
  wxSearchInput:function(e){
    filterList.search = e.detail.value

    var num = this.searchDefectByfilters()  //计算筛选结果

    this.setData({
      selectedNumb: num
    })
  },

  /**
   * 记录临时补丁编号
   */
  changePathNum: function(e) {
    this.setData({
      patchNum: e.detail.value
    })
  },

  // 点击选择版本
  chooseVersion: function(e) {
    this.setData({
      indexOfVersion: e.detail.value
    })
  },

  // 点击选择模块
  chooseModule: function(e) {
    this.setData({
      indexOfModule: e.detail.value
    })
  },

  /**
   * 展示缺陷列表
   */
  showDefectList: function (e) {
    var allFileters = JSON.stringify(filterList)
    wx.navigateTo({
      url: '/pages/defectList/defectList?fileters=' + allFileters
    })
  },

  chooseImage: function() {
    const that = this
    wx.chooseImage({
      sourceType: sourceType[this.data.sourceTypeIndex],
      sizeType: sizeType[this.data.sizeTypeIndex],
      success(res) {
        that.setData({
          imageList: res.tempFilePaths
        })
      }
    })
  },

  //新增图片展示
  upimg: function () {
    var that = this;
    if (this.data.img_arr.length < 10) {
      wx.chooseImage({
        sizeType: ['original', 'compressed'],
        success: function (res) {
          that.setData({
            img_arr: that.data.img_arr.concat(res.tempFilePaths)
          })
        }
      })
    } else {
      wx.showToast({
        title: '最多上传十张图片',
        icon: 'loading',
        duration: 3000
      });
    }
  },

  //提交缺陷
  defectSubmit: function (e) {
    var that = this

    if (app.globalData.userInfo == null){
      this.tip("请先登录")
      return
    }

    if (this.data.defectTitle == ""){
      this.tip("请填写缺陷标题！")
      return
    }

    if (this.data.patchNum.length > 3){
      this.tip("补丁编号不能超过3位！")
      return
    }

    var defect = new Object()
    defect.title = this.data.defectTitle
    defect.findVersionId = this.data.versionArray[this.data.indexOfVersion].findVersionId
    defect.patchNum = this.data.patchNum
    defect.priorityId = this.data.moduleArray[this.data.indexOfModule].priorityId
    defect.telephone = app.globalData.userInfo.telephone

    wx.request({
      url: app.globalData.addNewDefect,
      data: JSON.stringify(defect),
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        wx.hideLoading()

        var result = res.data.newDefect
        if (result.status == 0) {
          wx.showToast({
            title: result.msg,
            duration: 3000
          })

          that.uploadImage(result.data.id)  //上传图片

          if (that.data.recorderSrc != ""){
            that.uploadRecord(result.data.id)   //上传录音
          }

          //获取最新缺陷列表
          wx.request({
            url: app.globalData.getSearchBugInfo,
            data: {},
            method: 'GET',
            success: function (res) {
              var list = res.data.getSearchBugInfo

              if (list == undefined) {
              } else {
                app.globalData.defectList = list
              }
            }
          })

          //清空标题
          that.setData({
            defectTitle:"",
            img_arr:[],
            collected:"",
            recorderSrc:"",
            readyPlay:false,
            played:false
          })
        } else {
          // 弹出提示信息
          console.log("弹出提示信息")
          that.tip(result.msg)
        }
      },
      fail: function () {
        wx.hideLoading()
        console.log("系统错误")
        that.tip("系统错误")
      }
    })
  },

  //上传图片
  uploadImage: function (defectId) {
    var that = this
    for (var i = 0; i < this.data.img_arr.length; i++) {
      wx.uploadFile({
        url: app.globalData.uploadAttachment,
        filePath: that.data.img_arr[i],
        name: 'attachments',
        formData: {
          "type":"0",
          "defectId": defectId,
          "imageNum": i + 1
        },
        success: function (res) {
          console.log(res)
        },
        fail:function(res) {
          console.log("网络请求失败，请确保网络是否正常")
          that.tip("网络请求失败，请确保网络是否正常")
        }
      })
    }
  },

  // 预览图片
  previewImg: function (e) {
    //获取当前图片的下标
    var index = e.currentTarget.dataset.index;
    //所有图片
    var imgs = this.data.img_arr;
    wx.previewImage({
      //当前显示图片
      current: imgs[index],
      //所有图片
      urls: imgs
    })
  },

  //删除图片
  deleteImage: function (e) {
    var that = this;
    var images = that.data.img_arr;
    var index = e.currentTarget.dataset.index;//获取当前长按图片下标
    wx.showModal({
      title: '提示',
      content: '确定要删除此图片吗？',
      success: function (res) {
        if (res.confirm) {
          images.splice(index, 1);
        } else if (res.cancel) {
          return false;
        }
        that.setData({
          img_arr:images
        });
      }
    })
  },

  //上传录音
  uploadRecord: function (defectId) {
    var that = this
    wx.uploadFile({
      url: app.globalData.uploadAttachment,
      filePath: this.data.recorderSrc,
      name: 'attachments',
      formData: {
        "type": "1",
        "defectId": defectId
      },
      success: function (res) {

      },
      fail: function (res) {
        console.log("网络请求失败，请确保网络是否正常")
        that.tip("网络请求失败，请确保网络是否正常")
      }
    })
  },

  //录音
  recordChange: function(){
    if (this.data.collected){
      this.setData({ collected: false })
      recorderManager.stop();
    } else{
      this.setData({ collected: true })
      recorderManager.start();
    }
  },

  //开始录音
  startRecord: function(){
    startRecordTime = new Date()
    recorderManager.start();
  },

  //停止录音
  stopRecord: function(){
    recorderManager.stop()
    stopRecordTime = new Date()

    var time = parseInt((stopRecordTime.getTime() - startRecordTime.getTime()) / 1000)
    this.setData({
      audioTime: time
    })

    // wx.hideToast({
    // })
  },

  //播放录音
  audioPlay: function(){
    this.setData({ 
      played: true,
      readyPlay: false 
    })
    innerAudioContext.src = this.data.recorderSrc
    innerAudioContext.play()
  },

  //停止播放
  audioStop: function(){
    this.setData({ 
      played: false,
      readyPlay: true 
    })
    innerAudioContext.stop()
  },

  /**
   * 删除录音
   */
  deleteAudio: function() {
    var that = this
    wx.showModal({
      title: '提示',
      content: '确定要删除录音吗？',
      success: function (res) {
        if (res.confirm) {
          that.setData({
            played: false,
            readyPlay: false,
            recorderSrc: ""
          })
        } else if (res.cancel) {

        }
      }
    })

    
  },

  //更新输入值
  bindinput: function (e) {
    this.setData({
      defectTitle: e.detail.value
    });
  },

  /**
   * 清空所有选择
   */
  clearSelectedNumb: function () {
    this.setData({
      characteristicSelected: [false],
      severitySelected:[false],
      statusSelected:[false],
      selectedNumb: allDefect.length
    })

    filterList = {
      "search": "",
      "version": [],
      "severity": [],
      "status": []
    }
  },

  characteristicSelected: function (e) {
    var info = this.data.characteristicSelected
    info[e.currentTarget.dataset.index] = !info[e.currentTarget.dataset.index]

    //更新筛选列表
    var versions = new Array()
    for (var i = 0; i < info.length; i++) {
      if (info[i]) {
        versions.push(this.data.characteristicList[i]);
      }
    }
    filterList.version = versions

    var num = this.searchDefectByfilters()  //计算筛选结果
    this.setData({
      characteristicSelected: info,
      selectedNumb: num
    })
  },

  severitySelected: function (e) {
    var info = this.data.severitySelected
    info[e.currentTarget.dataset.index] = !info[e.currentTarget.dataset.index]

    //更新筛选列表
    var severitys = new Array()
    for (var i = 0; i < info.length; i++) {
      if (info[i]) {
        severitys.push(this.data.severityList[i]);
      }
    }
    filterList.severity = severitys

    var num = this.searchDefectByfilters()
    this.setData({
      severitySelected: info,
      selectedNumb: num
    })
  },

  statusSelected: function (e) {
    var info = this.data.statusSelected
    info[e.currentTarget.dataset.index] = !info[e.currentTarget.dataset.index]

    //更新筛选列表
    var status = new Array()
    for (var i = 0; i < info.length; i++) {
      if (info[i]) {
        status.push(this.data.statusList[i]);
      }
    }
    filterList.status = status

    var num = this.searchDefectByfilters()
    this.setData({
      statusSelected: info,
      selectedNumb: num
    })
  },

  /**
   * 根据筛选条件查询
   */
  searchDefectByfilters:function(){
    var lastSearchList = new Array()
    var currSearchList = new Array()

    //根据输入内容筛选
    if (filterList.search != ""){
      for (var i = 0; i < allDefect.length; i++){
        if (allDefect[i].title.indexOf(filterList.search) != -1){
          currSearchList.push(allDefect[i])
        }
      }
      lastSearchList = currSearchList
      currSearchList = []
    } else {
      lastSearchList = allDefect
    }
    
    if (lastSearchList.length > 0){
      //根据版本筛选
      if (filterList.version.length > 0){
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
      if (lastSearchList.length > 0){
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

    return lastSearchList.length
  }
})