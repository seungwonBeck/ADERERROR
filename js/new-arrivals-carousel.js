(function () {
    "use strict";

    var isEn = document.documentElement.lang === "en";
    var labels = isEn
        ? { prev: "Previous products", next: "Next products" }
        : { prev: "이전 상품", next: "다음 상품" };
    var arrow = function (path) {
        return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="' + path + '"></path></svg>';
    };

    document.querySelectorAll(".product-feature-panel").forEach(function (panel) {
        var grid = panel.querySelector(".product-feature-grid");
        if (!grid) { return; }

        // 호버 시 보여줄 두 번째 이미지: <a data-hover-src="..."> 가 있을 때만 생성
        grid.querySelectorAll(".featured-product[data-hover-src]").forEach(function (card) {
            var media = card.querySelector(".featured-product-media");
            var alt = document.createElement("img");
            alt.className = "featured-product-alt";
            alt.src = card.dataset.hoverSrc;
            alt.alt = "";
            alt.loading = "lazy";
            media.insertBefore(alt, media.querySelector(".featured-product-cta"));
        });

        var controls = document.createElement("div");
        controls.className = "na-controls";
        controls.innerHTML =
            '<div class="na-progress" aria-hidden="true"><span class="na-progress-thumb"></span></div>' +
            '<div class="na-buttons">' +
            '<button type="button" class="na-btn na-prev" aria-label="' + labels.prev + '">' + arrow("M15 18 9 12l6-6") + '</button>' +
            '<button type="button" class="na-btn na-next" aria-label="' + labels.next + '">' + arrow("m9 18 6-6-6-6") + '</button>' +
            '</div>';
        grid.insertAdjacentElement("afterend", controls);

        var thumb = controls.querySelector(".na-progress-thumb");
        var prev = controls.querySelector(".na-prev");
        var next = controls.querySelector(".na-next");

        function update() {
            var max = grid.scrollWidth - grid.clientWidth;
            var hasOverflow = max > 1;
            controls.hidden = !hasOverflow;
            if (!hasOverflow) { return; }
            thumb.style.width = (grid.clientWidth / grid.scrollWidth * 100) + "%";
            thumb.style.left = (grid.scrollLeft / grid.scrollWidth * 100) + "%";
            prev.disabled = grid.scrollLeft <= 1;
            next.disabled = grid.scrollLeft >= max - 1;
        }

        function step(direction) {
            var card = grid.querySelector(".featured-product");
            var amount = card ? card.getBoundingClientRect().width : grid.clientWidth * 0.8;
            grid.scrollBy({ left: direction * amount, behavior: "smooth" });
        }

        prev.addEventListener("click", function () { step(-1); });
        next.addEventListener("click", function () { step(1); });
        grid.addEventListener("scroll", update, { passive: true });
        window.addEventListener("resize", update);
        if (window.ResizeObserver) { new ResizeObserver(update).observe(grid); }

        // 마우스 드래그로 가로 스크롤 (터치는 브라우저 기본 스크롤 사용)
        var startX = 0, startLeft = 0, dragging = false, moved = false;
        grid.addEventListener("pointerdown", function (event) {
            if (event.pointerType !== "mouse" || event.button !== 0) { return; }
            dragging = true;
            moved = false;
            startX = event.clientX;
            startLeft = grid.scrollLeft;
        });
        window.addEventListener("pointermove", function (event) {
            if (!dragging) { return; }
            var dx = event.clientX - startX;
            if (Math.abs(dx) > 5) {
                moved = true;
                grid.classList.add("is-dragging");
            }
            if (moved) { grid.scrollLeft = startLeft - dx; }
        });
        window.addEventListener("pointerup", function () {
            if (!dragging) { return; }
            dragging = false;
            grid.classList.remove("is-dragging");
        });
        grid.addEventListener("click", function (event) {
            if (moved) {
                event.preventDefault();
                moved = false;
            }
        }, true);
        grid.addEventListener("dragstart", function (event) { event.preventDefault(); });

        update();
    });
}());
