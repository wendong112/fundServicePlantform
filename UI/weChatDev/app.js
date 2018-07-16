//app.js
App({
  onLaunch: function() {
    console.log('App Launch')
  },
  onShow: function(options) {
    // Do something when show.
  },
  onHide: function() {
    // Do something when hide.
  },
  onError: function(msg) {
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

    // 登录注册页面(已完成)
    getUserByPhone: "https://www.fundserviceplatform.cn/fundService/api/getUserByPhone",
    getAllCompany: "https://www.fundserviceplatform.cn/fundService/api/getAllCompany",
    addUserInfo: "https://www.fundserviceplatform.cn/fundService/api/addUserInfo",

    // 故障信息共享
    getUserBugInfo: "https://www.fundserviceplatform.cn/fundService/api/getUserBugInfo",
    getMainBugInfo: "https://www.fundserviceplatform.cn/fundService/api/getMainBugInfo",
    getAllVersion: "https://www.fundserviceplatform.cn/fundService/api/getAllVersion",
    getAllModule: "https://www.fundserviceplatform.cn/fundService/api/getAllModule",
    getAllSeverity: "https://www.fundserviceplatform.cn/fundService/api/getAllSeverity",
    getSearchBugInfo: "https://www.fundserviceplatform.cn/fundService/api/getSearchBugInfo",
    addNewDefect: "https://www.fundserviceplatform.cn/fundService/api/addNewDefect",
    modifyDefectById: "https://www.fundserviceplatform.cn/fundService/api/modifyDefectById",
    getDefectById: "https://www.fundserviceplatform.cn/fundService/api/getDefectById",
    getMessageByDefectId: "https://www.fundserviceplatform.cn/fundService/api/getMessageByDefectId",
    addMessage: "https://www.fundserviceplatform.cn/fundService/api/addMessage",
    roundImage: "/image/ringFirstPage/roundImg.png",
    commitImage: "/image/ringFirstPage/bugCommitImg.png",
    searchImage: "/image/ringFirstPage/bugSearchImg.png",
    rightArrowImage: "/image/common/rightArrow.png",

    // 故障信息中心 - 缺陷搜索页面使用的array
    // 使用的array(之后使用数据库替换)
    //
    //
    //
    imgServerURL: "http://www.runoob.com/images/",
    versionArray: [{
      version: '20160122X',
      imageURL: "http://www.fundserviceplatform.cn:8080/uniformTest/detail1.jpg" //给项目信息中心使用
    }, {
      version: '20160122D_7',
      imageURL: "http://www.fundserviceplatform.cn:8080/uniformTest/detail2.jpg" //给项目信息中心使用
    }, {
      version: '20160122D',
      imageURL: "http://www.fundserviceplatform.cn:8080/uniformTest/detail3.jpg" //给项目信息中心使用
    }, {
      version: '20160122I_3',
      imageURL: "http://www.fundserviceplatform.cn:8080/uniformTest/detail1.jpg" //给项目信息中心使用
    }],

    // 测试场景共建
    getTop3BusinessReq: "https://www.fundserviceplatform.cn/fundService/api/getTop3BusinessReq",
    addBusinessReq: "https://www.fundserviceplatform.cn/fundService/api/addBusinessReq",
    getScenarioByReqId: "https://www.fundserviceplatform.cn/fundService/api/getScenarioByReqId",
    getAllBusinessReq: "https://www.fundserviceplatform.cn/fundService/api/getAllBusinessReq",
    reqImg: "/image/testInformationShare/requirementSubmit.png",
    sceneImg: "/image/testInformationShare/scenarioLibPic.png",

    // 项目信息中心使用
    progressImg: "http://www.fundserviceplatform.cn:8080/uniformTest/progress.png",
    threeLineIcon: "/image/common/threeline.png",

    // 排行榜(已完成)
    getRankList: "https://www.fundserviceplatform.cn/fundService/api/getRankList",
    modifyLikeCountByPhone: "https://www.fundserviceplatform.cn/fundService/api/modifyLikeCountByPhone",
    redStarImg: "/image/rankList/redStar.png",
    redHeartImg: "/image/rankList/redHeart.png",
    grayHeartImg: "/image/rankList/grayHeart.png"
  }
})