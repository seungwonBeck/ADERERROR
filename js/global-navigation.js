(function () {
  "use strict";

  var script = document.currentScript;
  var root = script && script.dataset.root ? script.dataset.root : ".";
  var href = function (path) { return root + "/" + path; };
  var icon = function (name) {
    var icons = {
      search: '<circle cx="10.5" cy="10.5" r="6.5"></circle><path d="m15.5 15.5 4 4"></path>',
      heart: '<path d="M20.8 4.7a5.3 5.3 0 0 0-7.5 0L12 6l-1.3-1.3a5.3 5.3 0 0 0-7.5 7.5L12 21l8.8-8.8a5.3 5.3 0 0 0 0-7.5Z"></path>',
      bag: '<path d="M5 8h14l-1 13H6L5 8Z"></path><path d="M9 9V6a3 3 0 0 1 6 0v3"></path>'
    };
    return '<svg viewBox="0 0 24 24" aria-hidden="true">' + icons[name] + '</svg>';
  };

  var desktopLabels = ["남성", "여성", "액세서리", "콜라보레이션", "시그니피컨트", "에센스"];
  var groups = [
    ["남성", ["전체보기", "26SS 의류", "아우터", "니트웨어", "스웨트셔츠 & 후디", "티셔츠", "상의 & 셔츠", "팬츠"]],
    ["여성", ["전체보기", "26SS 의류", "아우터", "니트웨어", "티셔츠", "상의 & 셔츠", "팬츠", "드레스 & 스커트"]],
    ["액세서리", ["전체보기", "슈즈", "주얼리", "모자", "넥타이", "키링 & 참", "지갑", "양말", "벨트"]],
    ["콜라보레이션", ["Poetic Project", "Bluemark", "10주년 아카이브"]],
    ["시그니피컨트", ["스타일 가이드", "스타일피드", "캠페인"]],
    ["에센스", ["베스트 상품", "티셔츠 컬렉션", "Key Look"]]
  ];
  var megaColumns = [
    ["의류", "전체보기", "26SS 의류", "아우터", "니트웨어", "스웨트셔츠 & 후디", "티셔츠", "상의 & 셔츠", "팬츠", "데님"],
    ["액세서리", "전체보기", "26SS 액세서리", "슈즈", "주얼리", "모자", "넥타이", "키링 & 참", "지갑", "양말", "벨트"],
    ["가방", "전체보기", "토트백", "크로스백", "숄더백"],
    ["캡슐 컬렉션", "10주년", "Poetic Project", "Bluemark"]
  ];

  var list = function (items) {
    return items.map(function (item) { return '<a href="' + href("sup/shop/shop.html") + '">' + item + '</a>'; }).join("");
  };
  var mega = megaColumns.map(function (column) {
    return '<section><strong class="ader-mega-title">' + column[0] + '</strong><div class="ader-mega-list">' + list(column.slice(1)) + '</div></section>';
  }).join("");
  var mobile = groups.map(function (group) {
    return '<div class="ader-mobile-row"><button type="button" aria-expanded="false"><span>' + group[0] + '</span><span class="ader-mobile-arrow">›</span></button><div class="ader-mobile-sub">' + list(group[1]) + '</div></div>';
  }).join("");

  var header = document.createElement("header");
  header.className = "ader-global-header";
  header.innerHTML =
    '<div class="ader-nav-top">' +
    '<nav class="ader-nav-primary" aria-label="상품 카테고리">' + desktopLabels.map(function (label) { return '<button type="button">' + label + '</button>'; }).join("") + '</nav>' +
    '<a class="ader-nav-brand" href="' + href("Index.html") + '" aria-label="ADERERROR 메인"><img src="' + href("image/index_img/logo.png") + '" alt="ADERERROR"></a>' +
    '<nav class="ader-nav-utility" aria-label="사용자 메뉴"><a href="' + href("sup/Style Guide/StyleGuide.html") + '">스타일피드</a><a href="' + href("sup/aderaciv/aderaciv.html") + '"><span class="ader-blue"></span>Ader Archive</a><button class="ader-nav-icon" aria-label="검색">' + icon("search") + '</button><button class="ader-nav-icon" aria-label="위시리스트">' + icon("heart") + '</button><button class="ader-nav-icon" aria-label="쇼핑백">' + icon("bag") + '</button></nav>' +
    '</div>' +
    '<div class="ader-mega-menu"><div class="ader-mega-inner"><section class="ader-mega-feature"><strong class="ader-mega-title">하이라이트</strong><div class="ader-mega-list"><a href="' + href("sup/shop/shop.html") + '">26SS 컬렉션</a><a href="' + href("sup/shop/shop-tshirt.html") + '">티셔츠 컬렉션</a><a href="' + href("sup/aderaciv/aderaciv.html") + '">Poetic Project</a></div><div class="ader-feature-art"><img src="' + href("image/nav_header.jpg") + '" alt="ADERERROR 컬렉션"></div><a href="' + href("sup/shop/shop.html") + '">인기 상품 보러가기</a></section>' + mega + '</div></div>' +
    '<div class="ader-mobile-head"><button class="ader-nav-menu-button" type="button" aria-label="메뉴 열기" aria-expanded="false"><span></span><span></span><span></span></button><a class="ader-nav-brand" href="' + href("Index.html") + '"><img src="' + href("image/index_img/logo.png") + '" alt="ADERERROR"></a><div class="ader-mobile-actions"><button class="ader-nav-icon" aria-label="쇼핑백">' + icon("bag") + '</button></div></div>' +
    '<nav class="ader-mobile-drawer" aria-label="모바일 메뉴">' + mobile + '<a class="ader-mobile-direct" href="' + href("sup/aderaciv/aderaciv.html") + '"><span>Poetic Project</span><span class="ader-mobile-arrow">›</span></a><div class="ader-mobile-search">' + icon("search") + '<span>검색</span></div></nav>';

  document.body.insertBefore(header, document.body.firstChild);
  document.body.classList.add("ader-global-ready");

  var menuButton = header.querySelector(".ader-nav-menu-button");
  menuButton.addEventListener("click", function () {
    var open = header.classList.toggle("menu-open");
    document.body.classList.toggle("ader-menu-locked", open);
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "메뉴 닫기" : "메뉴 열기");
  });
  header.querySelectorAll(".ader-mobile-row > button").forEach(function (button) {
    button.addEventListener("click", function () {
      var open = button.parentElement.classList.toggle("open");
      button.setAttribute("aria-expanded", String(open));
    });
  });

  var desktopNav = header.querySelector(".ader-nav-primary");
  desktopNav.addEventListener("mouseenter", function () { header.classList.add("mega-open"); });
  header.addEventListener("mouseleave", function () { header.classList.remove("mega-open"); });
  desktopNav.addEventListener("focusin", function () { header.classList.add("mega-open"); });
  desktopNav.querySelectorAll("button").forEach(function (button) {
    button.addEventListener("click", function () { header.classList.toggle("mega-open"); });
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      header.classList.remove("mega-open", "menu-open");
      document.body.classList.remove("ader-menu-locked");
      menuButton.setAttribute("aria-expanded", "false");
    }
  });
  window.addEventListener("resize", function () {
    if (window.innerWidth > 1024 && header.classList.contains("menu-open")) {
      header.classList.remove("menu-open");
      document.body.classList.remove("ader-menu-locked");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "메뉴 열기");
    }
  });
})();
