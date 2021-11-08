//Récuperation des produits
async function getProducts() {
    let products = await fetch("http://localhost:3000/api/products")
    return await products.json();
}

//Remplissage du DOM
async function productsList(){
    let catalogue = await getProducts()
    .then(function(APIresult){
        const products = APIresult;
        for (let product in products){

            //Création de l'élément <a>
            let productLink = document.createElement("a");
            document.querySelector(".items").appendChild(productLink);
            productLink.setAttribute("href", "product.html?id=${APIresult[article]._id}");

            //Création de l'élément <article>
            let productCard = document.createElement("article");
            productCard.appendChild(productLink);

            //Insertion de l'image
            let productImage = document.createElement("img");
            productCard.appendChild(productImage);
            productImage.setAttribute("src", APIresult[product].imageUrl);
            productImage.setAttribute("alt", products[product].altTxt);

            //Insertion du titre
            let productTitle = document.createElement("h3");
            productCard.appendChild(productTitle);
            productTitle.classList.add("productName");
            productTitle.innerHTML = "${APIresult[.name]";

            //Insertion de la description
            let productDescription = document.createElement("p");
            productCard.appendChild(productDescription);
            productDescription.classList.add("productDescription");
            productDescription.innerHTML = "${APIresult[.description]";
        }
    })
}
productsList();