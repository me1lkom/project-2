const addToCartButtons = document.querySelectorAll('.product-item__button');

addToCartButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        
        const productItem = this.closest('.product-item');
        
        productItem.classList.toggle('product-item--selected');
        
        if (productItem.classList.contains('product-item--selected')) {
            this.textContent = '✓ В корзине';
        } else {
            this.textContent = 'В корзину';
        }
    });
});