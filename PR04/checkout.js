//FUNCIONES DEL CARRITO
//Guardamos instancia de SESSION STORAGE.
var storage = window.sessionStorage;
//Recogemos el valor de "carrito" de nuestra SESSION STORAGE.
var carrito = JSON.parse(storage.getItem('carrito'));
console.log('carrito', carrito);

var cestaTotal = 0;

//Si no existe creamos nuestro carrito como array vacío.
if (!carrito) {
    carrito = [];
}

if (carrito.length == 0){
    document.getElementById('total').innerText = "";
    document.getElementById('basket').innerText = "Your cart is empty!";
    document.getElementById('botonConfirmar').remove();
}

function fillBasket() {
    var basket = document.getElementById("basket");
    for (var j=0; j<carrito.length; j++) {
        var content = document.createElement("li");
        var description = document.createElement("div");
        var botonborrar = document.createElement("button");
        var total = document.createElement("div");
        
        var item = carrito[j];
        var itemTotal = item.precio*item.cantidad;
        cestaTotal = cestaTotal + itemTotal;
        
        content.setAttribute('id','producto'+item.id);
        description.setAttribute('id','description'+item.id);
        description.innerText = item.nombre+" ("+item.cantidad+") "+itemTotal.toFixed(2)+"$"

        botonborrar.setAttribute('item', item.id);
        botonborrar.addEventListener("click", quitando, false);
        botonborrar.innerText = "❌";

        content.appendChild(description);
        content.appendChild(botonborrar);

        basket.appendChild(content);
    }

    document.getElementById('total').innerText = (cestaTotal)? cestaTotal.toFixed(2) : '';
}

/** 
 * Acción al apretar "x" de un producto del carrito.
 * */
function quitando(event) {
    var idItem = parseInt(event.target.getAttribute('item'));
    console.log('quitando item', idItem);
    var position = -1;
    for (var i=0; i<carrito.length; i++) {
        if(carrito[i].id == idItem) {
            position = i;
        }
    }
    if (position > -1) {
        carrito[position].cantidad--;
        cestaTotal = cestaTotal - carrito[position].precio;
        if (carrito[position].cantidad == 0) {
            carrito.splice(position, 1);
            var producto = document.getElementById('producto'+idItem);
            producto.remove();
        } else {
            //ACTUALIZAR CONTADOR ITEM
            var description = document.getElementById('description'+carrito[position].id);
            var itemTotal = carrito[position].precio*carrito[position].cantidad;
            description.innerText = carrito[position].nombre+"("+carrito[position].cantidad+")"+itemTotal.toFixed(2)+"$";
        }
        document.getElementById('total').innerText = cestaTotal.toFixed(2);
        storage.setItem('carrito', JSON.stringify(carrito));
        console.log('carrito menos:',carrito);
    
        if (carrito.length == 0) {
            document.getElementById('total').innerText = "";
            document.getElementById('basket').innerText = "Your cart is empty!";
            document.getElementById('botonConfirmar').remove();
        }
    }
}

function openBurger(){
    var meat = document.getElementById("meat");
    meat.classList.toggle("show");
}

//LOCALIZANDO

function localizado(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else {
        var basket = document.getElementById("basket");
        basket.innerHTML = "Geolocation is not supported by this browser.";
    }
}
function showPosition(position) {
    //Vaciar cesta + Mensaje
    carrito = [];
    storage.setItem('carrito', JSON.stringify(carrito));
    var basket = document.getElementById("basket");
    basket.innerHTML = "Thank you for your purchase!";

    window.open("https://www.google.es/maps/@"+position.coords.latitude+","+position.coords.longitude+",15z?hl=es");
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
}




