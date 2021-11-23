let url = window.location.href;
let id = url.substring(url.lastIndexOf('?') + 1);

document.getElementById("orderId").innerHTML = id;

localStorage.clear();