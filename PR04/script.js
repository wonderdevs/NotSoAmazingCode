//Variables de los productos
const productos = [
    {
        id: 0,
        nombre: 'NieR Replicant',
        precio: 29.95,
        cantidad: 0
    },
    {
        id: 1,
        nombre: 'NieR Automata',
        precio: 19.95,
        cantidad: 0
    },
    {
        id: 2,
        nombre: 'The Last of Us',
        precio: 19.95,
        cantidad: 0
    },
    {
        id: 3,
        nombre: 'Uncharted 4',
        precio: 19.95,
        cantidad: 0
    },
    {
        id: 4,
        nombre: 'Persona 5 Strikers',
        precio: 39.95,
        cantidad: 0
    },
    {
        id: 5,
        nombre: 'NieR Replicant Soundtrack',
        precio: 39.95,
        cantidad: 0
    },
    {
        id: 6,
        nombre: 'NieR Automata Soundtrack',
        precio: 39.95,
        cantidad: 0
    },
    {
        id: 7,
        nombre: 'The Last of Us Soundtrack',
        precio: 29.95,
        cantidad: 0
    },
    {
        id: 8,
        nombre: 'Uncharted Soundtrack',
        precio: 29.95,
        cantidad: 0
    },
    {
        id: 9,
        nombre: 'Persona 5 Soundtrack',
        precio: 39.95,
        cantidad: 0
    },
    {
        id: 10,
        nombre: 'NieR Replicant Vinyl',
        precio: 59.95,
        cantidad: 0
    },
    {
        id: 11,
        nombre: 'NieR Automata T-shirt',
        precio: 19.95,
        cantidad: 0
    },
    {
        id: 12,
        nombre: 'The Last of Us Vinyl',
        precio: 59.95,
        cantidad: 0
    },
    {
        id: 13,
        nombre: 'Uncharted Plushie',
        precio: 19.95,
        cantidad: 0
    },
    {
        id: 14,
        nombre: 'Persona 5 Notebook',
        precio: 39.95,
        cantidad: 0
    },
    {
        id: 15,
        nombre: 'The Last of Us Part II',
        precio: 39.95,
        cantidad: 0
    },
    {
        id: 16,
        nombre: 'The Last of Us Part II Soundtrack',
        precio: 39.95,
        cantidad: 0
    },
    {
        id: 17,
        nombre: 'The Last of Us Part II Notebook',
        precio: 59.95,
        cantidad: 0
    },
];

//FUNCIONES DEL CARRITO
//Guardamos instancia de SESSION STORAGE.
var storage = window.sessionStorage;
//Recogemos el valor de "carrito" de nuestra SESSION STORAGE.
var carrito = JSON.parse(storage.getItem('carrito'));
console.log('carrito', carrito);
//Si no existe creamos nuestro carrito como array vacío.
if (!carrito) {
    carrito = [];
}

//Popular nuestro HTML con lo que tengamos en "session".
for (var j=0; j<carrito.length; j++) {
    addToCarrito(carrito[j].id, j);
}
actualizarContador();

/**
 * Actualizar el númerito del carrito
 */
function actualizarContador() {
    var contador = document.getElementById("contador");
    var contadorBurger = document.getElementById("contadorBurger");
    var total = 0;
    for (var i=0; i<carrito.length; i++) {
        total = total + carrito[i].cantidad;
    }
    contador.innerText = total;
    contadorBurger.innerText = total;
    if (carrito.length > 0) {
        contador.classList.add('show');
        contadorBurger.classList.add('show');
    } else {
        contador.classList.remove('show');
        contadorBurger.classList.remove('show');
    }
}

/**
 * Añadir producto al carrito
 */
