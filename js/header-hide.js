// Hide header on scroll down, show on scroll up
let lastScrollY = window.scrollY;
const header = document.getElementById('header-page');
let ticking = false;

function handleHeaderScroll() {
  const currentScrollY = window.scrollY;
  if (currentScrollY > lastScrollY && currentScrollY > 60) {
    // Scroll down, hide header
    header.classList.add('!-translate-y-full');
  } else {
    // Scroll up, show header
    header.classList.remove('!-translate-y-full');
  }
  lastScrollY = currentScrollY;
  ticking = false;
}

window.addEventListener('scroll', function () {
  if (!ticking) {
    window.requestAnimationFrame(handleHeaderScroll);
    ticking = true;
  }
});
