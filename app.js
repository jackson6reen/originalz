document.addEventListener('DOMContentLoaded', () => {
    // Basic interaction script for the skeleton
    
    // Mobile menu toggle (if added later)
    console.log("Template Loaded Successfully");

    // Add to cart animation
    const addToCartBtns = document.querySelectorAll('.add-to-cart');
    const cartCount = document.querySelector('.cart-count');

    if(addToCartBtns && cartCount) {
        let count = 0;
        addToCartBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                count++;
                cartCount.textContent = count;
                cartCount.style.transform = 'scale(1.2)';
                
                const originalText = btn.textContent;
                btn.textContent = 'נוסף בהצלחה ✓';
                btn.style.background = '#28a745';
                
                setTimeout(() => {
                    cartCount.style.transform = 'scale(1)';
                    btn.textContent = originalText;
                    btn.style.background = ''; // reset to css
                }, 1500);
            });
        });
    }
});
