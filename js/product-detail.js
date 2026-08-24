(function () {
  "use strict";

  var productList = Array.isArray(window.ADER_PRODUCTS) ? window.ADER_PRODUCTS : [];
  var products = productList.reduce(function (result, product) {
    result[product.id] = product;
    return result;
  }, {});
  if (!productList.length) { return; }

  var params = new URLSearchParams(window.location.search);
  var activeId = products[params.get("id")] ? params.get("id") : productList[0].id;
  var formatPrice = function (price) { return new Intl.NumberFormat("ko-KR").format(price); };
  var escapeHtml = function (value) {
    return String(value).replace(/[&<>'"]/g, function (character) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[character];
    });
  };
  var swatches = {
    "Noir": "#222222",
    "Off White": "#f3f0e9",
    "Grey": "#858585",
    "Pink": "#e7a6b5",
    "Red": "#b52631",
    "Blue": "#516b87"
  };
  var gallery = document.querySelector("[data-gallery]");
  var galleryIndex = 0;
  var swipeStartX = null;

  var setGallerySlide = function (nextIndex) {
    var slides = gallery.querySelectorAll(".gallery-figure");
    var dots = gallery.querySelectorAll(".gallery-dot");
    if (!slides.length) { return; }
    galleryIndex = (nextIndex + slides.length) % slides.length;
    slides.forEach(function (slide, index) {
      var active = index === galleryIndex;
      slide.classList.toggle("is-active", active);
      slide.setAttribute("aria-hidden", String(!active));
    });
    dots.forEach(function (dot, index) {
      var active = index === galleryIndex;
      dot.classList.toggle("is-active", active);
      dot.setAttribute("aria-current", active ? "true" : "false");
    });
  };

  var render = function (id, updateHistory) {
    var product = products[id];
    if (!product) { return; }
    activeId = id;

    document.querySelectorAll("[data-product-name]").forEach(function (node) { node.textContent = product.name; });
    document.querySelector("[data-product-price]").textContent = formatPrice(product.price);
    document.querySelector("[data-product-color]").textContent = product.color;
    document.querySelector("[data-description]").textContent = product.description;
    document.querySelector("[data-material]").textContent = product.material;
    document.querySelector("[data-sku]").textContent = product.sku;
    document.querySelector("[data-origin]").textContent = product.origin;
    document.querySelector("[data-bag-button]").dataset.officialUrl = product.officialUrl;
    document.title = product.name + " " + product.color + " — ADERERROR";

    var gallerySlides = product.images.map(function (src, index) {
      return '<figure class="gallery-figure' + (index === 0 ? " is-active" : "") + '" aria-hidden="' + (index === 0 ? "false" : "true") + '"><img src="' + src + '" alt="' + escapeHtml(product.name + " " + product.color + " 제품 이미지 " + (index + 1)) + '" loading="' + (index < 2 ? "eager" : "lazy") + '"><span class="gallery-index">' + String(index + 1).padStart(2, "0") + ' / ' + String(product.images.length).padStart(2, "0") + '</span></figure>';
    }).join("");
    var galleryDots = product.images.map(function (_, index) {
      return '<button type="button" class="gallery-dot' + (index === 0 ? " is-active" : "") + '" data-gallery-slide="' + index + '" aria-label="이미지 ' + (index + 1) + ' 보기" aria-current="' + (index === 0 ? "true" : "false") + '"></button>';
    }).join("");
    gallery.innerHTML = gallerySlides +
      '<button type="button" class="gallery-arrow gallery-arrow--prev" data-gallery-prev aria-label="이전 상품 이미지">‹</button>' +
      '<button type="button" class="gallery-arrow gallery-arrow--next" data-gallery-next aria-label="다음 상품 이미지">›</button>' +
      '<div class="gallery-dots" aria-label="상품 이미지 선택">' + galleryDots + '</div>';
    galleryIndex = 0;

    var variants = productList.filter(function (item) { return item.name === product.name; });
    document.querySelector("[data-color-options]").innerHTML = variants.map(function (item) {
      return '<button type="button" class="color-option' + (item.id === id ? " active" : "") + '" style="--swatch:' + (swatches[item.color] || "#222") + '" data-product-id="' + item.id + '" aria-label="' + escapeHtml(item.name + " " + item.color) + '" title="' + escapeHtml(item.color) + '"></button>';
    }).join("");

    document.querySelector("[data-size-options]").innerHTML = product.sizes.map(function (size) {
      return '<button type="button" class="size-option" role="radio" aria-checked="false">' + escapeHtml(size) + '</button>';
    }).join("");

    var related = variants.filter(function (item) { return item.id !== id; })
      .concat(productList.filter(function (item) { return item.name !== product.name; }))
      .slice(0, 4);
    document.querySelector("[data-related-products]").innerHTML = related.map(function (item) {
      return '<a class="related-card" href="./product-detail.html?id=' + item.id + '"><div class="related-card__image"><img src="' + item.images[0] + '" alt="' + escapeHtml(item.name + " " + item.color) + '" loading="lazy"><img src="' + item.images[1] + '" alt="" loading="lazy"></div><div class="related-card__info"><h3>' + escapeHtml(item.name) + '</h3><strong>' + formatPrice(item.price) + '</strong><p>' + escapeHtml(item.color) + ' · IN STOCK</p></div></a>';
    }).join("");

    if (updateHistory) {
      window.history.pushState({ productId: id }, "", "?id=" + id);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  document.addEventListener("click", function (event) {
    var color = event.target.closest("[data-product-id]");
    var size = event.target.closest(".size-option");
    var wish = event.target.closest(".wish-button");
    var official = event.target.closest("[data-bag-button]");
    var galleryPrevious = event.target.closest("[data-gallery-prev]");
    var galleryNext = event.target.closest("[data-gallery-next]");
    var galleryDot = event.target.closest("[data-gallery-slide]");
    if (color) { render(color.dataset.productId, true); }
    if (galleryPrevious) { setGallerySlide(galleryIndex - 1); }
    if (galleryNext) { setGallerySlide(galleryIndex + 1); }
    if (galleryDot) { setGallerySlide(Number(galleryDot.dataset.gallerySlide)); }
    if (size) {
      document.querySelectorAll(".size-option").forEach(function (button) { button.setAttribute("aria-checked", "false"); });
      size.setAttribute("aria-checked", "true");
    }
    if (wish) {
      var pressed = wish.getAttribute("aria-pressed") === "true";
      wish.setAttribute("aria-pressed", String(!pressed));
      wish.setAttribute("aria-label", pressed ? "위시리스트에 추가" : "위시리스트에서 제거");
    }
    if (official && official.dataset.officialUrl) {
      window.open(official.dataset.officialUrl, "_blank", "noopener");
    }
  });

  var sizeDialog = document.querySelector("[data-size-dialog]");
  document.querySelector("[data-size-guide]").addEventListener("click", function () { sizeDialog.showModal(); });
  document.querySelector("[data-dialog-close]").addEventListener("click", function () { sizeDialog.close(); });
  sizeDialog.addEventListener("click", function (event) { if (event.target === sizeDialog) { sizeDialog.close(); } });
  gallery.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      setGallerySlide(galleryIndex - 1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      setGallerySlide(galleryIndex + 1);
    }
  });
  gallery.addEventListener("pointerdown", function (event) {
    if (!event.target.closest("button")) { swipeStartX = event.clientX; }
  });
  gallery.addEventListener("pointerup", function (event) {
    if (swipeStartX === null) { return; }
    var distance = event.clientX - swipeStartX;
    swipeStartX = null;
    if (Math.abs(distance) < 45) { return; }
    setGallerySlide(galleryIndex + (distance < 0 ? 1 : -1));
  });
  gallery.addEventListener("pointercancel", function () { swipeStartX = null; });
  window.addEventListener("popstate", function () {
    var nextId = new URLSearchParams(window.location.search).get("id");
    render(products[nextId] ? nextId : productList[0].id, false);
  });

  render(activeId, false);
})();