function addToCarrito(idItem, position) {
    var cantidadItem = document.getElementById('cantidad'+idItem);
    document.getElementById("mensaje-carrito").style.display = "none";
    if (!cantidadItem) {
        var carro = document.getElementById("contenido-carrito");
        var productoCont = document.createElement('div');
        var producto = document.createElement('div');
        var cantidad = document.createElement('div');
        var borrar = document.createElement('button');
        
        productoCont.setAttribute('id', 'producto'+idItem);
        productoCont.classList.add('item-carro')
        cantidad.setAttribute('id', 'cantidad'+idItem);
        cantidad.classList.add('cantidad');
        borrar.addEventListener("click", function(){quitando(idItem)}, false);
        borrar.innerText = "x";
        producto.innerText = carrito[position].nombre;
        cantidad.innerText = carrito[position].cantidad;
    
        productoCont.appendChild(producto);
        productoCont.appendChild(cantidad);
        productoCont.appendChild(borrar);
    
        carro.appendChild(productoCont);
    
        var botonVaciar = document.getElementById('accion-vaciar');
        //Si no hay botón vaciar, añadimos botón vaciar y checkout
        if (!botonVaciar) {
            //Add boton vaciar
            var accion = document.getElementById("acciones-carrito");
            var reset = document.createElement('button');
            reset.setAttribute('id', 'accion-vaciar');
            reset.setAttribute('class', 'boton3');
            reset.addEventListener("click", function(){seguro()});
            reset.innerText = "Empty cart";
    
            accion.appendChild(reset);
            
            var checking = document.createElement('a');
            checking.setAttribute("href", "checkout.html");
            checking.setAttribute("id", "check");
            checking.setAttribute("class", "boton3");
            checking.innerText = "Checkout";
            
            accion.appendChild(checking);
        }
    } else {
        cantidadItem.innerText = carrito[position].cantidad;
    }
}

/**
 * Acción al apretar botón de COMPRAR.
 * */
function comprando(event) {
    var idItem = parseInt(event.target.getAttribute('item'));
    event.target.innerText="Done!";
    window.setTimeout(function(boton){boton.innerText="Buy!"}, 800, event.target);

    var position = -1;
    for (var i=0; i<carrito.length; i++) {
        if (carrito[i].id == idItem) {
            position = i;
        }
    }
    if (position > -1) {
        carrito[position].cantidad++;
    } else {
        var nuevoItem = productos[idItem];
        nuevoItem.cantidad = 1;
        carrito.push(nuevoItem);
        position = carrito.length-1;
    }
    addToCarrito(idItem, position);
    storage.setItem('carrito', JSON.stringify(carrito));
    actualizarContador();
}

/** 
 * Acción al apretar "x" de un producto del carrito.
 * */
function quitando(idItem) {
    console.log('quitando item', idItem);
    var position = -1;
    for(var i=0; i<carrito.length; i++) {
        if(carrito[i].id == idItem) {
            position = i;
        }
    }

    if (position > -1) {
        carrito[position].cantidad--;
        if (carrito[position].cantidad == 0) {
            carrito.splice(position, 1);
            //QUITAMOS HTML
            var producto = document.getElementById('producto'+idItem);
            producto.remove();
        } else {
            var cantidadItem = document.getElementById('cantidad'+idItem);
            cantidadItem.innerText = carrito[position].cantidad;
        }
        storage.setItem('carrito', JSON.stringify(carrito));
    }
    console.log('carrito menos:',carrito);

    
    if(carrito.length == 0) {
        document.getElementById("mensaje-carrito").style.display = "none";
        document.getElementById("acciones-carrito").innerHTML = '';
        document.getElementById("dropdown").classList.remove('show');
    }

    actualizarContador();
}

/**
 * Acción al apretar botón "Vaciar cesta".
 */
function vaciar() {
    //Quitar items de HTML
    var borrocontenido = document.getElementById("contenido-carrito");
    borrocontenido.innerHTML = '';
    var borroaccion = document.getElementById("acciones-carrito");
    borroaccion.innerHTML = '';
    //Eliminar items de array
    carrito = [];
    //Actualizar SessionStorage
    storage.setItem('carrito', JSON.stringify(carrito));
    actualizarContador();
    var esconder = document.getElementById("dropdown");
    esconder.classList.remove('show');
}
function seguro(){
    if (confirm("DANGER! Do you really wish to empty your cart?")) {
        vaciar();
      }
}

/**
 * Acción al hacer click sobre 🛒.
 */
function mostrar(){
    var mostrar = document.getElementById("dropdown");
    mostrar.classList.toggle("show");
    
    if (carrito.length == 0){
        document.getElementById("mensaje-carrito").style.display = "block";
    } else {
        document.getElementById("mensaje-carrito").style.display = "none";
    }

    //document.getElementById("mensaje-carrito").style.display = (carrito.length == 0)? "block" : "none";
}
//MENU HAMBURGUESA

function openBurger(){
    var meat = document.getElementById("meat");
    meat.classList.toggle("show");
}

//FUNCIONES MUSICA
var player = document.getElementById('player');
var playerSource = document.getElementById('mp3_source');

function playDemoAudio(track) {
    player.pause();
    playerSource.src = track;
    player.load();
    player.volume = 0.4;
    player.play();
    setTimeout(
        function(currentTrack){
            if (playerSource.src.includes(currentTrack)) {
                player.pause();
            }
        },
        20000,
        track
    );
}