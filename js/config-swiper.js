const swiper = new Swiper(".new-product-swiper", {
    grabCursor: true,
    slidesPerView: "auto",
    spaceBetween: 24,
    watchOverflow: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});