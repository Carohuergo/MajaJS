function multiplicar(prod1, prod2) {
  return prod1 * prod2;
}

//base de datos de mis productos
const productos = [
  { cod: 101, modelo: "maria", precio: 3000 },
  { cod: 102, modelo: "carolina", precio: 3400 },
  { cod: 103, modelo: "paulina", precio: 4000 },
  { cod: 104, modelo: "catalina", precio: 3200 },
];

//array que se llenara de objetos(productos) que vaya ingresando el usuario
const carrito = [];

//le pregunto al usuario el modelo que quiere elegir

//busca el modelo en la base de datos y lo agrega al carrito de compras. Si no existe, vuelve a preguntar
let modeloinexistnte = "";
function buscarModelo() {
  do {
    let productoElegido = prompt("Indique el modelo que desea alquilar");
    let busqueda = productos.find(
      (producto) => producto.modelo === productoElegido
    );
    if (busqueda === undefined) {
      modeloinexistnte = "error";
      alert("Modelo inexistente");
    } else {
      carrito.push(busqueda);
      console.log(carrito);
      alert("Modelo " + productoElegido + " fue ingresado al carrito")
      modeloinexistnte = "";
    }
  } while (modeloinexistnte === "error");
}

//evaluo si desea agregar mas modelos al carrito y agrego.
function elegirMasProductos() {
  let segundoProducto = prompt("¿Desea agregar otro modelo (si/no)? ");
  while (segundoProducto === "si") {
    buscarModelo();
    segundoProducto = prompt("Desea agregar otro modelo (si/no)? ");
  }
}

//funcion para eliminar un producto del carrito

function eliminarProducto() {
  let respuesta = prompt("Desea eliminar un producto del carrito (si/no)?");
  if (respuesta === "si") {
    do {
      let modeloEliminar = prompt(
        "Indique el modelo que desea eliminar del carrito de compras"
      );
      let busquedaModeloEliminar = carrito.find(
        (producto) => producto.modelo === modeloEliminar
      );
      if (busquedaModeloEliminar === undefined) {
        modeloinexistnte = "error";
        alert("Modelo inexistente");
      } else {
        let posicion = carrito.indexOf(busquedaModeloEliminar);
        console.log(posicion);
        carrito.splice(posicion, 1);
        console.log(carrito);
        alert("Se elimino del carrito al modelo: " + modeloEliminar);
        modeloinexistnte = "";
      }
    } while (modeloinexistnte === "error");
  }
}

//mostramos el carrito final al usuario
function carritoFinal() {
  const modelosDelCarritoFinal = carrito.map((producto) => producto.modelo);
  alert("Carrito de compra final = " + modelosDelCarritoFinal);
}

//sumamos el total el carrito//
let totalProducto = 0;
function sumaCarrito() {
  carrito.forEach((producto) => {
    totalProducto += producto.precio;
  });
  alert("El precio final de su carrito de compra es " + totalProducto);
}
//final de compra. pasamos a forma de pagos//
function metodosDePago() {
  alert(
    "Puede abonar con tarjeta hasta 3 cuotas con recargo o en efectivo con un 10% de descuento"
  );

  let formaDePago = prompt("¿Como va a abonar, en efectivo o con tarjeta?");
  let cuota = 0;

  if (formaDePago == "efectivo") {
    let precioFinal = multiplicar(totalProducto, 0.9);
    alert("El total a abonar es " + precioFinal);
  } else {
    while (cuota != 1 && cuota != 2 && cuota != 3) {
      cuota = parseInt(
        prompt(
          "¿Ingrese en cuantas cuotas desea abonar: 1 (+6%), 2(+10%) o 3(+15%) cuotas?"
        )
      );
    }
    if (cuota === 1) {
      let unPago = multiplicar(totalProducto, 1.06);
      alert("El total a abonar en una cuota es " + Math.round(unPago));
    } else if (cuota === 2) {
      let dosPagos = multiplicar(totalProducto, 1.1);
      alert("El total a abonar en dos cuota es " + Math.round(dosPagos));
    } else {
      let tresPago = multiplicar(totalProducto, 1.15);
      alert("El total a abonar en tres cuotas es " + Math.round(tresPago));
    }
  }
}

//Creo un objetos, le pido datos al usuario y los guardo en base de datos 

function datosCliente () {
    class Cliente {
        constructor (nombre, apellido, dni, telefono, mail, fecha) {
            this.nombre = nombre;
            this.apellido = apellido;
            this.dni = dni;
            this.telefono = telefono;
            this.mail = mail;
            this.fecha = fecha
        }

    }
   let nombre=prompt("Ingrese su nombre")
   let apellido=prompt("Ingrese su apelldo")
   let dni = prompt("Ingrese su dni")
   let telefono =prompt("Ingrese su telefono")
   let mail= prompt ("Ingrese su mail")
   let fecha = prompt("Ingrese la fecha del evento (dd/mm/aa)")


    const cliente1 = new Cliente (nombre, apellido, dni, telefono, mail, fecha)
    const BaseDeDatosClientes = [cliente1]
    console.log(BaseDeDatosClientes)
    alert("verificaremos sus datos y si los modelos estan libres para la fecha indicada, le llegara un mail con los datos para efectuar el pago. Gracias, equipo Maja")
}
//llamo a las funciones creadas.
buscarModelo();
elegirMasProductos();
eliminarProducto();
carritoFinal();
sumaCarrito();
metodosDePago();
datosCliente ()
