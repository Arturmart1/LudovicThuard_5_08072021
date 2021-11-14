// Récupération de l'ID par l'URL
function getProductId() {
    return new URL(window.location.href).searchParams.get('id') //Trouvé sur MDN
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

    //Color picker
    for (let i = 0; i < productInfo.colors.length; i++) {
        let color = document.createElement("option");
        document.getElementById("colors").appendChild(color);
        color.innerHTML += `<option value="${productInfo.colors[i]}">${productInfo.colors[i]}</option>`;
    }
}

//Panier
let cart = [];
let addToCart = document.getElementById("addToCart");
addToCart.addEventListener("click", function (productInfo) {
    let product = {
        id: productId,
        name: productInfo.title,
        price: productInfo.price,
        Image: productInfo.imageUrl,
        color: document.getElementById("colors").value,
        quantity: document.getElementById("quantity").value,
    }
    cart.push(product);
    console.log(cart);
    window.confirm("Kanap ajouté au panier !");
});
if (localStorage.getItem("cart") === null) {
    localStorage.setItem("cart", JSON.stringify(cart));
}else{
    cart = JSON.parse(localStorage.getItem("cart"));
}
