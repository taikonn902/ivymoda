document.addEventListener("DOMContentLoaded", () => {

    const slider = document.getElementById("banner-slider");
    if (!slider) return;

    const originalSlides = slider.querySelectorAll(":scope > div");
    if (!originalSlides.length) return;

    const nextBtn = document.getElementById("banner-next");
    const prevBtn = document.getElementById("banner-prev");
    const dots = document.querySelectorAll(".dot-inner");
    const dotBtns = document.querySelectorAll(".dot");

    const total = originalSlides.length;
    const firstClone = originalSlides[0].cloneNode(true);
    const lastClone = originalSlides[total - 1].cloneNode(true);
    slider.insertBefore(lastClone, slider.firstChild);
    slider.appendChild(firstClone);

    let index = 1;
    let auto;
    let isAnimating = false;

    function updateSlider() {
        isAnimating = true;
        slider.style.transition = "transform 520ms ease-in-out";
        slider.style.transform = `translateX(-${index * 100}%)`;

        dots.forEach(dot => {
            dot.style.width = "0%";
            dot.style.transition = "none";
        });

        setTimeout(() => {
            const activeDotIndex = (index - 1 + total) % total;
            const activeDot = dots[activeDotIndex];
            if (!activeDot) return;
            activeDot.style.transition = "width 3s linear";
            activeDot.style.width = "100%";
        }, 30);
    }

    function nextSlide() {
        index += 1;
        updateSlider();
    }

    function prevSlide() {
        index -= 1;
        updateSlider();
    }

    function startAuto() {
        auto = setInterval(nextSlide, 3000);
    }

    function resetAuto() {
        clearInterval(auto);
        startAuto();
    }

    nextBtn?.addEventListener("click", () => {
        if (isAnimating) return;
        nextSlide();
        resetAuto();
    });

    prevBtn?.addEventListener("click", () => {
        if (isAnimating) return;
        prevSlide();
        resetAuto();
    });

    dotBtns.forEach((btn, i) => {
        btn.addEventListener("click", () => {
            if (isAnimating) return;
            index = i + 1;
            updateSlider();
            resetAuto();
        });
    });

    slider.addEventListener("transitionend", () => {
        if (index === total + 1) {
            slider.style.transition = "none";
            index = 1;
            slider.style.transform = `translateX(-${index * 100}%)`;
            slider.offsetHeight;
            slider.style.transition = "transform 520ms ease-in-out";
        }

        if (index === 0) {
            slider.style.transition = "none";
            index = total;
            slider.style.transform = `translateX(-${index * 100}%)`;
            slider.offsetHeight;
            slider.style.transition = "transform 520ms ease-in-out";
        }

        isAnimating = false;
    });

    updateSlider();
    startAuto();
});
