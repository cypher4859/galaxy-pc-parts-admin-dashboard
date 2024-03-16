// public/main.js
document.addEventListener('DOMContentLoaded', function () {
  // Sample data (Replace with data from your database)
  const products = [
    { name: 'CPU', price: '$199.99' },
    { name: 'GPU', price: '$499.99' },
    { name: 'RAM', price: '$79.99' },
    // Add more products as needed
  ];

  // Template function to render products
  function renderProducts() {
    const appContainer = document.getElementById('app');

    // Clear existing content
    appContainer.innerHTML = '';

    // Create and append elements for each product
    products.forEach((product) => {
      const productElement = document.createElement('div');
      productElement.innerHTML = `
        <h2>${product.name}</h2>
        <p>${product.price}</p>
        <hr>
      `;
      appContainer.appendChild(productElement);
    });
  }

  // Initial rendering
  renderProducts();
});
