// Hide header on scroll down, show on scroll up (desktop + mobile)
let lastScrollY = window.scrollY;
const desktopHeader = document.getElementById('header-page');
const mobileHeader = document.getElementById('mobile-header');
let ticking = false;

function setHeaderVisibility(isHidden) {
  const method = isHidden ? 'add' : 'remove';
  desktopHeader?.classList[method]('!-translate-y-full');
  mobileHeader?.classList[method]('!-translate-y-full');
}

function handleHeaderScroll() {
  const currentScrollY = Math.max(window.scrollY, 0);
  const isScrollingDown = currentScrollY > lastScrollY;
  const isPastThreshold = currentScrollY > 60;

  setHeaderVisibility(isScrollingDown && isPastThreshold);

  lastScrollY = currentScrollY;
  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(handleHeaderScroll);
    ticking = true;
  }
}, { passive: true });
