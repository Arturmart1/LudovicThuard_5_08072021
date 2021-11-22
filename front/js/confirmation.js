function displayOrderId(){
    let orderDisplay = document.getElementById("orderId");
    let orderId = localStorage.getItem("orderId");

    orderDisplay.innerHTML = orderId;
    
    /*localStorage.clear();*/
}
displayOrderId();