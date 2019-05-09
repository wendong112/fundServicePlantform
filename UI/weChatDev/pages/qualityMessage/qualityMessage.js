// pages/qualityMessage/qualityMessage.js
var app = getApp()
var util = require("../../utils/util.js")

var weight=[0.3,0.3,0.3,0.1]  //权重
var mainModle=[248,243,241,0]   //主要模块
var mainVersion = []          //主要版本
var mainDefectId = 16         //严重缺陷id
var allValue                  //所以属性值
var pointsDeductionStandard =[
  { "17": "3", "16": "1", "15": "0.5", "14": "0.3", "13": "0.1" },
  { "17": "5", "16": "3", "15": "1", "14": "0.5", "13": "0.2" }
] //扣分标准
var firstLoad = true    //是否初次登录
var scoreColors = ["#4CAF50", "#FF8000", "#FF0000"]

Page({

  /**
   * 页面的初始数据
   */
  data: {
    qualityMessageList:[],    //质量信息列表
    blur: false,              //页面模糊处理
    vipLevel:-1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

    //获取最新消息数量
    wx.request({
      url: app.globalData.getUniformTestCont,
      data: {},
      method: 'GET',
      success: function (res) {
        var uniformTestCont = res.data.uniformTestCont
        var informationCont = res.data.informationCont

        app.globalData.currUniformTestCont = uniformTestCont
        app.globalData.currInformmationCont = informationCont

        //读取用户阅读消息数量
        wx.getStorage({
          key: 'userReadMessage',
          success: function (res) {
            if (uniformTestCont - res.data.readUniformTestCont > 0) {
              wx.showTabBarRedDot({
                index: 2,
              })
              app.globalData.userNewMessage = informationCont - res.data.readUniformTestCont
            }

            if (informationCont - res.data.readinformationCont > 0) {
              wx.showTabBarRedDot({
                index: 2,
              })
            }
          },
          fail: function () {
            var userReadMessage = new Object()
            userReadMessage.readUniformTestCont = 0
            userReadMessage.readinformationCont = 0

            wx.setStorage({
              key: 'userReadMessage',
              data: userReadMessage
            })

            wx.showTabBarRedDot({
              index: 2,
            })

            app.globalData.userNewMessage = uniformTestCont
          }
        })
      }, fail: function () {
      
        }
    })
    

    //获取用户opinid
    util.getUserOpenid().then((res) => {
      //判断用户是否登录
      try {
        wx.getStorage({
          key: 'userInfo',
          success: function (res) {
            if (res.data.wechatId == app.globalData.userOpenid) {

              var user = new Object()
              user.wechatId = res.data.wechatId
              wx.request({
                url: app.globalData.getUserInfo,
                data: JSON.stringify(user),
                method: 'POST',
                header: {
                  'Content-Type': 'application/json'
                },
                success: function (res) {
                  var result = res.data.userInfo
                  if (result.status == 0) {
                    app.globalData.userInfo = result.data

                    that.setData({
                      vipLevel: result.data.vipLevel
                    })
                  }
                },
                fail:function(){
                  
                }
              })
            } else {
              
            }
          },
          fail:function(){
            
          }
        })
      } catch (e) {
        
      }
    })

    //查询版本、模块信息
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: app.globalData.getDefectPropertyValue,
      data: {},
      method: 'GET',
      success: function (res) {
        wx.hideLoading()
        allValue = res.data;
        mainVersion = res.data.allMainVersion
        app.globalData.defectValues = allValue
      },
      fail: function () {
        wx.hideLoading()

        wx.showToast({
          title: '查询失败',
          icon: "loading"
        })
      }
    })

    //查询所有缺陷
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: app.globalData.getSearchBugInfo,
      data: {},
      method: 'GET',
      success: function (res) {
        wx.hideLoading()

        var list = res.data.getSearchBugInfo

        if (list == undefined) {
          wx.showToast({
            title: "连接失败",
            icon: 'loading'
          });
        } else {
          app.globalData.defectList = list
        }

        //分组评分
        var allVersion = new Array()
        for(var i = 0; i < mainVersion.length; i++){
          var allScore = 0;
          var deadlyDefect = 0;     //致命缺陷
          var fatefulDefect = 0;    //严重缺陷

          var versionObj = new Object()
          var versionList = new Array()
          versionObj.versionName = mainVersion[i].versionName
          versionObj.lastVersionName = mainVersion[i].versionName
          var lastVersion = 0;
          for (var j = 0; j < list.length; j++) {//根据版本号分组
            if (list[j].versionName.indexOf(mainVersion[i].versionName) != -1){
              //获得最新小版本号
              if (list[j].versionName.length > mainVersion[i].versionName.length){
                var num = list[j].versionName.indexOf("_") + 1
                var tmpVersion = list[j].versionName.substring(num)
                if (parseInt(tmpVersion) > lastVersion){
                  lastVersion = parseInt(tmpVersion)
                  versionObj.lastVersionName = list[j].versionName
                }
              }
              versionList.push(list[j])
            }
          }

          if (versionList.length == 0){
            continue
          }

          versionObj.allDefect = versionList.length   //总缺陷数

          for(var k = 0; k < mainModle.length; k++){  //根据模块计算得分
            var score = 100;

            var modleDeadlyDefect = 0;     //模块致命缺陷
            var modleFatefulDefect = 0;    //模块严重缺陷
            var modleGeneralDefect = 0;    //模块一般缺陷
            var modleSlightDefect = 0;     //模块轻微缺陷
            var modleSuggestedDefect = 0;  //模块建议

            var deadlyDefectNotRepaired = 0;      //致命缺陷不修复  
            var deadlyDefectWaitRepaired = 0;     //致命缺陷未修复

            var fatefulDefectNotRepaired = 0;     //严重缺陷不修复  
            var fatefulDefectWaitRepaired = 0;    //严重缺陷未修复

            var generalDefectNotRepaired = 0;     //一般缺陷不修复  
            var generalDefectWaitRepaired = 0;    //一般缺陷未修复

            var slightDefectNotRepaired = 0;      //轻微缺陷不修复  
            var slightDefectWaitRepaired = 0;     //轻微缺陷未修复

            var suggestedDefectNotRepaired = 0;   //建议不修复  
            var suggestedDefectWaitRepaired = 0;  //建议未修复

            if(k == 3){ //其他模块
              for (var m = 0; m < versionList.length; m++) {
                var notRepaired = 0;           //不修复
                var waitRepaired = 0;          //待修复

                if (mainModle[0] != versionList[m].priorityId 
                && mainModle[1] != versionList[m].priorityId
                  && mainModle[2] != versionList[m].priorityId) {
                  if (versionList[m].statusId == 11) {  //不修复
                    score = score - pointsDeductionStandard[0][versionList[m].severityId]

                    notRepaired++
                  } else if (versionList[m].statusId == 2 || versionList[m].statusId == 10) {  //打开、重新打开
                    score = score - pointsDeductionStandard[1][versionList[m].severityId]

                    waitRepaired++
                  } else if (versionList[m].statusId == 5) {  //修复
                    if (versionList[m].planResolvedVersionId == null){
                      continue
                    }
                    if (versionList[m].planResolvedVersionId.indexOf(versionList[m].versionName) == -1) {
                      score = score - pointsDeductionStandard[1][versionList[m].severityId]

                      waitRepaired++
                    }
                  }

                  if (versionList[m].severityId == 17) {
                    modleDeadlyDefect += 1
                    deadlyDefectNotRepaired += notRepaired
                    deadlyDefectWaitRepaired += waitRepaired
                  } else if (versionList[m].severityId == 16) {
                    fatefulDefect += 1
                    modleFatefulDefect += 1
                    fatefulDefectNotRepaired += notRepaired
                    fatefulDefectWaitRepaired += waitRepaired
                  } else if (versionList[m].severityId == 15) {
                    modleGeneralDefect += 1
                    generalDefectNotRepaired += notRepaired
                    generalDefectWaitRepaired += waitRepaired
                  } else if (versionList[m].severityId == 14) {
                    modleSlightDefect += 1
                    slightDefectNotRepaired += notRepaired
                    slightDefectWaitRepaired += waitRepaired
                  } else if (versionList[m].severityId == 13) {
                    modleSuggestedDefect += 1
                    suggestedDefectNotRepaired += notRepaired
                    suggestedDefectWaitRepaired += waitRepaired
                  }
                }
              }
            } else {
              for (var m = 0; m < versionList.length; m++) {
                var notRepaired = 0;           //不修复
                var waitRepaired = 0;          //待修复

                if (mainModle[k] == versionList[m].priorityId) {
                  if (versionList[m].statusId == 11) {  //不修复
                    score = score - pointsDeductionStandard[0][versionList[m].severityId]
                    notRepaired++
                  } else if (versionList[m].statusId == 2 || versionList[m].statusId == 10) {  //打开、重新打开
                    score = score - pointsDeductionStandard[1][versionList[m].severityId]
                    waitRepaired++
                  } else if (versionList[m].statusId == 5) {  //修复
                    if (versionList[m].planResolvedVersionId == null) {
                      continue
                    }
                    if (versionList[m].planResolvedVersionId.indexOf(versionList[m].versionName) == -1) {
                      score = score - pointsDeductionStandard[1][versionList[m].severityId]
                      waitRepaired++
                    }
                  }

                  if (versionList[m].severityId == 17) {
                    modleDeadlyDefect += 1
                    deadlyDefectNotRepaired += notRepaired
                    deadlyDefectWaitRepaired += waitRepaired
                  } else if (versionList[m].severityId == 16) {
                    fatefulDefect += 1
                    modleFatefulDefect += 1
                    fatefulDefectNotRepaired += notRepaired
                    fatefulDefectWaitRepaired += waitRepaired
                  } else if (versionList[m].severityId == 15) {
                    modleGeneralDefect += 1
                    generalDefectNotRepaired += notRepaired
                    generalDefectWaitRepaired += waitRepaired
                  } else if (versionList[m].severityId == 14) {
                    modleSlightDefect += 1
                    slightDefectNotRepaired += notRepaired
                    slightDefectWaitRepaired += waitRepaired
                  } else if (versionList[m].severityId == 13) {
                    modleSuggestedDefect += 1
                    suggestedDefectNotRepaired += notRepaired
                    suggestedDefectWaitRepaired += waitRepaired
                  }
                }
              }
            }

            versionObj.fatefulDefect = fatefulDefect                 //严重缺陷数
            
            var modleDefect = new Object();
            modleDefect.modleDeadlyDefect = modleDeadlyDefect        //模块致命缺陷数
            modleDefect.modleFatefulDefect = modleFatefulDefect      //模块严重缺陷数
            modleDefect.modleGeneralDefect = modleGeneralDefect      //模块一般缺陷数
            modleDefect.modleSlightDefect = modleSlightDefect        //模块轻微缺陷数
            modleDefect.modleSuggestedDefect = modleSuggestedDefect  //模块建议缺陷数

            var deftRepaired = new Object()
            deftRepaired.deadlyDefectNotRepaired = deadlyDefectNotRepaired
            deftRepaired.deadlyDefectWaitRepaired = deadlyDefectWaitRepaired
            deftRepaired.fatefulDefectNotRepaired = fatefulDefectNotRepaired
            deftRepaired.fatefulDefectWaitRepaired = fatefulDefectWaitRepaired
            deftRepaired.generalDefectNotRepaired = generalDefectNotRepaired
            deftRepaired.generalDefectWaitRepaired = generalDefectWaitRepaired
            deftRepaired.slightDefectNotRepaired = slightDefectNotRepaired
            deftRepaired.slightDefectWaitRepaired = slightDefectWaitRepaired
            deftRepaired.suggestedDefectNotRepaired = suggestedDefectNotRepaired
            deftRepaired.suggestedDefectWaitRepaired = suggestedDefectWaitRepaired


            //根据权重计算最终得分
            if(k==0){ //指令管理
              allScore += score * weight[0];                              //计算总评分
              versionObj.modleInstructMark = score.toFixed(2)             //模块评分
              versionObj.instructMark = (score * weight[0]).toFixed(2)    //质量评分
              versionObj.modleInstructMarkDefect = modleDefect            //模块缺陷统计
              versionObj.instructMarkRepaired = deftRepaired
            } else if (k == 1) {  //交易管理
              allScore += score * weight[1];
              versionObj.modleTransactionMark = score.toFixed(2) 
              versionObj.transactionMark = (score * weight[1]).toFixed(2)
              versionObj.modleTransactionMarkDefect = modleDefect
              versionObj.transactionMarkRepaired = deftRepaired
            } else if (k == 2) {  //风险管理
              allScore += score * weight[2];
              versionObj.modleRiskMark = score.toFixed(2) 
              versionObj.riskMark = (score * weight[2]).toFixed(2)
              versionObj.modleRiskMarkDefect = modleDefect
              versionObj.riskMarkRepaired = deftRepaired
            } else if (k == 3) {  //其他
              allScore += score * weight[3];
              versionObj.modleOtherMark = score.toFixed(2) 
              versionObj.otherMark = (score * weight[3]).toFixed(2)
              versionObj.modleOtherMarkDefect = modleDefect
              versionObj.otherMarkRepaired = deftRepaired
            }

            versionObj.score = allScore.toFixed(2)
            if (versionObj.score >= 90){
              versionObj.color = "evaluate-low"
              versionObj.scoreColor = scoreColors[0]
              versionObj.evaluate = "低风险"
            } else if (versionObj.score >= 60){
              versionObj.color = "evaluate-middle"
              versionObj.scoreColor = scoreColors[1]
              versionObj.evaluate = "中风险"
            } else {
              versionObj.color = "evaluate-hight"
              versionObj.scoreColor = scoreColors[2]
              versionObj.evaluate = "高风险"
            }
          }

          allVersion.push(versionObj)
        }

        that.setData({
          qualityMessageList: allVersion
        })
      },
      fail: function () {
        wx.hideLoading()

        wx.showToast({
          title: '查询失败',
          icon: "loading"
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
    if (firstLoad){
      firstLoad = false
    } else {
      this.onLoad()
    }
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
    if (!firstLoad) {
      firstLoad = true;
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.onLoad()
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

  /**
   * tab页点击
   */
  onTabItemTap(item) {
    
  },

  /**
   * 跳转到质量详细界面
   */
  showDetail: function (e) {
    if(this.data.vipLevel == -1){
      wx.showModal({
        title: '注册并登录',
        content: "",
        success(res) {
          if (res.confirm) {
            wx.redirectTo({
              url: "/pages/login/login"
            })
          }
        }
      })
      
    } else if (this.data.vipLevel == 0) {
      wx.showModal({
        title: '审核中',
        content: "信息审核中，请您耐心等待，同时对您提交的信息将进行严格保密！",
        showCancel: false,
        success(res) {
          
        }
      })
    } else if (this.data.vipLevel == 1) {
      wx.showModal({
        title: '未能通过权限审核',
        content: "很抱歉您未能通过本次权限审核，我们将尽快为您提供专属的查询权限，敬请期待！",
        showCancel: false,
        success(res) {

        }
      })
    } else if (this.data.vipLevel == 2) {
      var index = e.currentTarget.dataset.index;
      var versionMsg = JSON.stringify(this.data.qualityMessageList[index])
      wx.navigateTo({
        url: app.globalData.qualityDetail + "?versionMsg=" + versionMsg,
      })
    }

  },

  /**
   * 总缺陷数
   */
  allDefect:function(e){
    var index = e.currentTarget.dataset.index
    var versionList = new Array()
    var version = this.data.qualityMessageList[index].versionName

    for (var i = 0; i < mainVersion.length; i++){
      if(version == mainVersion[i].versionName){
        versionList.push(mainVersion[i])
      }
    }

    var filterList = {
      "search": "",
      "version": versionList,
      "severity": [],
      "status": []
    }      

    var allFileters = JSON.stringify(filterList)
    wx.navigateTo({
      url: '/pages/defectList/defectList?fileters=' + allFileters
    })
  },

  /**
   * 严重缺陷
   */
  fatefulDefect: function (e) {
    var index = e.currentTarget.dataset.index
    var versionList = new Array()
    var fileterList = new Array()
    var fileter = new Object()
    var version = this.data.qualityMessageList[index].versionName
    for (var i = 0; i < mainVersion.length; i++) {
      if (version == mainVersion[i].versionName) {
        versionList.push(mainVersion[i])
      }
    }

    var serityList = new Array()
    var severity = new Object()
    severity.severityId = 16
    severity.severityName = "严重问题"
    serityList.push(severity)
    
    var filterList = {
      "search": "",
      "version": versionList,
      "severity": serityList,
      "status": []
    } 

    var allFileters = JSON.stringify(filterList)
    wx.navigateTo({
      url: '/pages/defectList/defectList?fileters=' + allFileters
    })
  },

})