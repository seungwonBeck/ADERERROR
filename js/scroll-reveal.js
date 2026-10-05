(function () {
    "use strict";

    if (!("IntersectionObserver" in window)) { return; }

    // [선택자, 효과, 그룹 내 순차 지연(초)]
    var rules = [
        // 메인
        [".card-section .entry-card", "up", 0.12],
        [".highlight-section .section-title", "up", 0],
        [".hl-collage .hl-item", "up", 0.14],
        [".product-feature-heading", "up", 0],
        [".product-feature-panel.is-active .product-feature-grid", "up", 0],
        [".collaboration-section h2", "up", 0],
        [".collaboration-slider", "up", 0.1],
        // 아카이브
        [".archive-tabs", "up", 0],
        [".archive-feature .af-item", "up", 0.14],
        [".archive-feature .af-title", "up", 0],
        [".archive-intro--split .ai-head", "left", 0],
        [".archive-intro--split .ai-body", "right", 0],
        [".archive-products-head", "fade", 0],
        [".product-grid .product-card", "up", 0.1]
    ];

    var targets = [];
    rules.forEach(function (rule) {
        var groupCounts = new Map();
        document.querySelectorAll(rule[0]).forEach(function (el) {
            if (el.hasAttribute("data-reveal")) { return; }
            var parent = el.parentElement;
            var index = groupCounts.get(parent) || 0;
            groupCounts.set(parent, index + 1);
            el.setAttribute("data-reveal", rule[1] === "up" ? "" : rule[1]);
            el.style.setProperty("--reveal-delay", (Math.min(index, 4) * rule[2]).toFixed(2) + "s");
            targets.push(el);
        });
    });

    if (!targets.length) { return; }
    document.documentElement.classList.add("js-reveal");

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) { return; }
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });

    targets.forEach(function (el) { observer.observe(el); });
}());
