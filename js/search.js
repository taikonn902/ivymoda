 // Mở modal khi bấm icon search trong header
 const searchIcon = document.getElementById('open-search-modal');
 const searchModal = document.getElementById('search-modal');
 const closeModalBtn = document.getElementById('close-search-modal');

 if (searchIcon && searchModal && closeModalBtn) {
     searchIcon.addEventListener('click', function (e) {
         e.preventDefault();
         searchModal.classList.remove('hidden');
         setTimeout(() => {
             const input = searchModal.querySelector('input[type="search"]');
             if (input) input.focus();
         }, 100);
     });
     closeModalBtn.addEventListener('click', function () {
         searchModal.classList.add('hidden');
     });
     // Đóng modal khi bấm nền mờ
     searchModal.addEventListener('click', function (e) {
         if (e.target === searchModal) {
             searchModal.classList.add('hidden');
         }
     });
     // Đóng modal khi nhấn ESC
     document.addEventListener('keydown', function (e) {
         if (e.key === 'Escape') {
             searchModal.classList.add('hidden');
         }
     });
 }

// Carousel logic for course banner (slide effect)
const bannerSlider = document.getElementById('banner-slider');
const bannerImgs = document.querySelectorAll('.banner-img');
const bannerRadios = document.querySelectorAll('.banner-radio');
const prevBtn = document.getElementById('banner-prev');
const nextBtn = document.getElementById('banner-next');
let currentBanner = 0;

function showBanner(idx) {
    if (bannerSlider) {
        bannerSlider.style.transform = `translateX(-${idx * 100}%)`;
    }
    bannerRadios.forEach((radio, i) => {
        radio.checked = i === idx;
    });
    currentBanner = idx;
}

if (bannerImgs.length && bannerRadios.length) {
    // Radio click
    bannerRadios.forEach((radio, i) => {
        radio.addEventListener('change', () => {
            showBanner(i);
        });
    });
    // Prev button
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            let idx = (currentBanner - 1 + bannerImgs.length) % bannerImgs.length;
            showBanner(idx);
        });
    }
    // Next button
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            let idx = (currentBanner + 1) % bannerImgs.length;
            showBanner(idx);
        });
    }
    // Init
    showBanner(0);
}