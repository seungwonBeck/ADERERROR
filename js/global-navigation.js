(function () {
  "use strict";

  var script = document.currentScript;
  var root = script && script.dataset.root ? script.dataset.root : ".";
  var href = function (path) { return root + "/" + path; };
  var routes = {
    home: "index.html",
    men: "sup/shop/shop.html",
    women: "sup/shop/shop-tshirt.html",
    accessories: "sup/shop/shop-tshirt.html#products",
    collaboration: "sup/aderaciv/aderaciv.html",
    significant: "sup/Style Guide/StyleGuide.html",
    essence: "sup/shop/shop.html#products",
    styleFeed: "sup/Style Guide/StyleGuide.html",
    archive: "sup/aderaciv/aderaciv.html"
  };
  var icon = function (name) {
    var icons = {
      search: '<circle cx="10.5" cy="10.5" r="6.5"></circle><path d="m15.5 15.5 4 4"></path>',
      heart: '<path d="M20.8 4.7a5.3 5.3 0 0 0-7.5 0L12 6l-1.3-1.3a5.3 5.3 0 0 0-7.5 7.5L12 21l8.8-8.8a5.3 5.3 0 0 0 0-7.5Z"></path>',
      bag: '<path d="M5 8h14l-1 13H6L5 8Z"></path><path d="M9 9V6a3 3 0 0 1 6 0v3"></path>'
    };
    return '<svg viewBox="0 0 24 24" aria-hidden="true">' + icons[name] + '</svg>';
  };

  var desktopLinks = [
    ["남성", routes.men],
    ["여성", routes.women],
    ["액세서리", routes.accessories],
    ["콜라보레이션", routes.collaboration],
    ["시그니피컨트", routes.significant],
    ["에센스", routes.essence]
  ];
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

  var routeForItem = function (item) {
    if (/Poetic|Bluemark|10주년|협업/.test(item)) { return routes.collaboration; }
    if (/스타일|캠페인/.test(item)) { return routes.significant; }
    if (/티셔츠|드레스|스커트/.test(item)) { return routes.women; }
    if (/슈즈|주얼리|모자|넥타이|키링|지갑|양말|벨트|가방|토트백|크로스백|숄더백|액세서리/.test(item)) {
      return routes.accessories;
    }
    return routes.men;
  };
  var routeForGroupItem = function (groupLabel, item) {
    if (groupLabel === "여성") { return routes.women; }
    if (groupLabel === "액세서리" || groupLabel === "가방") { return routes.accessories; }
    if (groupLabel === "콜라보레이션" || groupLabel === "캡슐 컬렉션") { return routes.collaboration; }
    if (groupLabel === "시그니피컨트") { return routes.significant; }
    if (groupLabel === "에센스") { return /티셔츠/.test(item) ? routes.women : routes.essence; }
    return routeForItem(item);
  };
  var list = function (items, groupLabel) {
    return items.map(function (item) {
      return '<a href="' + href(routeForGroupItem(groupLabel, item)) + '">' + item + '</a>';
    }).join("");
  };
  var mega = megaColumns.map(function (column) {
    return '<section><strong class="ader-mega-title">' + column[0] + '</strong><div class="ader-mega-list">' + list(column.slice(1), column[0]) + '</div></section>';
  }).join("");
  var mobile = groups.map(function (group) {
    return '<div class="ader-mobile-row"><button type="button" aria-expanded="false"><span>' + group[0] + '</span><span class="ader-mobile-arrow">›</span></button><div class="ader-mobile-sub">' + list(group[1], group[0]) + '</div></div>';
  }).join("");

  var header = document.createElement("header");
  header.className = "ader-global-header";
  header.innerHTML =
    '<div class="ader-nav-top">' +
    '<nav class="ader-nav-primary" aria-label="상품 카테고리">' + desktopLinks.map(function (item) { return '<a href="' + href(item[1]) + '">' + item[0] + '</a>'; }).join("") + '</nav>' +
    '<a class="ader-nav-brand" href="' + href(routes.home) + '" aria-label="ADERERROR 메인"><img src="' + href("image/index_img/logo.png") + '" alt="ADERERROR"></a>' +
    '<nav class="ader-nav-utility" aria-label="사용자 메뉴"><div class="ader-nav-text-links"><a href="' + href(routes.styleFeed) + '">스타일피드</a><span class="ader-archive-link"><span class="ader-blue" aria-hidden="true"></span><a href="' + href(routes.archive) + '">Ader Archive</a></span></div><div class="ader-nav-icons" role="group" aria-label="바로가기"><button class="ader-nav-icon" aria-label="검색">' + icon("search") + '</button><button class="ader-nav-icon" aria-label="위시리스트">' + icon("heart") + '</button><button class="ader-nav-icon" aria-label="쇼핑백">' + icon("bag") + '</button></div></nav>' +
    '</div>' +
    '<div class="ader-mega-menu"><div class="ader-mega-inner"><section class="ader-mega-feature"><strong class="ader-mega-title">하이라이트</strong><div class="ader-mega-list"><a href="' + href("sup/shop/shop.html") + '">26SS 컬렉션</a><a href="' + href("sup/shop/shop-tshirt.html") + '">티셔츠 컬렉션</a><a href="' + href("sup/aderaciv/aderaciv.html") + '">Poetic Project</a></div><div class="ader-feature-art"><img src="' + href("image/nav_header.jpg") + '" alt="ADERERROR 컬렉션"></div><a href="' + href("sup/shop/shop.html") + '">인기 상품 보러가기</a></section>' + mega + '</div></div>' +
    '<div class="ader-mobile-head"><button class="ader-nav-menu-button" type="button" aria-label="메뉴 열기" aria-expanded="false"><span></span><span></span><span></span></button><a class="ader-nav-brand" href="' + href(routes.home) + '"><img src="' + href("image/index_img/logo.png") + '" alt="ADERERROR"></a><div class="ader-mobile-actions"><button class="ader-nav-icon" aria-label="쇼핑백">' + icon("bag") + '</button></div></div>' +
    '<nav class="ader-mobile-drawer" aria-label="모바일 메뉴">' + mobile + '<a class="ader-mobile-direct" href="' + href("sup/aderaciv/aderaciv.html") + '"><span>Poetic Project</span><span class="ader-mobile-arrow">›</span></a><div class="ader-mobile-search">' + icon("search") + '<span>검색</span></div></nav>';

  document.body.insertBefore(header, document.body.firstChild);
  document.body.classList.add("ader-global-ready");

  var footerContainer = document.querySelector(".footer .footer-container");
  if (footerContainer && !footerContainer.querySelector(".footer-brand")) {
    var footerBrand = document.createElement("aside");
    footerBrand.className = "footer-brand";
    footerBrand.setAttribute("aria-label", "ADERERROR 브랜드");
    footerBrand.innerHTML =
      '<a href="' + href(routes.home) + '" aria-label="ADERERROR 메인">' +
      '<img src="' + href("image/footer_logo.png") + '" alt="ADERERROR">' +
      '</a>' +
      '<p>BUT NEAR MISSED THINGS</p>';
    footerContainer.appendChild(footerBrand);
  }

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
