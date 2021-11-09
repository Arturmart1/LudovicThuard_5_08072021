//Récuperation des articles
function getProducts() {
    let products = fetch ("http://localhost:3000/api/products")

    return products;
}

function productsCardList(){
    let productsList = getProducts()
    .then(function(response){
        const products = response;
        for (let product in products){
            let productCardLink = document.createElement("a");
            document.querySelector(".items").appendChild(productCardLink);
            productCardLink.setAttribute("href", "#");

            let productContainer = document.createElement("article");
            productContainer.appendChild(productCardLink);

            let productImg = document.createElement("img");
            productCardLink.appendChild(productImg);
            productImg.setAttribute("src", "${products[product].imageUrl}");
            productImg.setAttribute("alt", "product.altTxt");

            let productName = document.createElement("h3");
            productCardLink.appendChild(productName);
            productName.classList.add("productName");
            productName.innerHTML = "${products[product].name}";

            let productDescription = document.createElement("p");
            productCardLink.appendChild(productDescription);
            productDescription.classList.add("productDescription");
            productDescription.innerHTML = "${products[product].description}";
        }
    })
}

productsCardList();