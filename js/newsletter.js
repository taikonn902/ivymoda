// Newsletter Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('newsletter-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = form.querySelector('input[name="email"]').value;
            const fullname = form.querySelector('input[name="fullname"]').value;
            const successMsg = document.getElementById('newsletter-success');
            
            // Validate email
            if (!isValidEmail(email)) {
                showToast('Vui lòng nhập email hợp lệ', 'error');
                return;
            }
            
            // Simulate form submission (replace with actual API call)
            const formData = {
                email: email,
                fullname: fullname || 'Guest'
            };
            
            // Here you would send data to your backend
            console.log('Newsletter signup:', formData);
            
            // Show success message
            form.style.display = 'none';
            successMsg.classList.remove('hidden');
            
            // Reset and show form again after 3 seconds
            setTimeout(() => {
                form.reset();
                form.style.display = 'flex';
                successMsg.classList.add('hidden');
            }, 3000);
        });
    }
});

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Toast notification function (using existing toast system if available)
function showToast(message, type = 'info') {
    const root = document.getElementById('toast-root');
    if (root) {
        const toast = document.createElement('div');
        toast.className = `toast-item toast-${type}`;
        toast.innerHTML = `
            <div style="background: ${type === 'error' ? '#ff6b6b' : '#4CAF50'}; 
                        color: white; 
                        padding: 12px 20px; 
                        border-radius: 6px; 
                        font-size: 14px;">
                ${message}
            </div>
        `;
        root.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }
}
