window.onload = function(event) {
  // 启动各页动画
  // 存放每页动画的元素
  var aniObj = {
    ".page-1": [".page-1__heading", ".page-1__phone", ".page-1__shadow"],
    ".page-2": [".page-2__heading", ".page-2__subheading", ".page-2__phone", ".page-2__indicatrix_i1", ".page-2__indicatrix_i2", ".page-2__indicatrix_i3"],
    ".page-3": [".page-3__heading", ".page-3__subheading", ".page-3__phone", ".page-3__features"],
    ".page-4": [".page-4__heading", ".page-4__subheading", ".page-4__phones__item_i1", ".page-4__phones__item_i2", ".page-4__phones__item_i3", ".page-4__phones__item_i4"],
    ".page-5": [".page-5__heading", ".page-5__subheading", ".page-5__bg"]
  };
  var pageLen = 5, //页面的数量
    pageHeight = 800; // 页面高度800
  // 侧边栏及其item
  var aside = document.querySelector('.aside-right'),
    asideList = aside.querySelectorAll('.aside-right__item');
  // 除了第一页，其他的都进行初始化
  for (k in aniObj) {
    if (k === "page-1__heading") {
      continue;
    }
    var pageEle = document.querySelector(k);
    for (var i = 0; i < aniObj[k].length; i++) {
      var ele = pageEle.querySelector(aniObj[k][i]);
      var classStr = ele.className;
      classStr += ' ' + aniObj[k][i].substr(1) + '_status_init';
      ele.className = classStr;
    }
  }
  window.onscroll = function(event) {
    var top = document.documentElement.scrollTop;
    // 修改header样式，同时显示侧边栏
    // header的高度是60px
    if (top > 100) {
      addClass(document.querySelector('.header'), 'header_custom_rev');
      addClass(aside, 'aside-right_status_show');
    } else {
      removeClass(document.querySelector('.header'), 'header_custom_rev');
      removeClass(aside, 'aside-right_status_show');
    }
    // 切换页面动画
    for (var i = 0; i < pageLen; i++) {
      // 往下滚时，在准备滚到页面前触发动画，往上滚时，在滚到页面的一部分后触发动画
      if (top > i * pageHeight - 200 && top < (i + 1) * pageHeight - 200) {
        startAnimation('.page-' + (i + 1));
        // 激活导航栏以及侧边栏样式
        activeNavItem(i);
        slideNavTip(i);
        activeAside(i);
      } else {
        goBackAnimation('.page-' + (i + 1));
      }
    }
  }
  // 滑动门特效
  var nav = document.querySelector('.header__right__nav'),
    navTip = nav.querySelector('.header__right__nav__tip'),
    navList = nav.querySelectorAll('.header__right__nav__item');
  // 滑动门的单位距离是100px
  var navTipPosUnit = 100;
  for (var i = 0; i < navList.length; i++) {
    var navItem = navList[i];
    navItem.setAttribute('data-index', i);
    navItem.onmouseover = function(event) {
      var index = this.getAttribute('data-index') * 1; // 转换为数字
      slideNavTip(index);
    }
    navItem.onmouseout = function(event) {
      var index = 0;
      for (var j = 0; j < navList.length; j++) {
        var classStr = navList[j].className;
        if (classStr.indexOf('header__right__nav__item_status_active') !== -1) {
          index = navList[j].getAttribute('data-index');
          break;
        }
      }
      slideNavTip(index);
    }
    navItem.onclick = function(event) {
      var index = this.getAttribute('data-index');
      activeNavItem(index);
      // 实现跳转
      document.documentElement.scrollTop = document.body.scrollTop = index * pageHeight;
      activeAside(index)
      return false;
    };
  }
  // 侧边栏跳转
  for (var i = 0; i < asideList.length; i++) {
    var asideItem = asideList[i];
    asideItem.setAttribute('data-index', i);
    asideItem.onclick = function(event) {
      var index = this.getAttribute('data-index');
      activeNavItem(index);
      // 实现跳转
      document.documentElement.scrollTop = document.body.scrollTop = index * pageHeight;
      activeAside(index);
      return false;
    }
  }
  // 手动触发滚动事件，为了触发第一屏的动画
  window.onscroll();

  function activeNavItem(index) {
    for (var i = 0; i < navList.length; i++) {
      removeClass(navList[i], 'header__right__nav__item_status_active');
    }
    addClass(navList[index], 'header__right__nav__item_status_active');
  }

  function activeAside(index) {
    // 同步侧边栏
    for (var i = 0; i < asideList.length; i++) {
      removeClass(asideList[i], 'aside-right__item_status_active');
    }
    addClass(asideList[index], 'aside-right__item_status_active');
  }

  function slideNavTip(index) {
    navTip.style.transform = 'translateX(' + (index * navTipPosUnit) + 'px)';
  }

  function startAnimation(selector) {
    var pageEle = document.querySelector(selector);
    var classList = aniObj[selector];
    for (var i = 0; i < classList.length; i++) {
      var ele = pageEle.querySelector(classList[i]);
      var classStr = ele.className;
      var initAniStr = classList[i].substr(1) + '_status_init';
      removeClass(ele, initAniStr);
    }
  }

  function goBackAnimation(selector) {
    var pageEle = document.querySelector(selector);
    var classList = aniObj[selector];
    for (var i = 0; i < classList.length; i++) {
      var ele = pageEle.querySelector(classList[i]);
      var classStr = ele.className;
      var initAniStr = classList[i].substr(1) + '_status_init';
      addClass(ele, initAniStr);
    }
  }
  // 这个添加类的函数并不严谨，例如判断是否已有类的时候，没考虑类名恰好是已有类名的一部分的情况
  function addClass(ele, className) {
    var classStr = ele.className;
    if (classStr.indexOf(className) === -1) {
      classStr += ' ' + className;
      ele.className = classStr;
    }
  }

  function removeClass(ele, className) {
    var classStr = ele.className;
    if (classStr.indexOf(className) !== -1) {
      classStr = classStr.split(className).join(' ').replace(/\s+/g, ' ');
      ele.className = classStr;
    }
  }
}