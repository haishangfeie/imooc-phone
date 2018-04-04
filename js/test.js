window.onload = function(event){
  (function() {
    // 用于测试动画效果
    // 存放每页测试动画的元素
    var aniObj = {
      ".page-1": [
        ".page-1__heading",
        ".page-1__phone",
        ".page-1__shadow"
      ],
      ".page-2":[
        ".page-2__heading",
        ".page-2__subheading",
        ".page-2__phone",
        ".page-2__indicatrix_i1",
        ".page-2__indicatrix_i2",
        ".page-2__indicatrix_i3"
      ],
      ".page-3":[
        ".page-3__heading",
        ".page-3__subheading",
        ".page-3__phone",
        ".page-3__features"
      ],
      ".page-4":[
        ".page-4__heading",
        ".page-4__subheading",
        ".page-4__phones__item_i1",
        ".page-4__phones__item_i2",
        ".page-4__phones__item_i3",
        ".page-4__phones__item_i4"
      ],
      ".page-5":[
        ".page-5__heading",
        ".page-5__subheading",
        ".page-5__bg"
      ]
    };
    // 需求：点击页面时，动画在初始化或完成动画之间切换

    // 点击页面的时候，动画启动，再点击又还原
    var isNeedInit = true; // 是否需要给动画初始化
    // 如果需要初始化，则初始化相应页面
    if(isNeedInit){
      for(k in aniObj){
        var pageEle = document.querySelector(k);
        for(var i=0;i<aniObj[k].length;i++){
          var ele = pageEle.querySelector(aniObj[k][i]);
          var classStr = ele.className;
          classStr += ' '+ aniObj[k][i].substr(1) + '_status_init';
          ele.className = classStr;
        }
      }
    }

    // 给页面绑定事件
    document.onclick = function(event){
      // 点击页面切换动画状态
      for(k in aniObj){
        var pageEle = document.querySelector(k);
        var classList = aniObj[k];
        for(var i=0;i<classList.length;i++){
          var ele = pageEle.querySelector(classList[i]);
          var classStr = ele.className;
          var initAniStr = classList[i].substr(1) + '_status_init';
          if(classStr.indexOf(initAniStr) !==-1){
            classStr = classStr.split(initAniStr).join(' ').replace(/ +/g,' ');
          } else {
            classStr += ' ' +initAniStr;
          }
          ele.className = classStr;
        }

      }
    }
  })();
}