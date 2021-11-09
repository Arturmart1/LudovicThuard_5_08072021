//Récuperation des articles
async function getProducts() {
    let productsData = await fetch ("http://localhost:3000/api/products")

    return productsData.json();
}

function productsCards(){
    let productsList = getProducts()
    .then(function (resApi){
        const products = resApi;
        for (let product in products){

            //Création de l'élément <a>
            let productLink = document.createElement("a");
            document.querySelector(".items").appendChild(productLink);
            productLink.setAttribute("href", `product.html?id=${resApi[product]._id}` );

            //Création de l'élément <article>
            let productCard = document.createElement("article");
            productLink.appendChild(productCard);

            //Insertion de l'image
            let productImage = document.createElement("img");
            productImage.setAttribute("src", resApi[product].imageUrl);
            productImage.setAttribute("alt", resApi[product].altTxt);
            productCard.appendChild(productImage);

            //Insertion du titre
            let productTitle = document.createElement("h3");
            productTitle.classList.add("productName");
            productTitle.innerHTML = resApi[product].name;
            productCard.appendChild(productTitle);

            //Insertion de la description
            let productDescription = document.createElement("p");
            productDescription.classList.add("productDescription");
            productDescription.innerHTML = resApi[product].description;
            productCard.appendChild(productDescription);
        }
    })
}
productsCards();