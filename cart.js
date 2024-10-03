// cart.js

// Retrieve cart from local storage or initialize it as an empty array
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to add product to cart with quantity
function addToCart(productName, quantity) {
    const existingProduct = cart.find(item => item.name === productName);

    if (existingProduct) {
        existingProduct.quantity += parseInt(quantity);
    } else {
        cart.push({ name: productName, quantity: parseInt(quantity) });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showCartMessage(`${productName} has been added to your cart!`, 'success');
}

// Function to get the cart count
function getCartCount() {
    return cart.length;
}

// Function to calculate total price
function calculateTotal() {
    return cart.reduce((total, item) => total + (29.99 * item.quantity), 0).toFixed(2);
}

// Function to display cart contents including total price
function displayCart() {
    const cartContainer = document.createElement('div');
    cartContainer.className = 'cart-container';

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    } else {
        cartContainer.innerHTML = '<h3>Your Cart</h3>';
        cart.forEach(item => {
            const productElement = document.createElement('div');
            productElement.className = 'cart-product';
            productElement.textContent = `${item.name} (x${item.quantity}) - $${(29.99 * item.quantity).toFixed(2)}`;

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.className = 'remove-btn';
            removeButton.onclick = () => removeFromCart(item.name);

            productElement.appendChild(removeButton);
            cartContainer.appendChild(productElement);
        });

        // Display total price
        const totalPriceElement = document.createElement('div');
        totalPriceElement.className = 'total-price';
        totalPriceElement.innerHTML = `<strong>Total: $${calculateTotal()}</strong>`;
        cartContainer.appendChild(totalPriceElement);
    }

    // Append the cart container to the body or a specific section
    document.body.appendChild(cartContainer);
}

// Function to remove product from cart
function removeFromCart(productName) {
    cart = cart.filter(item => item.name !== productName);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    displayCart();
}

// Function to update cart count display
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    cartCountElement.textContent = getCartCount();
}

// Function to show cart message (toast notification)
function showCartMessage(message, type) {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;

    // Styling for the toast message
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.right = '20px';
    toast.style.backgroundColor = type === 'success' ? '#f15a29' : '#dc3545'; // Orange for success, red for error
    toast.style.color = '#fff';
    toast.style.padding = '10px 20px';
    toast.style.borderRadius = '5px';
    toast.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)';
    toast.style.transition = 'opacity 0.5s';

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => {
            toast.remove();
        }, 500);
    }, 3000);
}

// Event listener for adding products to cart
document.addEventListener("DOMContentLoaded", function() {
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        const productName = card.querySelector('h3').textContent;

        // Create a quantity input field
        const quantityInput = document.createElement('input');
        quantityInput.type = 'number';
        quantityInput.className = 'quantity-input';
        quantityInput.value = '1'; // Default quantity
        quantityInput.min = '1'; // Minimum quantity
        card.appendChild(quantityInput);

        // Add event listener to the button
        const button = card.querySelector('.btn');
        button.addEventListener('click', function() {
            const quantity = quantityInput.value;
            addToCart(productName, quantity);
        });
    });

    // Update the cart count on page load
    updateCartCount();
});
