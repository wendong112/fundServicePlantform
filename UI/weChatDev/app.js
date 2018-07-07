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
    addUser: "https://www.fundserviceplatform.cn/fundService/api/addUser",

    // 故障信息中心使用的图片
    commitImage: "/image/ringFirstPage/bugCommitImg.png",
    searchImage: "/image/ringFirstPage/bugSearchImg.png",
    rightArrowImage: "/image/common/rightArrow.png",
    // 故障信息中心 - 缺陷搜索页面使用的链接
    // 使用的array(之后使用数据库替换)
    //
    //
    //
    imgServerURL: "http://www.runoob.com/images/",
    uploadServerURL: "",
    versionArray: [{
      version: '20160122X',
      imageURL: "http://www.runoob.com/images/logo.png" //给项目信息中心使用
    }, {
      version: '20160122D_7',
      imageURL: "http://www.runoob.com/images/pulpit.jpg" //给项目信息中心使用
    }, {
      version: '20160122D',
      imageURL: "http://www.runoob.com/images/logo.png" //给项目信息中心使用
    }, {
      version: '20160122I_3',
      imageURL: "http://www.runoob.com/images/pulpit.jpg" //给项目信息中心使用
    }],

    moduleArray: ['风险控制', '基金财务', '交易管理', '日终清算'],
    levelArray: ['1-改善建议', '2-轻微问题', '3-一般问题', '4-严重问题', '5-致命问题'],

    // 测试场景共建
    reqImg: "/image/testInformationShare/requirementSubmit.png",
    sceneImg: "/image/testInformationShare/scenarioLibPic.png",
    // 测试场景共建 - 查看测试场景页面使用的链接

    // 项目信息中心使用
    progressImg: "/image/uniformTest/projectProgress.jpg",
    threeLineIcon: "/image/common/threeline.png",

    // 排行榜(已完成)
    getRankList: "https://www.fundserviceplatform.cn/fundService/api/getRankList",
    modifyLikeCountByPhone: "https://www.fundserviceplatform.cn/fundService/api/modifyLikeCountByPhone",
    redHeartImg: "/image/rankList/redHeart.png",
    grayHeartImg: "/image/rankList/grayHeart.png"
  }
})