//base de datos de mis productos
const productos = [
  {
    id: 1,
    modelo: "guiseppina",
    precio: 3000,
    descrip:
      "Confeccionado en paillette bordado sobre seda fría con spandex, tela importada.",
    img: "../assets/images/VestidoGuiseppina2.JPG",
    alt: "Vestido Guiseppina pailete rojo",
  },
  {
    id: 2,
    modelo: "toia",
    precio: 3400,
    descrip:
      "Confeccionado en taftan de seda, escote en v con recortes y espalda con tiras cruzadas",
    img: "../assets/images/VestidoToia2.jpg",
    alt: "Vestido Toia taftan azul",
  },
  {
    id: 3,
    modelo: "olivia",
    precio: 4000,
    descrip:
      "Vestido confeccionado en saten de seda, con corte americano, espalda baja y tajo.",
    img: "../assets/images/VestidoOliva2.PNG",
    alt: "vestido oliva seda verde",
  },
  {
    id: 4,
    modelo: "alexia",
    precio: 3200,
    descrip:
      "Conjunto de top bando, pantalón suelto y saco Sastrero. Confeccionado en paillette plisado importado",
    img: "../assets/images/ConjuntoAlexia3.PNG",
    alt: "conjunto alexia paillette rosa",
  },
  {
    id: 5,
    modelo: "maria",
    precio: 5000,
    descrip: "Vestido confeccionado en doble seda fría importada.",
    img: "../assets/images/VestidoMaria2.PNG",
    alt: "vestido maria seda negro",
  },
  {
    id: 6,
    modelo: "milagros",
    precio: 5000,
    descrip:
      "Vestido confeccionado en paillette bordado sobre seda fría con spandex, tela importada.",
    img: "../assets/images/VestidoRosaconMangas.PNG",
    alt: "vestido rosa paillette rosa",
  },
];

//array que se llenara de objetos(productos) que vaya ingresando el usuario
const carrito = [];
let contenedorTotalCarrito = document.getElementById("totalCarrito");

//Creo mis productos en HTML y relaciono el boton con el producto.
function relacionProductoConButton() {
  //recorro mi array de productos
  for (const producto of productos) {
    let adentroDelBotton = document.createElement("div");
    //armo el html que relacionara cada producto con el boton
    //adentro esta la estructura del html del producto y un modal para avisarle al usuario que se agrego al producto
    adentroDelBotton.innerHTML = `
      <div class="row margenGaleria">
        <div class="col-sm-6">
          <div class="ih-item square effect6 from_top_and_bottom"><a>
            <div class="imgGaleria ">
             <img src="${producto.img}"  alt="${producto.alt}" loading="lazy">
            </div>
            <div class="info">
              <h3> ${producto.modelo} </h3>
              <h3>$ ${producto.precio}</h3>
              <p> ${producto.descrip} </p>
              <div class="d-flex justify-content-center">
                <button type="button" class="btn btn-dark btn-outline-light" id=${producto.id} data-bs-toggle="modal" data-bs-target="#exampleModal" >Agregar al carrito</button>
              </div>
            </div></a>
          </div>
        </div>
      </div>
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header agrandar">
            <h1 class="modal-title" id="exampleModalLabel">Carrito de Compra</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
          </div>
          <div class="modal-body agrandar">
            Producto agregado exitosamente al carrito
          </div>
          <div class="modal-footer">
          <button
          class="btn btn-dark btn-outline-ligh"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasScrolling"
          aria-controls="offcanvasScrolling"
        >
          VER CARRITO
        </button>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">OK</button>
          </div>
        </div>
      </div>
    </div>
        `;
    //agrego lo creado a mi html
    let agregoParraffo = document.getElementById("galeriaDeProductos");
    agregoParraffo.append(adentroDelBotton);
    let botonParaAgregar = document.getElementById(`${producto.id}`);
    botonParaAgregar.addEventListener("click", agregarAlCarrito);
  }
  //si ya estaba guardado el carrito en storage, que vuelva aparecer el carrito como habia quedado
  let carritoGuardado = JSON.parse(localStorage.getItem("carritoLocal"));
  // if (carritoGuardado){
  //   carrito = carritoGuardado
  // }

}

//funcion para agregar el producto al carrito y sumar cantidades
function agregarAlCarrito(e) {
  let id = Number(e.target.getAttribute("id"));
  let productoAAgregar = productos.find((producto) => producto.id === id);
  if (existeEnCarrito(productoAAgregar)) {
    let productoEnCarrito = carrito.find(
      (producto) => producto.id === productoAAgregar.id
    );
    let indiceDelProducto = carrito.indexOf(productoEnCarrito);
    carrito[indiceDelProducto].cantidad += 1;
    let productoAnterior = document.getElementById(
      `producto${productoAAgregar.id}`
    );
    productoAnterior.innerHTML = `
          <div class="cardCarrito">
          <h2>${productoAAgregar.modelo.toUpperCase()}</h2>
          <h3>$ ${productoAAgregar.precio}</h3>
          <h3>Cantidad: ${carrito[indiceDelProducto].cantidad}</h3>
          <h3>Total de ${productoAAgregar.modelo} : $ ${
      carrito[indiceDelProducto].cantidad * productoAAgregar.precio
    }</h3>
          </div>
      `;
    //llamo a la funcion para sumar el total del producto agregago, acumulando el anterior
    calcularTotal();
  } else {
    let productoConCantidad = { ...productoAAgregar, cantidad: 1 };
    carrito.push(productoConCantidad);
    let cardCarrito = document.createElement("div");
    cardCarrito.innerHTML = `
          <div class="cardCarrito">
          <h2>${productoConCantidad.modelo.toUpperCase()}</h2>
          <h3>$ ${productoConCantidad.precio}</h3>
          <h3>Cantidad: 1</h3>
          </div>
      `;
    cardCarrito.setAttribute("id", `producto${productoConCantidad.id}`);
    let carritoContendor = document.getElementById("carrito");
    carritoContendor.append(cardCarrito);
  }
  //llamo a la funcion para sumar el total del producto agregafo
  calcularTotal();
  //guardo el carrito en el localstorage.
  localStorage.setItem("carritoLocal", JSON.stringify(carrito));
}

//verifico si esta el producto en el carrito para luego ver si lo creo por primera vez o le cambio la cantidad
function existeEnCarrito(productoAChequear) {
  for (producto of carrito) {
    if (productoAChequear.id === producto.id) {
      return true;
    }
  }
  return false;
}

//sumamos el total del carrito con un reduce que vaya almacenando en total producto, los precios del carrito//
function calcularTotal() {
  let totalCarrito = carrito.reduce(
    (acc, ite) => acc + ite.precio * ite.cantidad,
    0
  );
  //renderizo el total en mi html
  contenedorTotalCarrito.innerHTML = `
  <div class="cardCarrito">
  <h3> El total del carrito es $ ${totalCarrito}</h3>
  </div>
`;
}
function borrarCarrito () {
  let botonVaciar = document.getElementById("vaciarCarrito");
  botonVaciar.addEventListener("click", botonBorrarCarrito);
}

function botonBorrarCarrito (){
  carrito =[]
  localStorage.removeItem("carritoLocal")
  console.log(carrito)
}

//llamo a las funciones creadas.

relacionProductoConButton();
borrarCarrito()








