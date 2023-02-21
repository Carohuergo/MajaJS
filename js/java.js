let productoIngresado=""
let totalProducto=0
do {
    productoIngresado = (prompt("Ingrese el nombre del modelo que sea alquilar"))

    switch (productoIngresado) {
        case "maria": totalProducto = 3000
        break;
        case "paulina": totalProducto = 4000
        break;
        case "carolina": totalProducto = 3500
        break;
        case "catalina": totalProducto = 3200
        break;
        default: productoIngresado = "modelo inexistente" 
        alert("modelo inexistente")
        break;
    }
} while (productoIngresado == "modelo inexistente")


alert(" el total de su carrito es " + totalProducto)

 let segundoProducto=prompt("¿Desea agregar otro modelo? ")
 let precio=0
 while (segundoProducto=="si") {

    let nuevoProducto = (prompt("Ingrese el nombre del modelo que sea alquilar"))
    
    switch (nuevoProducto) {
    case "maria": precio = 3000
    break;
    case "paulina": precio = 4000
    break;
    case "carolina": precio = 3500
    break;
    default: alert("modelo inexistente") 
    break;
    }
    totalProducto= totalProducto + precio
    segundoProducto=prompt("Desea agregar otro modelo ? ")   
 }

 alert("El total de los modelos seleccionados para alquiler es " + totalProducto)

 alert("Puede abonar con tarjeta hasta 3 cuotas con recargo o en efectivo con un 10% de descuento")

 let formaDePago=prompt("¿Como va a abonar, en efectivo o con tarjeta?")

 function multiplicar (prod1, prod2){
    return prod1 * prod2
}

let cuota=0
 if (formaDePago=="efectivo") {
    let precioFinal= multiplicar (totalProducto,0.90)
    {alert ("El total a abonar es " + precioFinal)}
 }  
 else {cuota=parseInt(prompt("Va a abonar en 1 (+6%), 2(+10%) o 3(+15%) cuotas"))}

 if (cuota==1) {
    let unPago= multiplicar (totalProducto,1.06)
    alert ("El total a abonar es una cuota es " + unPago)}
    else if (cuota==2) {
        let dosPagos= multiplicar (totalProducto,1.10)
        alert ("El total a abonar es dos cuota es " + dosPagos)}
        else {
            let tresPago= multiplicar (totalProducto,1.15)
             alert ("El total a abonar es tres cuota es " + tresPago)}
             
         
    
     
 
 

