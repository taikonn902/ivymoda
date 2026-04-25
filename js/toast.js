let currentToast = null;
let removeTimeout = null;
let expandTimeout = null;

function showToast({ type, title, message }) {

    const config = {
        success: { 
            icon: `
            <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
            </svg>`
        },
        error: { 
            icon: `
            <svg class="w-5 h-5 text-red-500" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>`
        },
        warning: { 
            icon: `
            <svg class="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v4m0 4h.01M10.29 3.86l-7.4 12.8A1 1 0 003.76 18h16.48a1 1 0 00.87-1.34l-7.4-12.8a1 1 0 00-1.74 0z"/>
            </svg>`
        }
    };

    const root = document.getElementById('toast-root');

    // 🔁 Nếu đã có toast → update, KHÔNG animate lại toast
    if (currentToast) {
        clearTimeout(removeTimeout);
        clearTimeout(expandTimeout);

        // reset trạng thái message
        currentToast.classList.remove('expand');

        currentToast.innerHTML = `
            <div class="toast-message text-sm text-gray-300 leading-relaxed">
                ${message}
            </div>

            <div class="flex items-center gap-3 font-medium">
                ${config[type].icon}
                <span>${title}</span>
            </div>
        `;

        // force reflow để animation message chạy lại
        void currentToast.offsetHeight;

        expandTimeout = setTimeout(() => {
            currentToast.classList.add('expand');
        }, 100);

    } else {
        // 🆕 lần đầu → có animation
        currentToast = document.createElement('div');
        currentToast.className = `
            toast relative bg-[#111] text-white
            rounded-[24px] px-6 py-4 w-[360px] shadow-2xl
        `;

        currentToast.innerHTML = `
            <div class="toast-message text-sm text-gray-300 leading-relaxed">
                ${message}
            </div>

            <div class="flex items-center gap-3 font-medium">
                ${config[type].icon}
                <span>${title}</span>
            </div>
        `;

        root.appendChild(currentToast);

        setTimeout(() => currentToast.classList.add('show'), 30);

        expandTimeout = setTimeout(() => {
            currentToast.classList.add('expand');
        }, 350);
    }

    removeTimeout = setTimeout(() => {
        currentToast.classList.remove('show');
        setTimeout(() => {
            currentToast.remove();
            currentToast = null;
        }, 300);
    }, 4500);
}

function test(type) {
    const data = {
        success: {
            title: 'Thành Công',
            message: 'Đã thêm sản phẩm vào giỏ hàng!'
        },
        error: {
            title: 'Thất Bại',
            message: 'Không thể thao tác. Hãy thử lại sau!'
        },
        warning: {
            title: 'Cảnh Báo',
            message: 'Hành động này không thể hoàn tác. Bạn có chắc muốn tiếp tục?'
        }
    };

    showToast({ type, ...data[type] });
}