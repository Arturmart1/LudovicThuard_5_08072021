const $itemsWrapper = document.querySelector('.items');

const ITEMS_PER_PAGE = 8;

const retrieveProductsData =() => fetch('/api/products.json')
    .then(response => response.json())
    .then(data => data.products)
    .catch(error => console.log(error));

const renderProducts = (products) => {
    const $items = products.map(product => {
        const $item = document.createElement('a');
        $item.href = `./product?${product.id}`;
        $item.innerHTML = `
            <article>
                <img src=".../${product.image}" alt="${product.name}">
                <h3 class="productName">${product.name}</h3>
                <p class="productDescription">${product.description}</p>
            </article>
        `;
        return $item;
    });
    $itemsWrapper.append($items);
};