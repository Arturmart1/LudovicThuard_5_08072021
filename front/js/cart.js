// Import localstorage
let cart = JSON.parse(window.localStorage.getItem("cart")) ?? [];
let emptyCart = document.getElementById('cart__items');

// Display cart or empty cart
function displayCart() {
    if (cart.length === 0) {
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