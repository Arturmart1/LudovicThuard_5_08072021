//Import des données du panier
function getCartData() {
    let cartData = localStorage.getItem("cart");
    if (cartData) {
        cartData = JSON.parse(cartData);
        return cartData;
    }
    return [];
}

//Affichage du panier

function displayCartData() {
    let cartData = getCartData();
    let cartBody = document.getElementById('cart__items');
    let cartTotal = 0;
    cartBody.innerHTML = '';
    cartData.forEach(function (item) {
        cartBody.innerHTML += `
        <article class="cart__item" data-id="{product-ID}">
            <div class="cart__item__img">
                <img src="${item.imageUrl}" alt="${item.altTxt}">
            </div>
            <div class="cart__item__content">
                <div class="cart__item__content__titlePrice">
                    <h2>${item.title}</h2>
                    <p>${item.price}</p>
                </div>
                <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                        <p>Qté : ${item.quantity}</p>
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
                    </div>
                    <div class="cart__item__content__settings__delete">
                        <p class="deleteItem">Supprimer</p>
                    </div>
                </div>
            </div>
        </article>
        `;
        cartTotal += item.price * item.qty;
    });
    let totalCart = document.getElementById("totalPrice")
    totalCart.innerHTML = cartTotal;

    //Suppression d'un article du panier

    let deleteItem = document.getElementsByClassName("deleteItem");
    for (let i = 0; i < deleteItem.length; i++) {
        deleteItem[i].addEventListener("click", function () {
            let id = deleteItem[i].parentNode.parentNode.parentNode.dataset.id;
            deleteItemFromCart(id);
        });
    }
}
displayCartData();