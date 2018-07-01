//app.js
App({
  onLaunch: function () {
    console.log('App Launch')
  },
  onShow: function (options) {
    // Do something when show.
  },
  onHide: function () {
    // Do something when hide.
  },
  onError: function (msg) {
    console.log(msg)
  },
  globalData: {
    userInfo: null,
    // 网络图片地址（项目信息中心使用）
    imgServerURL: "http://www.runoob.com/images/",

    // 故障信息中心使用的图片
    commitImage: "/image/ringFirstPage/bugCommitImg.ico",
    searchImage: "/image/ringFirstPage/bugSearchImg.ico",

    // 跳转使用到的页面
    startPage: "/pages/loginRegisterPage/loginRegisterPage",
    loginPage: "/pages/loginPage/loginPage",
    registerPage: '/pages/registerPage/registerPage',
    firstTab: '/pages/ringFirstPage/ringFirstPage',
    bugCommit: "/pages/bugSubmittingPage/bugSubmittingPage",
    bugSearch: "/pages/bugSearchingPage/bugSearchingPage",
    bugDetail: "/pages/defectDetailedInfo/defectDetailedInfo",

    // 缺陷搜索页面使用的链接
    allBugURL: "http://127.0.0.1:8080/defectplatform/superadmin/listdefect",
  }
})