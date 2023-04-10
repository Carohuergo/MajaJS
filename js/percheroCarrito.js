//si ya estaba guardado el carrito en storage, que vuelva aparecer el carrito , sino vacio para ir llenandolocomo habia quedado
let carrito = JSON.parse(localStorage.getItem("carritoLocal")) || [];

//contenedores y boton del carrito

let contenedorTotalCarrito = document.getElementById("totalCarrito");
let carritoContendor = document.getElementById("carrito");
const btnMostrarCarrito = document.getElementById("mostrar-carrito")
btnMostrarCarrito.addEventListener("click",renderizoCarrito)

//creo mi array de productos vacio para luego llenarlo con la informacion de la respuesta de fetch (data)
let productos = [];

//funcion para recolectar informacion de mi json creada
async function obtenerJson() {
  try {
    const resp = await fetch("../js/data.json");
    const data = await resp.json();
    //la respuesta de data la almaceno en mi array de productos
    productos = data;

    data.forEach((producto) => {
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
              data-bs-dismiss="modal">
              VER CARRITO
            </button>
              </div>
            </div>
          </div>
        </div>
            `;
      //agrego lo creado a mi html
      let agregoParraffo = document.getElementById("galeriaDeProductos");
      agregoParraffo.append(adentroDelBotton);
      let botonParaAgregar = document.getElementById(`${producto.id}`);
      botonParaAgregar.addEventListener("click", () =>
        agregarAlCarrito(`${producto.id}`)
      );
    });
  } catch (error) {
    //si la promesa no se cumple alerta con error
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Error en carga de datos!",
    });
  }
}

//funcion para agregar el producto al carrito y sumar cantidades
function agregarAlCarrito(id) {
  let productoAAgregar = productos.find((producto) => producto.id == id);
  const productoEnCarrito = carrito.find((producto) => producto.id == id);
  if (productoEnCarrito) {
    productoEnCarrito.cantidad++;
    localStorage.setItem("carritoLocal", JSON.stringify(carrito));
  } else {
    carrito.push(productoAAgregar);
    localStorage.setItem("carritoLocal", JSON.stringify(carrito));
  }
  //actualizo carrito
  renderizoCarrito();
  //llamo a la funcion para sumar el total del producto agregado
  calcularTotal();
}

//renderizo mi carrito con el producto agregado.
function renderizoCarrito() {
  //vacio contenedor antes para no duplicar informacion
  carritoContendor.innerHTML="";
  //recorro el carrito y renderizo los productos
  carrito.forEach((producto) => {
    const aux = document.createElement("div")
    aux.innerHTML = `
  <div class="cardCarrito">
  <div>
  <h2>${producto.modelo.toUpperCase()}</h2>
  <h3>$ ${producto.precio}</h3>
  <h3>Cantidad: ${producto.cantidad}</h3>
  </div>
  <div>
  <button id= ${producto.modelo} class=" btn-eliminar-prod-carro btn-dark btn-lg">x</button>
  </div>
  </div>
`;
//agrego el contenido al contenedor dentro de un hijo.
carritoContendor.appendChild(aux)

//relaciono el boton para eiminar cantidades del producto o su totalidad.
const btnEliminar =document.getElementById(`${producto.modelo}`);
btnEliminar.addEventListener("click", eliminarCantidad)
  });

  //actualizo totales
  calcularTotal();
}


//funcion para eliminar si hace click en el evento.
function eliminarCantidad(e) {
const id= e.target.id
const indice= carrito.findIndex((p)=> p.modelo === id)
    if(carrito[indice].cantidad > 1) {
      carrito[indice].cantidad--;
    } else {
      carrito.splice (indice,1);
      Swal.fire(
        "Producto eliminado!",
        "Has eliminado el producto del carrito.",
        "success"
      );
    }
       
           
   //actualizo mi carrito 
   renderizoCarrito();
   //actualizo totales
   calcularTotal();
   //guardo cambio en el stotage
   localStorage.setItem("carritoLocal", JSON.stringify(carrito));
  }
  


//funcion para sumar el total del carrito con un reduce que vaya almacenando en total producto, segun cantidad
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

//creo el evento para que cuando se se haga click en vaciar, se elimine los productos del carrito
function borrarCarrito() {
  let botonVaciar = document.getElementById("vaciarCarrito");
  botonVaciar.addEventListener("click", botonBorrarCarrito);
}

//funcion de vaciar carrito con alerta antes de confirmar.
function botonBorrarCarrito() {
  Swal.fire({
    title: "Estas seguro de querer vaciar el carrito?",
    text: "No vas a poder revertirlo!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "rgba(95, 171, 116, 0.95)",
    cancelButtonColor: "rgba(238, 62, 62, 0.926)",
    confirmButtonText: "Si, eliminar productos!",
    width: 400,
    heigh: 400,
    padding: "3em",
  }).then((result) => {
    //vacio carrito, llamo a CalcularSuma, para que quede en O y renderizo el contenedor
    if (result.isConfirmed) {
      carrito = [];
      carritoContendor.innerHTML = "";
      localStorage.removeItem("carritoLocal");
      calcularTotal();
      Swal.fire(
        "Carrito vacio!",
        "Has eliminado los productos del carrito.",
        "success"
      );
    }
  });
}

//llamo a las funciones creadas.
obtenerJson();
borrarCarrito();

