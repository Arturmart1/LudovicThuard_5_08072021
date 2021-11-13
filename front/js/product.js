// Récupération de l'ID par l'URL
function getProductId() {
    let url = new URLSearchParams(document.location.search.substring(1)); //trouvé sur le MDN
    let productId = url.get('id');

    return productId;
}
console.log(getProductId());

//Récuperation des infos produit
function getProducts() {
    fetch("http://localhost:3000/api/products/" + productId)
    .then((response) => {
        return response.json();
    })
    .catch(function (_error) {
            console.log("Erreur lors de la requête API");
        })
}

//display product informations with product id

function displayProductInfo() {
    getProductId().then(function (response) {
        console.log(response);
        
        let productName = document.getElementById("title");

        let productPrice = document.getElementById("price");
        
        let productDescription = document.getElementById("description");
        
        let productImage = document.querySelector(".item__img");
        document.createElement("img").setAttribute("src", data.imageUrl);

        let productColors = document.getElementById("colors");

        productName.innerHTML = data.name;
        productPrice.innerHTML = data.price;
        productDescription.innerHTML = data.description;
        productImage.src = data.imageUrl;
        productColors.innerHTML = data.colors;
    })
}
displayProductInfo();