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
                    ${product.image}
                </div>
                <div class="cart__item__content">
                    <div class="cart__item__content__titlePrice">
                        <h2>${product.name}</h2>
                        <p>${product.price} €</p>
                    </div>
                    <div class="cart__item__content__settings">
                        <div class="cart__item__content__settings__quantity">
                            <p>Qté : ${product.quantity}</p>
                            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
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

//Calcul des totaux

function getTotals() {
    let totalPrice = 0;
    let totalQuantity = 0;
    for (let i = 0; i < cart.length; i++) {
        totalPrice += cart[i].price * cart[i].quantity;
        totalQuantity = cart[i].quantity +++ totalQuantity;
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

    let nameRegExp = /^[a-zA-Zéèêëàâäîïôöûüùç\- ]{2,}$/;
    let addressRegExp = /^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+/;
    let cityRegExp = /^[a-zA-Zéèêëàâäîïôöûüùç\- ]{2,}$/;
    let emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;


    //Vérification de la validité des champs

    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const address = document.getElementById('address');
    const city = document.getElementById('city');
    const email = document.getElementById('email');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        if (!nameRegExp.test(firstName.value)) {
            firstName.classList.add('error');
            firstName.nextElementSibling.innerHTML = "Veuillez entrer un nom valide";
        } else {
            firstName.classList.remove('error');
        }

        if (!nameRegExp.test(lastName.value)) {
            lastName.classList.add('error');
            lastName.nextElementSibling.innerHTML = "Veuillez entrer un prénom valide";
        } else {
            lastName.classList.remove('error');
        }

        if (!addressRegExp.test(address.value)) {
            address.classList.add('error');
            address.nextElementSibling.innerHTML = "Veuillez entrer une adresse valide";
        } else {
            address.classList.remove('error');
        }

        if (!cityRegExp.test(city.value)) {
            city.classList.add('error');
            city.nextElementSibling.innerHTML = "Veuillez entrer une ville valide";
        } else {
            city.classList.remove('error');
        }

        if (!emailRegExp.test(email.value)) {
            email.classList.add('error');
            email.nextElementSibling.innerHTML = "Veuillez entrer un email valide";
        } else {
            email.classList.remove('error');
        }
    })
}
form();

//Envoi des informations client au localstorage

function postForm(){
    const orderButton = document.getElementById("order");
    let orderId = Math.floor(Math.random() * 1000000);

    orderButton.addEventListener("click", (event)=>{
    
        //Récupération des coordonnées du client

        let inputFirstName = document.getElementById('firstName');
        let inputLastName = document.getElementById('lastName');
        let inputAdress = document.getElementById('address');
        let inputCity = document.getElementById('city');
        let inputMail = document.getElementById('email');

        //Construction d'un array depuis le local storage
        let idProducts = [];
        for (let i = 0; i<cart.length;i++) {
            idProducts.push(cart[i].idProduit);
        }
        console.log(idProducts);

        const order = {
            client : {
                id: orderId,
                firstName: inputFirstName.value,
                lastName: inputLastName.value,
                address: inputAdress.value,
                city: inputCity.value,
                email: inputMail.value,
            },
            products: idProducts,
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
            localStorage.removeItem("cart");
            localStorage.setItem("orderId", data.orderId);

            document.location.href = `confirmation.html?${orderId}`;
        })
        .catch((err) => {
            alert ("Erreur : " + err.message);
        });
    })
}
postForm();