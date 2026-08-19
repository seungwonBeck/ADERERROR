(function () {
    "use strict";

    var tabList = document.querySelector(".product-gender-tabs");

    if (!tabList) {
        return;
    }

    var tabs = Array.from(tabList.querySelectorAll('[role="tab"]'));
    var viewAll = document.querySelector(".product-view-all");

    function activateTab(nextTab) {
        tabs.forEach(function (tab) {
            var isSelected = tab === nextTab;
            var panel = document.getElementById(tab.getAttribute("aria-controls"));

            tab.classList.toggle("is-active", isSelected);
            tab.setAttribute("aria-selected", String(isSelected));
            tab.setAttribute("tabindex", isSelected ? "0" : "-1");

            if (panel) {
                panel.hidden = !isSelected;
                panel.classList.toggle("is-active", isSelected);
            }
        });

        if (viewAll) {
            var isWomen = nextTab.id === "new-arrivals-women-tab";
            viewAll.href = isWomen ? viewAll.dataset.womenHref : viewAll.dataset.menHref;
        }
    }

    tabs.forEach(function (tab, index) {
        tab.addEventListener("click", function () {
            activateTab(tab);
        });

        tab.addEventListener("keydown", function (event) {
            var nextIndex = index;

            if (event.key === "ArrowRight" || event.key === "ArrowDown") {
                nextIndex = (index + 1) % tabs.length;
            } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
                nextIndex = (index - 1 + tabs.length) % tabs.length;
            } else if (event.key === "Home") {
                nextIndex = 0;
            } else if (event.key === "End") {
                nextIndex = tabs.length - 1;
            } else {
                return;
            }

            event.preventDefault();
            tabs[nextIndex].focus();
            activateTab(tabs[nextIndex]);
        });
    });
}());
