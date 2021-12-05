//Récuperation des articles
async function getProducts() {
    let productsData = await fetch ("http://localhost:3000/api/products")
    return productsData.json();
}
// Récupération des informations des produits auprès de l'API et affichage sur la page

async function displayProducts() {
    let products = await getProducts();
    let productsContainer = document.getElementById("items");
    products.forEach(product => {
        let productLink = document.createElement("a");
        productLink.setAttribute("href", "product.html?id=" + product._id);
        productLink.innerHTML = `
        <article>
            <img src="${product.imageUrl}" alt="${product.altTxt}">
            <h3 class="productName">${product.name}</h3>
            <p class="productDescription">${product.description}</p>
        </article>
        `;
        productsContainer.appendChild(productLink);
    });
}
displayProducts();