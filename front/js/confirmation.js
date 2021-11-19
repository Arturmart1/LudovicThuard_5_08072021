//Récupération de l'id de la commande et affichage

let url = window.location.href;
let id = url.substring(url.lastIndexOf('?') + 1);

document.getElementById("orderId").innerHTML = id;