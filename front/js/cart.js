//get cart data from local storage
function getCartData() {
    var cartData = localStorage.getItem('cart');
    if (cartData != null) {
        cartData = JSON.parse(cartData);
        return cartData;
    } else {
        return [];
    }
}
//display cart data
function displayCartData() {
    let cartData = getCartData();
    let cartBody = document.getElementById('cartBody');
    let cartTotal = 0;
    cartBody.innerHTML = '';
    cartData.forEach(function (item) {
        cartBody.innerHTML += `
        <article class="cart__item" data-id="{product-ID}">
            <div class="cart__item__img">
                <img src="${item.imageUrl}" alt="${altTxt}">
            </div>
            <div class="cart__item__content">
                <div class="cart__item__content__titlePrice">
                    <h2>${item.title}</h2>
                    <p>${item.price}</p>
                </div>
                <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                        <p>Qté : ${item.qty} </p>
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
                    </div>
                    <div class="cart__item__content__settings__delete">
                    <button class="btn btn-danger" onclick="removeItem(${item.id})">Supprimer</button>
                    </div>
                </div>
            </div>
        </article>
        `;
        cartTotal += item.price * item.qty;
    });
    cartBody.innerHTML += `
        <tr>
            <td colspan="3" align="right">Total</td>
            <td>${cartTotal}</td>
        </tr>
    `;
}