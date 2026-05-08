
const cartBtns = [document.getElementById('cart-btn'), document.getElementById('cart-btn-mobile')].filter(Boolean);

const cartPanel = document.getElementById('cart-panel');
const overlay = document.getElementById('cart-overlay');
const closeBtn = document.getElementById('close-cart');

if (!cartBtns.length || !cartPanel || !overlay || !closeBtn) {
    console.warn('Cart popup elements not found', { cartBtns, cartPanel, overlay, closeBtn });
}

cartBtns.forEach((button) => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        cartPanel.classList.remove('translate-x-full');
        overlay.classList.remove('opacity-0', 'invisible');
    });
});

function closeCart() {
    cartPanel.classList.add('translate-x-full');
    overlay.classList.add('opacity-0', 'invisible');
}

closeBtn?.addEventListener('click', closeCart);
overlay?.addEventListener('click', closeCart);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeCart();
});
