// pages/bugSearchingPage/bugSearchingPage.js

//获取应用实例 
const app = getApp()
var versionList = []
var searchBugList = []

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputHidden: false,
    pickerHidden: true,

    searchContent: "",
    companyChecked: false,
    versionChecked: false,
    keywordChecked: false,

    versionArray: {},
    index: 0,

    //缺陷列表
    defectList: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var versionName = options.versionName;
    var that = this;

    // 获取所有的版本
    wx.showLoading({
      title: '加载中...',
    })
    console.log("获取所有版本")
    wx.request({
      url: app.globalData.getAllVersion,
      data: {},
      method: 'GET',
      success: function(res) {
        wx.hideLoading()

        var list = res.data.getAllVersion;
        console.log("查询结果:", res.data)
        if (list == undefined) {
          wx.showToast({
            title: "连接失败",
            icon: 'loading'
          });
        } else {
          versionList = list
          // 获取当前生产版本
          var currentVersion = wx.getStorageSync("currentVersionName")
          var currentIndex = 0;

          // 获取index值
          for (var i in versionList) {
            var item = versionList[i]
            if (item.versionName == currentVersion) {
              currentIndex = i;
              break
            }
          }
          
          // 页面设置
          that.setData({
            versionArray: list,
            index: currentIndex
          })
        }
      },
      fail: function() {
        wx.hideLoading()

        wx.showToast({
          title: '查询失败',
          icon: "loading"
        })
      }
    })

    // 获取所有的缺陷
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: app.globalData.getSearchBugInfo,
      data: {},
      method: 'GET',
      success: function(res) {
        wx.hideLoading()

        var list = res.data.getSearchBugInfo;
        console.log("查询结果:", res.data)
        if (list == undefined) {
          wx.showToast({
            title: "连接失败",
            icon: 'loading'
          });
        } else {
          searchBugList = list

          if (versionName == null) {
            console.log("没有入参传入", options);
            console.log("获取所有的缺陷进行展示: ");

            that.setData({
              defectList: list
            })
          } else {
            console.log("搜索指定版本: ", versionName)
            // 获取指定版本的数据库数据
            var tmpList = []
            for (var i in list) {
              var item = list[i]
              if (item.versionName == versionName) {
                tmpList.push(item)
              }
            }
            // 获取版本的index值
            var tmpIndex = 0;
            for (var j in versionList) {
              var item = versionList[j]
              if (item.versionName == versionName) {
                tmpIndex = j
                break
              }
            }
            that.setData({
              inputHidden: true,
              pickerHidden: false,

              companyChecked: false,
              versionChecked: true,
              keywordChecked: false,

              //缺陷列表
              index: tmpIndex,
              defectList: tmpList,
            })
          }
        }
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
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

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

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

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

  // 点击仅查看公司
  clickCompany: function(e) {
    console.log(e)
    this.setData({
      companyChecked: !this.data.companyChecked,
    })
  },

  // 选择版本勾选框
  clickVersion: function(e) {
    // 版本被勾选
    var verStatus = this.data.versionChecked
    var kwStatus = this.data.keywordChecked
    // 版本被勾选，关键字未被勾选
    if (verStatus == true && kwStatus == false) {
      this.setData({
        versionChecked: false,
        keywordChecked: false,
        inputHidden: false,
        pickerHidden: true
      })
    }

    // 版本未被勾选，关键字未被勾选
    if (verStatus == false && kwStatus == false) {
      this.setData({
        versionChecked: true,
        keywordChecked: false,
        inputHidden: true,
        pickerHidden: false
      })
    }
    // 版本被勾选，关键字被勾选
    if (verStatus == true && kwStatus == true) {
      this.setData({
        versionChecked: false,
        keywordChecked: true,
        inputHidden: false,
        pickerHidden: true
      })
    }
    // 版本未被勾选，关键字被勾选
    if (verStatus == false && kwStatus == true) {
      this.setData({
        versionChecked: true,
        keywordChecked: false,
        inputHidden: true,
        pickerHidden: false
      })
    }

  },

  // 选择关键字勾选框
  clickKeyword: function(e) {
    var verStatus = this.data.versionChecked
    var kwStatus = this.data.keywordChecked
    // 版本被勾选，关键字未被勾选
    if (verStatus == true && kwStatus == false) {
      this.setData({
        versionChecked: false,
        keywordChecked: true,
        inputHidden: false,
        pickerHidden: true
      })
    }

    // 版本未被勾选，关键字未被勾选
    if (verStatus == false && kwStatus == false) {
      this.setData({
        versionChecked: false,
        keywordChecked: true,
        inputHidden: false,
        pickerHidden: true
      })
    }
    // 版本被勾选，关键字被勾选
    if (verStatus == true && kwStatus == true) {
      this.setData({
        versionChecked: true,
        keywordChecked: false,
        inputHidden: true,
        pickerHidden: false
      })
    }
    // 版本未被勾选，关键字被勾选
    if (verStatus == false && kwStatus == true) {
      this.setData({
        versionChecked: false,
        keywordChecked: false,
        inputHidden: false,
        pickerHidden: true
      })
    }

  },

  // 版本进行选择
  chooseVersion: function(e) {
    console.log('选中的picker携带值为', e.detail.value)

    this.setData({
      index: e.detail.value
    })
  },

  // 提交需求
  searchFormSubmit: function(e) {
    var that = this;
    var formData = e.detail.value;

    var findCompany = formData.searchCompany.length;
    var findVersion = formData.searchVersion.length;
    var findKeyword = formData.searchKeyword.length;

    var versionName = formData.versionName;
    var content = formData.searchContent.trim();
    console.log("开始提交搜索内容", formData);

    // 检查内容是否符合要求
    var list = []
    if (this.checkPageRight(formData)) {
      // 所有的都没有被勾选，且内容为空
      console.log(searchBugList)
      var allShow = (findCompany == 0 && findVersion == 0 && findKeyword == 0 && content.length == 0)
      if (allShow) {
        console.log("清空搜索项，显示全部内容")
        list = searchBugList
      }

      // 只查看本公司
      var onlyCompany = (findCompany != 0 && findVersion == 0 && findKeyword == 0)
      if (onlyCompany) {
        var currentCompany = wx.getStorageSync("currentCompany")
        console.log("只查看本公司", currentCompany);
        for (var i in searchBugList) {
          var item = searchBugList[i]
          if (item.companyName == currentCompany) {
            list.push(item)
          }
        }
      }

      // 只查看版本
      var onlyVersion = (findCompany == 0 && findVersion != 0)
      if (onlyVersion) {
        console.log("只查看指定版本", versionName);
        for (var i in searchBugList) {
          var item = searchBugList[i]
          if (item.versionName == versionName) {
            list.push(item)
          }
        }
      }

      // 只查看关键字
      var onlyKeyWord = (findCompany == 0 && findKeyword != 0)
      if (onlyKeyWord) {
        console.log("只查看关键字");
        for (var i in searchBugList) {
          var item = searchBugList[i]
          if (item.title.indexOf(content) != -1 || item.defectDescription.indexOf(content) != -1) {
            list.push(item)
          }
        }
      }

      // 本公司+版本
      var companyVersion = (findCompany != 0 && findVersion != 0)
      if (companyVersion) {
        var currentCompany = wx.getStorageSync("currentCompany")
        console.log("本公司+版本");
        for (var i in searchBugList) {
          var item = searchBugList[i]
          if (item.companyName == currentCompany && item.versionName == versionName) {
            list.push(item)
          }
        }
      }

      // 本公司+关键字
      var companyKeyword = (findCompany != 0 && findKeyword != 0)
      if (companyKeyword) {
        var currentCompany = wx.getStorageSync("currentCompany")
        console.log("本公司+关键字");
        for (var i in searchBugList) {
          var item = searchBugList[i]
          if (item.companyName == currentCompany && (item.title.indexOf(content) != -1 || item.defectDescription.indexOf(content) != -1)) {
            list.push(item)
          }
        }
      }

      that.setData({
        defectList: list,
      })
    }


  },

  checkPageRight: function(formData) {
    var findCompany = formData.searchCompany.length;
    var findVersion = formData.searchVersion.length;
    var findKeyword = formData.searchKeyword.length;
    var findContent = formData.searchContent.trim().length;

    // 关键字被勾选，没有搜索内容
    var error1 = (findKeyword != 0 && findContent == 0 && findVersion == 0)
    if (error1) {
      console.log("关键字被勾选，没有搜索内容")
      wx.showToast({
        title: '内容必填',
        icon: "loading",
        duration: 2000,
      })

      return false;
    }

    // 关键字未被勾选，有搜索内容
    var error2 = (findKeyword == 0 && findContent != 0 && findVersion == 0)
    if (error2) {
      console.log("关键字未被勾选，有搜索内容")
      wx.showToast({
        title: '关键字必选',
        icon: "loading",
        duration: 2000,
      })

      return false;
    }
    return true;
  },

  // 跳转到缺陷详情中
  clickDetail: function(e) {
    var id = e.target.id;
    console.log("跳转到缺陷详情中", id)
    wx.navigateTo({
      url: app.globalData.bugDetail + "?defectId=" + id,
    })
  }
})