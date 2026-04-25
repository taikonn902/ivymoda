let cart = [];

function loadCart() {
    const data = localStorage.getItem('cart');
    if (data) {
        cart = JSON.parse(data);
    }
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

document.addEventListener('DOMContentLoaded', () => {

    loadCart();
    renderCart();

    document.querySelectorAll('.product-colors').forEach(group => {
        const items = group.querySelectorAll('.color-item');

        items.forEach(btn => {
            btn.addEventListener('click', () => {
                items.forEach(i => i.classList.remove('selected'));
                btn.classList.add('selected');
            });
        });
    });

    // Nhấn add-to-cart -> chọn size -> done
    document.querySelectorAll('.product-item').forEach(item => {
        const cartBtn = item.querySelector('.group');
        const sizeBox = item.querySelector('.product-sizes');
        const sizeItems = item.querySelectorAll('.size-item');

        let isSizeOpen = false;

        cartBtn.addEventListener('click', (e) => {
            e.preventDefault();

            const selectedColor = item.querySelector('.color-item.selected');

            if (!selectedColor) {
                Toast.fire({
                    icon: 'error',
                    title: 'Vui lòng chọn màu trước!'
                });
                return;
            }

            isSizeOpen = !isSizeOpen;

            if (isSizeOpen) {
                sizeBox.classList.remove('hidden');
            } else {
                sizeBox.classList.add('hidden');
            }
        });

        sizeItems.forEach(size => {
            size.addEventListener('click', () => {

                const selectedSize = size.dataset.size;
                const selectedColor = item.querySelector('.color-item.selected')?.dataset.color;
                const productName = item.querySelector('#product-name')?.innerText;
                const productPrice = item.querySelector('#flash-sale-price-new')?.innerText;
                const productImage = item.querySelector('img')?.src;

                const product = {
                    id: Date.now(),
                    name: productName,
                    price: productPrice,
                    image: productImage,
                    color: selectedColor,
                    size: selectedSize,
                    quantity: 1
                };

                const existing = cart.find(p =>
                    p.name === product.name &&
                    p.color === product.color &&
                    p.size === product.size
                );

                if (existing) {
                    existing.quantity++;
                } else {
                    cart.push(product);
                }

                saveCart();
                renderCart();

                isSizeOpen = false;
                sizeBox.classList.add('hidden');

                Toast.fire({
                    icon: 'success',
                    title: 'Đã thêm vào giỏ hàng!'
                });
            });
        });
    });

    function renderCart() {
        const cartItems = document.getElementById('cart-items');
        const cartPrice = document.getElementById('cart-price');
        const cartCount = document.querySelector('.cart-total');

        cartItems.innerHTML = '';

        let totalQuantity = 0;
        let total = 0;

        if (cart.length === 0) {
            cartItems.innerHTML = `
                <div class="flex flex-col items-center justify-center text-center">
                    <img src="/images/null-cart.jpg" class="absolute h-full poiter-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                </div>
            `;

            return;
        }

        cart.forEach(item => {

            const priceNumber = parseInt(item.price.replace(/\D/g, ''));
            const itemTotal = priceNumber * item.quantity;

            total += itemTotal;
            totalQuantity += item.quantity;

            const div = document.createElement('div');
            div.className = "flex gap-3 border-b pb-3 relative";

            div.innerHTML = `
            <img src="${item.image}" class="w-[70px] h-[90px] object-cover rounded">

            <div class="flex-1">
                <p class="text-sm font-medium">${item.name}</p>
                <p class="text-xs text-gray-500">${item.color} / ${item.size}</p>

                <div class="flex items-center justify-between mt-2 bottom-0 relative">
                    <div class="flex items-center rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                        <button class="decrease px-3 py-1.5 text-gray-600 hover:bg-red-50 hover:text-red-500 transition active:scale-95">-</button>

                        <span class="px-4 py-1.5 text-sm font-medium text-gray-800 border-x border-gray-200">
                            ${item.quantity}
                        </span>

                        <button class="increase px-3 py-1.5 text-gray-600 hover:bg-green-50 hover:text-green-500 transition active:scale-95">+</button>
                    </div>

                    <span class="text-sm font-semibold">
                        ${itemTotal.toLocaleString('vi-VN')}đ
                    </span>
                </div>
            </div>
            `;

            div.querySelector('.increase').addEventListener('click', () => {
                item.quantity++;
                saveCart();
                renderCart();
            });

            div.querySelector('.decrease').addEventListener('click', () => {
                if (item.quantity > 1) {
                    item.quantity--;
                } else {
                    cart = cart.filter(p => p.id !== item.id);
                }
                saveCart();
                renderCart();
            });

            cartItems.appendChild(div);
        });

        cartPrice.innerText = total.toLocaleString('vi-VN') + 'đ';

        if (cartCount) {
            cartCount.innerText = totalQuantity;
            cartCount.style.display = 'flex';
        }
    }
});