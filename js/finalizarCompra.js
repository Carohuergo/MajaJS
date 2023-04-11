
//relaciono el contenedor de html con mi variable para insertar mi contenido
let finalizarCompraContenedor = document.getElementById("contenedorFinalizarCompra");

//renderizo mi html con un form para que el usuario ingrese sus datos
  function finalizarCompraCarrito() {
   let adentroDelForm = document.createElement("div");
    adentroDelForm.innerHTML = `
               <div class="d-flex justify-content-center">
               <div class="col-8 ">
                    <form id="botonEnviarForm" class="form formularioPadre">
                        <div class="formulario align-items-flex-end">
                            <input class="form-control" type="text" placeholder="Nombre y apellido*" required />
                            <br />
                            <input class="form-control" type="email" placeholder="ejemplo@mail.com*" required />
                            <br />
                            <input class="form-control" type="text" placeholder="Telefono*" required />
                            <br />
  
                            <label class="form-check-label" for="">Fecha del evento</label>
                            <input class="form-control" id="" name="dia*" type="date" required />
                             <br>
  
                            <label for="exampleFormControlTextarea1" class="form-label agrandar">Comentarios</label>
                            <textarea class="form-control agrandar" placeholder="Ingrese su mensaje"></textarea>

                            
                            <input class="form-control agrandar botonEnviar" type="submit" value="Enviar">
                            
                          </div>
                    </form>
                </div>
                </div>       
    `;
    //lo agrego adentro del contenedor
    finalizarCompraContenedor.append(adentroDelForm)
  }
//creo qel evento para el input submit
 function solicitudEnviada () {
    let botonEnviar= document.getElementById("botonEnviarForm")
    botonEnviar.addEventListener("submit", compraFinalizada)
 }

//creo alerta para el evento con la informacion del e.target y borro mi formulario una vez enviado, dejando un msj.
 function compraFinalizada (e) {
    e.preventDefault();
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Solitud enviada!',
        text: 'Se ha enviado la solicitud de alquiler correctamente. Si el vestido se encuentra disponible para la fecha indicada, le estaremos enviando un correo con los medios de pago para realizar la compra!',
        showConfirmButton: false,
        timer: 4500,
        width: 600,
        padding: '3em',
      });
      finalizarCompraContenedor.innerHTML=`
       <img src="https://i.pinimg.com/originals/67/fe/66/67fe664122aa49386114470d14be9d2d.gif" alt="gif">
       `
       localStorage.removeItem("carritoLocal")
  
}
 //llamo a las funciones
  finalizarCompraCarrito()
  solicitudEnviada ()