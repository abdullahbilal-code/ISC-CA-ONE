// Sample product data
const products = [
  { id: 1, name: "Chocolate Fudge", description: "Rich, creamy fudge chocolate.", price: 2.50 },
  { id: 2, name: "Caramel Toffee", description: "Sweet, chewy caramel toffee.", price: 1.75 }
];

// Initialize an empty shopping cart
let cart = [];

// Render the list of products on the page
function renderProducts() {
  const productListDiv = document.getElementById('product-list');
  productListDiv.innerHTML = ''; // Clear previous products if any

  products.forEach(product => {
    const productDiv = document.createElement('div');
    productDiv.innerHTML = `
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <p>Price: €${product.price.toFixed(2)}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productListDiv.appendChild(productDiv);
  });
}

// Function to add a product to the cart
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  renderCart();
}

// Function to render the shopping cart details
function renderCart() {
  const cartItemsDiv = document.getElementById('cart-items');
  const cartTotalSpan = document.getElementById('cart-total');
  cartItemsDiv.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;
    const cartItemDiv = document.createElement('div');
    cartItemDiv.innerHTML = `
      <p>${item.name} - €${item.price.toFixed(2)}</p>
      <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${item.id}, this.value)">
      <button onclick="removeFromCart(${item.id})">Remove</button>
    `;
    cartItemsDiv.appendChild(cartItemDiv);
  });

  cartTotalSpan.innerText = total.toFixed(2);
}

// Function to update the quantity of a product in the cart
function updateQuantity(productId, newQuantity) {
  const item = cart.find(item => item.id === productId);
  if (item) {
    item.quantity = parseInt(newQuantity, 10);
    renderCart();
  }
}

// Function to remove a product from the cart
function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  renderCart();
}

// Event listener for the checkout button
document.getElementById('checkout-btn').addEventListener('click', () => {
  cart = [];
  renderCart();
  document.getElementById('confirmation').innerText = "Order successfully placed!";
});

// Initialize the app after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', renderProducts);
