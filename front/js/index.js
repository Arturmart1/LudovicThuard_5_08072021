const $productContainer = document.querySelector('items');

const ITEMS_PER_PAGE = 8;

// Get the products from the server

const getProducts = async () => {
  const response = await fetch('/api/product.json');
  const products = await response.json();
  return products;
};

// Render the products

const renderProducts = async () => {
  const products = await getProducts();
    const productsToRender = products.slice(0, ITEMS_PER_PAGE);
    const html = productsToRender.map(product => {
      return `
        <a href="./product.html?${product.id}">
            <article>
                <img src="${product.imageUrl}" alt="${product.name}">
                <h3 class="productName">${product.name}</h3>
                <p class="productDescription">${product.description}</p>
            </article>
        </a>
      `;
    }).join('');
    $productContainer.innerHTML = html;
};