
const cartBtn = document.getElementById('cart-btn');

const cartPanel = document.getElementById('cart-panel');
const overlay = document.getElementById('cart-overlay');
const closeBtn = document.getElementById('close-cart');

if (!cartBtn || !cartPanel || !overlay || !closeBtn) {
    console.warn('Cart popup elements not found', { cartBtn, cartPanel, overlay, closeBtn });
}

cartBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    cartPanel.classList.remove('translate-x-full');
    overlay.classList.remove('opacity-0', 'invisible');
});

function closeCart() {
    cartPanel.classList.add('translate-x-full');
    overlay.classList.add('opacity-0', 'invisible');
}

closeBtn.addEventListener('click', closeCart);
overlay.addEventListener('click', closeCart);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeCart();
});
