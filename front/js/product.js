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
    .catch(function(err){
        console.log(err, "Erreur lors de la requête API");
    })
}

function fillProductData(){
    let productData = getProductData()
    .then(function (resApi){
        const product = resApi;
        for (let product in products){

            //Image
            document.createElement("img")
            document.querySelector(".item__img");
            productLink.setAttribute("src", `${resApi[product].imageUrl}`);

            //Insertion du nom
            document.getElementById("title").textContent = resApi[product].name;

            //Insertion du prix
            document.getElementById("price").textContent = resApi[product].price + "€";

            //Insertion de la description
            document.getElementById("description").textContent = resApi[product].description;
        }
    })
    .catch(function(err) {
        console.log(err);
    }
    );
}
fillProductData();

//Gestion des coloris

function colorPicker(){
    for (let colors of product.colors){
        console.table(colors);
        let productColors = document.createElement("option");
        document.getElementById("colors").appendChild(productColors);
        productColors.value = colors;
        productColors.innerHTML = colors;
    }
}
colorPicker();