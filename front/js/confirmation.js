// Affichage orderId et suppression du panier
function confirmOrder(){
    let orderId = window.location.search.split('=')[1];
    document.getElementById('orderId').innerHTML = orderId;
    localStorage.removeItem('cart');
}
confirmOrder();