// get product id by url
function getProductId() {
    let url = window.location.href;
    let id = url.substring(url.lastIndexOf('?') + 1);
    return id;
}
//get product image by id and display it on the page
function getProductImage() {
    let id = getProductId();
    let product = getProductById(id);
    let image = document.querySelector('.item__img');
    image.src = product.imageUrl;
}

//get product price by id and display it on the page
function getProductPrice() {
    let id = getProductId();
    let product = getProductById(id);
    let price = document.getElementById('price');
    price.innerHTML = product.price;
}

//get product name by id and display it on the page
function getProductName() {
    let id = getProductId();
    let product = getProductById(id);
    let name = document.getElementById('title');
    name.innerHTML = product.name;
}

//get product description by id and display it on the page
function getProductDescription() {
    let id = getProductId();
    let product = getProductById(id);
    let description = document.getElementById('description');
    description.innerHTML = product.description;
}

//get product price by id and display it on the page
function getProductPrice() {
    let id = getProductId();
    let product = getProductById(id);
    let price = document.getElementById('price');
    price.innerHTML = product.price + "€";
}

// colorpicker
function getProductColor() {
    let id = getProductId();
    let product = getProductById(id);
    let colors = document.getElementById('colors');
    colors.innerHTML = product.colors;
}

//display all fucntions
function displayProduct() {
    getProductImage();
    getProductName();
    getProductDescription();
    getProductPrice();
    getProductColor();
}