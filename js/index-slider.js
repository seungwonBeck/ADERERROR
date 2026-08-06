$(function () {
    const $slider = $('.main-slider');
    const $slides = $slider.find('.slide');
    const $dots = $slider.find('.dot');
    const slideCount = $slides.length;
    const autoplayDelay = 5000;
    let currentIndex = 0;
    let autoplayTimer = null;
    let touchStartX = 0;

    if (slideCount < 2) return;

    $dots.each(function (index) {
        $(this).attr({
            role: 'button',
            tabindex: '0',
            'aria-label': `${index + 1}번 슬라이드로 이동`
        });
    });

    function changeSlide(nextIndex) {
        currentIndex = (nextIndex + slideCount) % slideCount;

        $slides.removeClass('active').attr('aria-hidden', 'true');
        $dots.removeClass('active').attr('aria-current', 'false');

        const $activeSlide = $slides.eq(currentIndex);
        $activeSlide.addClass('active').attr('aria-hidden', 'false');
        $dots.eq(currentIndex).addClass('active').attr('aria-current', 'true');

        $slides.find('video').each(function () {
            if (this.closest('.slide') === $activeSlide[0]) {
                this.play().catch(function () {});
            } else {
                this.pause();
            }
        });
    }

    function stopAutoplay() {
        window.clearInterval(autoplayTimer);
        autoplayTimer = null;
    }

    function startAutoplay() {
        stopAutoplay();
        autoplayTimer = window.setInterval(function () {
            changeSlide(currentIndex + 1);
        }, autoplayDelay);
    }

    function moveAndRestart(nextIndex) {
        changeSlide(nextIndex);
        startAutoplay();
    }

    $slider.find('.next-btn').on('click', function () {
        moveAndRestart(currentIndex + 1);
    });

    $slider.find('.prev-btn').on('click', function () {
        moveAndRestart(currentIndex - 1);
    });

    $dots.on('click', function () {
        moveAndRestart($(this).index());
    }).on('keydown', function (event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            $(this).trigger('click');
        }
    });

    $slider.on('mouseenter focusin', stopAutoplay);
    $slider.on('mouseleave focusout', startAutoplay);

    $slider.on('touchstart', function (event) {
        touchStartX = event.originalEvent.touches[0].clientX;
        stopAutoplay();
    });

    $slider.on('touchend', function (event) {
        const touchEndX = event.originalEvent.changedTouches[0].clientX;
        const distance = touchEndX - touchStartX;

        if (Math.abs(distance) > 50) {
            changeSlide(currentIndex + (distance < 0 ? 1 : -1));
        }
        startAutoplay();
    });

    changeSlide(0);
    startAutoplay();
});
