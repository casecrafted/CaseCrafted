// cart.js

// Retrieve cart from local storage or initialize it as an empty array
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to add product to cart
function addToCart(productName) {
    if (!cart.includes(productName)) {
        cart.push(productName);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${productName} has been added to your cart!`);
    } else {
        alert(`${productName} is already in your cart.`);
    }
}

// Function to get the cart count
function getCartCount() {
    return cart.length;
}

// Function to display cart items
function displayCart() {
    if (cart.length === 0) {
        alert("Your cart is empty.");
    } else {
        alert("Items in your cart: " + cart.join(", "));
    }
}

// Function to update cart count display
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    cartCountElement.textContent = getCartCount();
}

// Event listener for adding products to cart
document.addEventListener("DOMContentLoaded", function() {
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        const button = document.createElement('button');
        button.textContent = 'Add to Cart';
        button.className = 'btn';
        
        const productName = card.querySelector('h3').textContent;

        button.addEventListener('click', function() {
            addToCart(productName);
            updateCartCount();
        });

        card.appendChild(button);
    });

    // Update the cart count on page load
    updateCartCount();
});
