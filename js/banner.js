document.addEventListener("DOMContentLoaded", () => {

    const slider = document.getElementById("banner-slider");
    const slides = document.querySelectorAll("#banner-slider > div");
    const nextBtn = document.getElementById("banner-next");
    const prevBtn = document.getElementById("banner-prev");
    const dots = document.querySelectorAll(".dot-inner");
    const dotBtns = document.querySelectorAll(".dot");

    let index = 0;
    const total = slides.length;
    let auto;

    function updateSlider() {
        slider.style.transform = `translateX(-${index * 100}%)`;

        dots.forEach(dot => {
            dot.style.width = "0%";
            dot.style.transition = "none";
        });

        setTimeout(() => {
            dots[index].style.transition = "width 3s linear";
            dots[index].style.width = "100%";
        }, 30);
    }

    function nextSlide() {
        index = (index + 1) % total;
        updateSlider();
    }

    function prevSlide() {
        index = (index - 1 + total) % total;
        updateSlider();
    }

    function startAuto() {
        auto = setInterval(nextSlide, 3000);
    }

    function resetAuto() {
        clearInterval(auto);
        startAuto();
    }

    nextBtn.addEventListener("click", () => {
        nextSlide();
        resetAuto();
    });

    prevBtn.addEventListener("click", () => {
        prevSlide();
        resetAuto();
    });

    dotBtns.forEach((btn, i) => {
        btn.addEventListener("click", () => {
            index = i;
            updateSlider();
            resetAuto();
        });
    });

    updateSlider();
    startAuto();
});
