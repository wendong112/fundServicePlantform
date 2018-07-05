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

    // 跳转使用到的页面
    startPage: "/pages/loginRegisterPage/loginRegisterPage",
    loginPage: "/pages/loginPage/loginPage",
    registerPage: '/pages/registerPage/registerPage',
    firstTab: '/pages/ringFirstPage/ringFirstPage',
    bugCommit: "/pages/bugSubmittingPage/bugSubmittingPage",
    bugSearch: "/pages/bugSearchingPage/bugSearchingPage",
    bugDetail: "/pages/defectDetailedInfo/defectDetailedInfo",
    projectProgressDetail: "/pages/projectProgressDetail/projectProgressDetail",
    reqCommit: "/pages/businessRequSubmit/businessRequSubmit",
    sceneView: "/pages/businessRequLibLooking/businessRequLibLooking",
    sceneDetail: "/pages/sceneDetailedInfo/sceneDetailedInfo",
    messageEdit: "/pages/messageEditing/messageEditing",

    // 故障信息中心使用的图片
    commitImage: "/image/ringFirstPage/bugCommitImg.png",
    searchImage: "/image/ringFirstPage/bugSearchImg.png",
    rightArrowImage: "/image/common/rightArrow.png",
    // 故障信息中心 - 缺陷搜索页面使用的链接
    allBugURL: "http://127.0.0.1:8080/defectplatform/superadmin/listdefect",

    // 测试场景共建
    reqImg: "/image/testInformationShare/requirementSubmit.png",
    sceneImg: "/image/testInformationShare/scenarioLibPic.png",
    // 测试场景共建 - 查看测试场景页面使用的链接
    allReqURL: "",
    downloadServerURL: "http://www.runoob.com/images/",

    // 项目信息中心使用
    progressImg: "/image/uniformTest/projectProgress.jpg",
    threeLineIcon: "/image/common/threeline.png",
    imgServerURL: "http://www.runoob.com/images/",
  }
})