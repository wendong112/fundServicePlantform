// pages/rankList/rankList.js
const app = getApp();
var modifyArray = {}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    var allData = this.sortList();
    this.setData({
      listData: allData,
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
    console.log("清空待操作的表");
    modifyArray = {}
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    // 根据modifyArray更新数据库
    //
    //
    //
    //
    for (var key in modifyArray) {
      var item = modifyArray[key]
      console.log("更新", item)
    }
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

  // 从数据库中取数据并加值和重新排序
  sortList: function() {
    console.log("从数据库中取数据并加值和重新排序")

    var telNum = wx.getStorageSync("telNum")
    console.log("当前用户的手机号码", telNum)

    var allList = [{
      "i": "1",
      "userName": "小赵",
      "telephone": "1",
      "company": "广发基金",
      "bugNumber": "7321",
      "likeCount": "26",
    },
    {
      "i": "2",
      "userName": "小钱",
      "telephone": "2",
      "company": "华夏基金",
      "bugNumber": "7129",
      "likeCount": "21"
    },
    {
      "i": "3",
      "userName": "小孙",
      "telephone": "3",
      "company": "嘉实基金",
      "bugNumber": "6743",
      "likeCount": "18"
    },
    {
      "i": "4",
      "userName": "小李",
      "telephone": "4",
      "company": "兴业基金",
      "bugNumber": "5026",
      "likeCount": "16"
    },
    {
      "i": "5",
      "userName": "小周",
      "telephone": "15140335343",
      "company": "兴业基金",
      "bugNumber": "4852",
      "likeCount": "15"
    },
    {
      "i": "6",
      "userName": "小吴",
      "telephone": "6",
      "company": "东吴基金",
      "bugNumber": "3688",
      "likeCount": "12"
    },
    {
      "i": "7",
      "userName": "小郑",
      "telephone": "7",
      "company": "富国基金",
      "bugNumber": "3521",
      "likeCount": "10"
    },
    {
      "i": "8",
      "userName": "小王",
      "telephone": "8",
      "company": "中银基金",
      "bugNumber": "3269",
      "likeCount": "9"
    },
    {
      "i": "9",
      "userName": "小冯",
      "telephone": "9",
      "company": "中银基金",
      "bugNumber": "3152",
      "likeCount": "8"
    },
    {
      "i": "10",
      "userName": "小陈",
      "telephone": "10",
      "company": "建信基金",
      "bugNumber": "3026",
      "likeCount": "6"
    },
    {
      "i": "11",
      "userName": "小褚",
      "telephone": "11",
      "company": "嘉实基金",
      "bugNumber": "2869",
      "likeCount": "5",
    },
    {
      "i": "12",
      "userName": "小卫",
      "telephone": "12",
      "company": "兴业基金",
      "bugNumber": "2756",
      "likeCount": "4",
    },
    {
      "i": "13",
      "userName": "小蒋",
      "telephone": "13",
      "company": "华夏基金",
      "bugNumber": "2655",
      "likeCount": "2",
    }
    ]

    var result = []

    // 添加第一个元素
    for (var i = 0; i < allList.length; i++) {
      if (allList[i].telephone == telNum) {
        allList[i]["imageSrc"] = app.globalData.grayHeartImg
        allList[i]["hasChange"] = false
        result.push(allList[i])
      }
    }

    // 添加其他元素
    for (var i = 0; i < allList.length; i++) {
      if (allList[i].telephone !== telNum) {
        allList[i]["imageSrc"] = app.globalData.grayHeartImg
        allList[i]["hasChange"] = false
        result.push(allList[i])
      }
    }
    return result;
  },

  // 点击赞
  clickAgree: function(e) {
    var index = e.currentTarget.dataset.curindex;
    console.log("点击的行数为：", index)

    var currentList = this.data.listData;

    var item = currentList[index]
    if (item) {
      var hasChange = item.hasChange;
      if (hasChange !== undefined) {
        var onum = item.likeCount;
        if (hasChange) {
          item.likeCount = (parseInt(onum) - 1);
          item.hasChange = false;
          item.imageSrc = app.globalData.grayHeartImg
        } else {
          item.likeCount = (parseInt(onum) + 1);
          item.hasChange = true;
          item.imageSrc = app.globalData.redHeartImg
        }

        // 变化加入modifyList中
        modifyArray[item.i] = item
        console.log(modifyArray)

        // 设置界面
        this.setData({
          listData: currentList
        })
      }
    }
  }
})