//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    isPopping: false,//是否已经弹出  
    animPlus: {},//旋转动画  
    animCollect: {},//item位移,透明度  
    animTranspond: {},//item位移,透明度  
    animInput: {},//item位移,透明度 
    animPrjctProgress: {},
  },

  //点击弹出  
  plus: function () {
    if (this.data.isPopping) {
      //缩回动画  
      this.popp();
      this.setData({
        isPopping: false
      })
    } else if (!this.data.isPopping) {
      //弹出动画  
      this.takeback();
      this.setData({
        isPopping: true
      })
    }
  },
  input: function () {
    console.log("input")
  },
  transpond: function () {
    console.log("transpond")
  },
  collect: function () {
    console.log("collect")
  },

  //弹出动画  
  popp: function () {
    //plus顺时针旋转  
    var animationPlus = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationcollect = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationTranspond = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationInput = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationProgress = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    animationPlus.rotateZ(360).step();

    //缺陷提交
    animationInput.translate(-100, -100).rotateZ(180).opacity(1).step();

    //缺陷跟踪
    animationTranspond.translate(-40, -40).rotateZ(180).opacity(1).step();

    //缺陷搜索
    animationcollect.translate(-40, 40).rotateZ(180).opacity(1).step();

    //项目进展
    animationProgress.translate(-100, 100).rotateZ(180).opacity(1).step();

    this.setData({
      animPlus: animationPlus.export(),
      animCollect: animationcollect.export(),
      animTranspond: animationTranspond.export(),
      animInput: animationInput.export(),
      animPrjctProgress: animationProgress.export(),
    })
  },
  //收回动画  
  takeback: function () {
    //plus逆时针旋转  
    var animationPlus = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationcollect = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationTranspond = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationInput = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    var animationProgress = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })

    animationPlus.rotateZ(0).step();

    animationcollect.translate(0, 0).rotateZ(0).opacity(0).step();

    animationTranspond.translate(0, 0).rotateZ(0).opacity(0).step();

    animationInput.translate(0, 0).rotateZ(0).opacity(0).step();

    animationProgress.translate(0, 0).rotateZ(0).opacity(0).step();

    this.setData({
      animPlus: animationPlus.export(),
      animCollect: animationcollect.export(),
      animTranspond: animationTranspond.export(),
      animInput: animationInput.export(),
      animPrjctProgress: animationProgress.export(),
    })
  },

  //事件处理函数,缺陷提交
  bindViewOfBugAdding: function () {
    wx.navigateTo({
      url: '../operation/operation'
    })
  },

  //事件处理函数,缺陷跟踪
  bindViewOfBugTracing: function () {
    wx.navigateTo({
      url: '../list/list'
    })
  },

  bindViewOfSearchingBugs: function () {
    wx.navigateTo({
      url: '../viewKindBugs/viewKindBugs'
    })
  },

  bindViewOfProjectProgress: function () {
    wx.navigateTo({
      url: '../projectProgressDisplaying/projectProgressDisplaying'
    })
  },

  onLoad: function () {

  }
})


