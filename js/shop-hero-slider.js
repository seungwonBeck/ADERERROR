(function () {
  "use strict";

  var hero = document.querySelector(".collection-hero");
  if (!hero) return;

  var slides = Array.from(hero.querySelectorAll(".collection-slides img"));
  var title = hero.querySelector(".collection-copy h1");
  var counter = hero.querySelector(".hero-progress small");
  var progress = hero.querySelector(".hero-progress span");
  var categories = [
    "Best T-shirt",
    "Best Shoes",
    "Best Bag",
    "Best Hat",
    "Best Jewelry",
    "Best Accessories"
  ];
  var current = 0;
  var timer;
  var touchStartX = 0;
  var pointerStartX = 0;
  var pointerDragging = false;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function show(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach(function (slide, slideIndex) {
      var active = slideIndex === current;
      slide.classList.toggle("active", active);
      slide.setAttribute("aria-hidden", String(!active));
    });
    title.innerHTML = "ADER 26 / SS <span>" + categories[current] + "</span>";
    counter.textContent = String(current + 1).padStart(2, "0") + " / " + String(slides.length).padStart(2, "0");
    progress.style.setProperty("--hero-progress", ((current + 1) / slides.length * 100) + "%");
  }

  function stop() { window.clearInterval(timer); }
  function play() {
    stop();
    if (!reduceMotion) timer = window.setInterval(function () { show(current + 1); }, 3000);
  }
  function move(amount) { show(current + amount); play(); }

  hero.addEventListener("mouseenter", stop);
  hero.addEventListener("mouseleave", play);
  hero.addEventListener("focusin", stop);
  hero.addEventListener("focusout", play);
  hero.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") move(-1);
    if (event.key === "ArrowRight") move(1);
  });
  hero.addEventListener("touchstart", function (event) { touchStartX = event.changedTouches[0].clientX; }, { passive: true });
  hero.addEventListener("touchend", function (event) {
    var distance = event.changedTouches[0].clientX - touchStartX;
    if (Math.abs(distance) > 45) move(distance > 0 ? -1 : 1);
  }, { passive: true });
  hero.addEventListener("pointerdown", function (event) {
    if (event.pointerType === "touch" || event.button !== 0) return;
    pointerStartX = event.clientX;
    pointerDragging = true;
    hero.classList.add("is-dragging");
    hero.setPointerCapture(event.pointerId);
    stop();
  });
  hero.addEventListener("pointerup", function (event) {
    if (!pointerDragging) return;
    var distance = event.clientX - pointerStartX;
    pointerDragging = false;
    hero.classList.remove("is-dragging");
    if (hero.hasPointerCapture(event.pointerId)) hero.releasePointerCapture(event.pointerId);
    if (Math.abs(distance) > 55) move(distance > 0 ? -1 : 1);
    else play();
  });
  hero.addEventListener("pointercancel", function () {
    pointerDragging = false;
    hero.classList.remove("is-dragging");
    play();
  });
  hero.addEventListener("dragstart", function (event) { event.preventDefault(); });
  document.addEventListener("visibilitychange", function () { document.hidden ? stop() : play(); });

  hero.setAttribute("tabindex", "0");
  show(0);
  play();
})();
