$(function () {
    const $slider = $('.collaboration-slider');
    const $track = $slider.find('.collaboration-track');
    const $originalSlides = $track.find('.collab-slide');
    const slideCount = $originalSlides.length;
    let physicalIndex = 1;
    let touchStartX = 0;
    let isAnimating = false;

    if (slideCount < 2) return;

    const $firstClone = $originalSlides.first()
        .clone(false)
        .removeClass('is-active is-prev is-next')
        .attr({ 'aria-hidden': 'true', 'tabindex': '-1', 'data-collab-clone': 'true' });
    const $lastClone = $originalSlides.last()
        .clone(false)
        .removeClass('is-active is-prev is-next')
        .attr({ 'aria-hidden': 'true', 'tabindex': '-1', 'data-collab-clone': 'true' });

    $track.prepend($lastClone).append($firstClone);

    const $slides = $track.find('.collab-slide');

    function renderSlides() {
        $slides
            .removeClass('is-active is-prev is-next')
            .attr('aria-hidden', 'true')
            .attr('tabindex', '-1');

        const $activeSlide = $slides.eq(physicalIndex).addClass('is-active');

        if (!$activeSlide.is('[data-collab-clone]')) {
            $activeSlide.attr('aria-hidden', 'false').removeAttr('tabindex');
        }
    }

    function positionTrack(animate) {
        const activeSlide = $slides.eq(physicalIndex)[0];
        const activeCenter = activeSlide.offsetLeft + (activeSlide.offsetWidth / 2);

        $slider.toggleClass('is-jumping', !animate);
        $track.css('transform', `translateX(${-activeCenter}px)`);

        if (!animate) {
            $track[0].offsetHeight;
        }
    }

    function moveSlide(direction) {
        if (isAnimating) return;

        isAnimating = true;
        physicalIndex += direction;
        renderSlides();
        positionTrack(true);
    }

    $slider.find('.collab-prev').on('click', function () {
        moveSlide(-1);
    });

    $slider.find('.collab-next').on('click', function () {
        moveSlide(1);
    });

    $slider.on('keydown', function (event) {
        if (event.key === 'ArrowLeft') {
            event.preventDefault();
            moveSlide(-1);
        }
        if (event.key === 'ArrowRight') {
            event.preventDefault();
            moveSlide(1);
        }
    });

    $slider.on('touchstart', function (event) {
        touchStartX = event.originalEvent.touches[0].clientX;
    });

    $slider.on('touchend', function (event) {
        const touchEndX = event.originalEvent.changedTouches[0].clientX;
        const distance = touchEndX - touchStartX;

        if (Math.abs(distance) > 45) {
            moveSlide(distance < 0 ? 1 : -1);
        }
    });

    $track.on('transitionend', function (event) {
        if (event.target !== $track[0]) return;
        if (event.originalEvent.propertyName !== 'transform') return;

        if (physicalIndex === 0) {
            physicalIndex = slideCount;
        } else if (physicalIndex === slideCount + 1) {
            physicalIndex = 1;
        }

        renderSlides();
        positionTrack(false);
        window.requestAnimationFrame(function () {
            $slider.removeClass('is-jumping');
            isAnimating = false;
        });
    });

    $(window).on('resize.collaborationSlider', function () {
        isAnimating = false;
        positionTrack(false);
        window.requestAnimationFrame(function () {
            $slider.removeClass('is-jumping');
        });
    });

    $slider.attr('tabindex', '0');
    renderSlides();
    positionTrack(false);
    window.requestAnimationFrame(function () {
        $slider.addClass('is-ready').removeClass('is-jumping');
    });
});
