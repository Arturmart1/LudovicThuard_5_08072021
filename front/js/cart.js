// Import localstorage
let cart = JSON.parse(window.localStorage.getItem("cart")) ?? [];
let emptyCart = document.getElementById('cart__items');

// Affichage du panier

function displayCart() {
    if (cart.length === 0){
        let emptyCart = document.getElementById('cart__items');
        emptyCart.innerHTML = "Panier vide";
    } else {
        for (let i = 0; i < cart.length; i++) {
            let product = cart[i];
            let productItem = document.createElement('section');
            productItem.classList.add('cart__items');
            productItem.innerHTML = `
            <article class="cart__item" data-id="${product.productId}">
                <div class="cart__item__img">
                    <img src="${product.image}" alt="${product.altTxt}">
                </div>
                <div class="cart__item__content">
                    <div class="cart__item__content__titlePrice">
                        <h2>${product.name} ${product.color}</h2>
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
        emptyCart.appendChild(productItem);
        }
    }
}
displayCart();

// Modification de la quantité

function quantityModify () {
    let itemQuantity = document.getElementsByClassName('itemQuantity');

    for (let i = 0; i < itemQuantity.length; i++) {
        itemQuantity[i].addEventListener("change", (event) => {
            event.preventDefault();

            let qtModif = cart[i].quantity;
            let valueModification = itemQuantity[i].valueAsNumber;

            const result = cart.find((e) => e.valueModification !== qtModif);

            result.quantity = valueModification;
            cart[i].quantity = result.quantity;

            localStorage.setItem("cart", JSON.stringify(cart));

            location.reload();
        })
    }
}
quantityModify();

// Suppression d'un article du panier

function deleteItem (){
    let deleteItem = document.getElementsByClassName('deleteItem');
    for (let i = 0; i < deleteItem.length; i++) {
       deleteItem[i].addEventListener('click', (event) => {
           event.preventDefault();

           let deleteId = cart[i].productId;
           let deleteColor = cart[i].color;

           cart = cart.filter( e => e.productId !== deleteId || e.color !== deleteColor);

           localStorage.setItem("cart", JSON.stringify(cart));

           alert("Tu m'vois? tu m'vois plus.");
           location.reload();
        })
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
    document.getElementById('totalPrice').innerHTML = totalPrice;
    document.getElementById('totalQuantity').innerHTML = totalQuantity;
}
getTotals();

// Formulaire

// Verification du formulaire
function form() {
    let form = document.querySelector('.cart__order__form');

    //RegExp

    const varCharRegExp = /^[a-zA-Zéèêëàâäîïôöûüùç\- ]{2,}$/;
    const addressRegExp = /^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+/;
    const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const address = document.getElementById('address');
    const city = document.getElementById('city');
    const email = document.getElementById('email');
/*form.addEventListener("change", (event) => {
    event.preventDefault();

    if (firstName.value.match(varCharRegExp) && lastName.value.match(varCharRegExp) && address.value.match(addressRegExp) && city.value.match(varCharRegExp) && email.value.match(emailRegExp)) {
        document.getElementById('order').disabled = true;
    } else if(!firstName.value.match(varCharRegExp) || !lastName.value.match(varCharRegExp) || !address.value.match(addressRegExp) || !city.value.match(varCharRegExp) || !email.value.match(emailRegExp)) {
        document.getElementById('order').disabled = true;
        document.getElementById('firstNameErrorMsg').innerHTML = "Veuillez entrer un prénom valide";
        document.getElementById('lastNameErrorMsg').innerHTML = "Veuillez entrer un nom valide";
        document.getElementById('addressErrorMsg').innerHTML = "Veuillez entrer une adresse valide";
        document.getElementById('cityErrorMsg').innerHTML = "Veuillez entrer une ville valide";
        document.getElementById('emailErrorMsg').innerHTML = "Veuillez entrer un email valide";
    } else (firstName.value.match(varCharRegExp) && lastName.value.match(varCharRegExp) && address.value.match(addressRegExp) && city.value.match(varCharRegExp) && email.value.match(emailRegExp)); {
        document.getElementById('order').disabled = false;
    }
}) */
    form.addEventListener('change', (event) => {
        event.preventDefault();

        if (varCharRegExp.test(firstName.value) === false) {
            firstName.style.border = "1px solid red";
            firstName.focus();
        } else if (varCharRegExp.test(lastName.value) === false) {
            lastName.style.border = "1px solid red";
            lastName.focus();
        } else if (addressRegExp.test(address.value) === false) {
            address.style.border = "1px solid red";
            address.focus();
        } else if (varCharRegExp.test(city.value) === false) {
            city.style.border = "1px solid red";
            city.focus();
        } else if (emailRegExp.test(email.value) === false) {
            email.style.border = "1px solid red";
            email.focus();
        } else {
            alert("Merci pour ta commande");
            window.location.href = "index.html";
        }
    })
}
form();

function postOrder(){
    let form = document.querySelector('.cart__order__form');
    form.addEventListener('submit', (event) => {
        if (document.getElementById('order').disabled === false) {
            event.preventDefault();

                let inputFirstName = document.getElementById('firstName');
                let inputLastName = document.getElementById('lastName');
                let inputAdress = document.getElementById('address');
                let inputCity = document.getElementById('city');
                let inputMail = document.getElementById('email');
            
                //Construction d'un array depuis le local storage
            
                //Récupération des produits du panier
                
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
                    console.log(data);
                    document.location.href = `confirmation.html?orderId=${data.orderId}`;
                })
                .catch((err) => {
                    alert ("Erreur : " + err.message);
                });
        }else(document.getElementById('order').disabled === true);{
            event.preventDefault();
            return false;
        }
    })
}
postOrder();