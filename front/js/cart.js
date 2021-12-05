// Import localstorage
let cart = JSON.parse(window.localStorage.getItem("cart")) ?? [];

// Récupération des informations et affichage sur la page panier

function displayCart() {
    if (cart.length === 0) {
        let emptyCart = document.getElementById('cart__items');
        emptyCart.innerHTML = "Votre panier est vide";
    }else{
        for (product of cart) {
            let cartContainer = document.getElementById('cart__items');
            cartContainer.innerHTML += `
            <article class="cart__item" data-id="${product.id}" data-color="${product.color}">
                <div class="cart__item__img">
                    <img src="${product.image}" alt="${product.altTxt}">
                </div>
                <div class="cart__item__content">
                    <div class="cart__item__content__description">
                        <h2>${product.name}</h2>
                        <p>${product.color}</p>
                        <p>${product.price} €</p>
                    </div>
                    <div class="cart__item__content__settings">
                        <div class="cart__item__content__settings__quantity">
                            <p>Qté : </p>
                            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
                        </div>
                        <div class="cart__item__content__settings__delete">
                            <p class="deleteItem">Supprimer</p>
                        </div>
                    </div>
                </div>
            </article>
            `;
        }
    }
}
displayCart();

// Modification de la quantité d'un produit avec écoute de l'input

function updateQuantity(event){
    let article = event.target.closest('article');
    let index = cart.findIndex(product => product.id === article.dataset.id && product.color === article.dataset.color);
    cart[index].quantity = parseInt(event.target.value);
    window.localStorage.setItem("cart", JSON.stringify(cart));
    getTotals();    
}
// Application de la modification de la quantité

function modifyQuantity(){
    let cartItems = document.getElementById('cart__items');
    cartItems.onchange = updateQuantity;
}
modifyQuantity();

// Suppression d'un produit du panier

function removeItem(event){
    let article = event.target.closest('article');
    cart = cart.filter(product => product.id !== article.dataset.id || product.color !== article.dataset.color);
    window.localStorage.setItem("cart", JSON.stringify(cart));
    article.remove();
    getTotals();
}
// Application de la suppression du produit

function deleteItem(){
    let cartItems = document.getElementsByClassName('deleteItem');
    for (let item of cartItems){
        item.onclick = removeItem;
    } 
}
deleteItem();

// Calcul des totaux

function getTotals() {
    let totalQuantity = 0;
    let totalPrice = 0;
    for (let i = 0; i < cart.length; i++) {
        totalQuantity += parseInt(cart[i].quantity);
        totalPrice += parseInt(cart[i].quantity) * parseInt(cart[i].price);
    }
    document.getElementById('totalPrice').textContent = totalPrice;
    document.getElementById('totalQuantity').textContent = totalQuantity;
}
getTotals();

// Verification du formulaire

function form() {

    //RegExp

    const varCharRegExp = /^[a-zA-Zéèêëàâäîïôöûüùç\- ]{2,}$/;
    const addressRegExp = /^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+/;
    const emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    // Selection des imputs

    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const address = document.getElementById('address');
    const city = document.getElementById('city');
    const email = document.getElementById('email');

    // Vérification des imputs, désactivation du bouton si erreur et affichage d'un message d'erreur

    firstName.addEventListener("change", () => {
        if (varCharRegExp.test(firstName.value)) {
            document.getElementById('order').disabled = false;
            document.getElementById('firstNameErrorMsg').textContent = "";
        } else {
            document.getElementById('firstNameErrorMsg').textContent = "Veuillez vérifier votre prénom";
            document.getElementById('order').disabled = true;
        }
    });
    lastName.addEventListener("change", () => {
        if (varCharRegExp.test(lastName.value)) {
            document.getElementById('order').disabled = false;
            document.getElementById('lastNameErrorMsg').textContent = "";
        } else {
            document.getElementById('lastNameErrorMsg').textContent = "Veuillez vérifier votre nom";
            document.getElementById('order').disabled = true;
        }
    });
    address.addEventListener("change", () => {
        if (addressRegExp.test(address.value)) {
            document.getElementById('order').disabled = false;
            document.getElementById('addressErrorMsg').textContent = "";
        } else {
            document.getElementById('addressErrorMsg').textContent = "Veuillez vérifier votre adresse";
            document.getElementById('order').disabled = true;
        }
    });
    city.addEventListener("change", () => {
        if (varCharRegExp.test(city.value)) {
            document.getElementById('order').disabled = false;
            document.getElementById('cityErrorMsg').textContent = "";
        } else {
            document.getElementById('cityErrorMsg').textContent = "Veuillez vérifier votre ville";
            document.getElementById('order').disabled = true;
        }
    });
    email.addEventListener("change", () => {
        if (emailRegExp.test(email.value)) {
            document.getElementById('order').disabled = false;
            document.getElementById('emailErrorMsg').textContent = "";
        } else {
            document.getElementById('emailErrorMsg').textContent = "Veuillez vérifier votre adresse email";
            document.getElementById('order').disabled = true;
        }
    });
}
form();

// Envoi de la commande

function postOrder(){
    let form = document.querySelector('.cart__order__form');
    form.addEventListener('submit', (event) => {
        if (document.getElementById('order').disabled === false) { // Si le formulaire est valide, on continue
            event.preventDefault();

                let inputFirstName = document.getElementById('firstName');
                let inputLastName = document.getElementById('lastName');
                let inputAdress = document.getElementById('address');
                let inputCity = document.getElementById('city');
                let inputMail = document.getElementById('email');
            
                // Récuperation des données du formulaire et du contenu du panier
                
                let productsId = [];
                cart.forEach(product => {
                    productsId.push(product.id)
                });
            
                const order = {
                    contact : {
                        firstName: inputFirstName.value,
                        lastName: inputLastName.value,
                        address: inputAdress.value,
                        city: inputCity.value,
                        email: inputMail.value,
                    },
                    products: productsId,
                }
            
                //Envoi de la commande au serveur via methode POST

                const options = {
                    method: 'POST',
                    body: JSON.stringify(order),
                    headers: {
                        'Accept': 'application/json', 
                        "Content-Type": "application/json" 
                    },
                };
            
                fetch("http://localhost:3000/api/products/order", options)
                .then((response) => response.json())
                .then((data) => {
                    document.location.href = `confirmation.html?orderId=${data.orderId}`;
                })
                .catch((err) => {
                    alert ("Erreur : " + err.message);
                });
        }else{
            document.getElementById('order').disabled === true
        }
    })
}
postOrder();