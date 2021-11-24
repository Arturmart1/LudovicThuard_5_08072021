// Récupération de l'ID par l'URL
function getProductId() {
    return new URL(window.location.href).searchParams.get('id')
}
console.log(getProductId());

let productId = getProductId();

//Récuperation des infos produit
function getProductData() {
    fetch("http://localhost:3000/api/products/" + productId)
    .then((res) => {
        return res.json();
    })
    .then(async function (resAPI) {
        productInfo = await resAPI;
        if (productInfo){
            postProduct(productInfo);
        }
    })
    .catch(function(err){
        console.log(err, "Erreur lors de la requête API");
    })
}
getProductData();

function postProduct(productInfo){

    //Insertion de l'image
    let productImage = document.createElement("img");
    document.querySelector(".item__img").appendChild(productImage);
    productImage.setAttribute("src", productInfo.imageUrl);
    productImage.setAttribute("alt", productInfo.altTxt);

    //Insertion du titre
    let productTitle = document.getElementById("title");
    productTitle.innerHTML = productInfo.name;

    //Insertion du prix
    let productPrice = document.getElementById("price");
    productPrice.innerHTML = productInfo.price;

    //Insertion de la description
    let productDescription = document.getElementById("description");
    productDescription.innerHTML = productInfo.description;

    //Choix de la couleur
    for (let i = 0; i < productInfo.colors.length; i++) {
        let color = document.createElement("option");
        document.getElementById("colors").appendChild(color);
        color.innerHTML += `<option value="${productInfo.colors[i]}">${productInfo.colors[i]}</option>`;
    }
}

//Section ajout au panier

//Initialisation du localStorage

let cart = JSON.parse(window.localStorage.getItem("cart")) ?? [];

//Ajout des produits et de ses infos au localStorage

let addToCart = document.getElementById("addToCart");
addToCart.addEventListener("click", function (productInfo) {
    let product = {
        id: productId,
        name: document.getElementById("title").innerHTML,
        price: document.getElementById("price").innerHTML,
        image: document.querySelector(".item__img img").getAttribute("src"),
        altTxt: document.querySelector(".item__img img").getAttribute("alt"),
        color: document.getElementById("colors").value,
        quantity: document.getElementById("quantity").value,
    }

    //Vérification de la complétion des champs couleur et quantité
    
    if (product.color === "" || product.quantity === "") {
        alert("Veuillez remplir tous les champs");
    } else { //Vérification de la présence dans le panier, modification si nécessaire
        let productExist = false;
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].color === product.color && cart[i].id === product.id) {
                cart[i].quantity = parseInt(cart[i].quantity) + parseInt(product.quantity);
                productExist = true;
            }
        }
        if (productExist === false) {
            cart.push(product);
        }
        window.localStorage.setItem("cart", JSON.stringify(cart));
        window.confirm("Kanap ajouté au panier !");
    }
});