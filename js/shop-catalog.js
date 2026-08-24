(function () {
  "use strict";

  var productSection = document.querySelector("[data-catalog]");
  var pagination = document.querySelector(".pagination");
  if (!productSection || !pagination || !Array.isArray(window.ADER_PRODUCTS)) { return; }

  var mode = productSection.dataset.catalog;
  var products = window.ADER_PRODUCTS.filter(function (product) {
    if (mode !== "tops") { return true; }
    return !/Trousers/i.test(product.name);
  });
  var perPage = 12;
  var totalPages = Math.max(1, Math.ceil(products.length / perPage));
  var params = new URLSearchParams(window.location.search);
  var requestedPage = Number(params.get("page")) || 1;
  var currentPage = Math.min(totalPages, Math.max(1, requestedPage));
  var visibleProducts = products.slice((currentPage - 1) * perPage, currentPage * perPage);

  var formatPrice = function (price) { return new Intl.NumberFormat("ko-KR").format(price); };
  var escapeHtml = function (value) {
    return String(value).replace(/[&<>'"]/g, function (character) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[character];
    });
  };
  var swatchClass = function (color) {
    var value = color.toLowerCase();
    if (value.indexOf("white") > -1) { return "white"; }
    if (value.indexOf("grey") > -1 || value.indexOf("gray") > -1) { return "gray"; }
    if (value.indexOf("pink") > -1) { return "pink"; }
    if (value.indexOf("red") > -1) { return "red"; }
    if (value.indexOf("blue") > -1) { return "blue"; }
    return "black";
  };

  productSection.innerHTML = visibleProducts.map(function (product) {
    return '<a class="product-card" href="./product-detail.html?id=' + product.id + '" aria-label="' + escapeHtml(product.name + " " + product.color + " 상세보기") + '">' +
      '<div class="product-image"><img src="' + product.cardImage + '" alt="' + escapeHtml(product.name + " " + product.color) + '" loading="lazy"></div>' +
      '<div class="product-info"><h3>' + escapeHtml(product.name) + '</h3><strong>' + formatPrice(product.price) + '</strong>' +
      '<p>COLOR <i class="swatch ' + swatchClass(product.color) + '" title="' + escapeHtml(product.color) + '"></i></p>' +
      '<p>SIZE <small>' + product.sizes.map(escapeHtml).join("　") + '</small></p></div></a>';
  }).join("");

  var pageHref = function (page) { return "?page=" + page + "#products"; };
  var links = [];
  links.push('<a href="' + pageHref(Math.max(1, currentPage - 1)) + '" aria-label="이전 페이지">‹</a>');
  for (var page = 1; page <= totalPages; page += 1) {
    links.push('<a' + (page === currentPage ? ' class="active" aria-current="page"' : '') + ' href="' + pageHref(page) + '">[' + page + ']</a>');
  }
  links.push('<a href="' + pageHref(Math.min(totalPages, currentPage + 1)) + '" aria-label="다음 페이지">›</a>');
  pagination.innerHTML = links.join("");
})();
