let mascotas = [];
let mascotasSalidad = [];
mascotas = mascotas.concat(JSON.parse(localStorage.getItem("mascotas")) || []);
iterar();
mascotasSalidad = mascotasSalidad.concat(JSON.parse(localStorage.getItem("mascotasSalidad")) || []);
iterarr();

function registrar() {
  let nombrePropietario = document.querySelector("#nombrePropietario").value;
  let nombreMascota = document.querySelector("#nombreMascotas").value;
  let fecha = document.querySelector("#fecha").value;
  let sintomas = document.querySelector("#sintomas").value;
  console.log(fecha)
  let id = 1;
  if (mascotas.length) {
    id = mascotas[mascotas.length - 1].id + 1;
  }

  if ([id, nombrePropietario, nombreMascota, fecha, sintomas].includes("")) {
    //nombre===``,
    alert("todos los campos son obligatorios");
  } else {
    crearPaciente(id, nombrePropietario, nombreMascota, fecha, sintomas);

    iterar();
  }

  function crearPaciente(
    id,
    nombrePropietario,
    nombreMascota,
    fecha,
    sintomas
  ) {
    let mascota = {
      nombrePropietario,
      nombreMascota,
      fecha,
      sintomas,
      id,
    };
    mascotas.push(mascota);
    localStorage.setItem("mascotas", JSON.stringify(mascotas));
  }


}



function borrarElemento(id) {
  //Obtengo los datos de la mascota que va a salir
  let mascota = mascotas.find((mascota) => mascota.id == id);

  // mascota.fechaSalidad=new Date().toLocaleString();
  // agregar fecha de hoy 
  mascota.fechaSalidad = new Date();
  mascotasSalidad.push(mascota);
  localStorage.setItem("mascotasSalidad", JSON.stringify(mascotasSalidad));

  //Obtengo la mascota que voy a eliminar y me regresa el arreglo actualizado
  let masccotasFiltradas = mascotas.filter((mascota) => mascota.id !== id);
  mascotas = masccotasFiltradas;

  //Actualizo el LS
  localStorage.setItem("mascotas", JSON.stringify(mascotas));

  //Itero la tabla actualizada
  iterar();
  iterarr()

}

// cambair variables 
function editar(id) {
  let nombreMascota = document.querySelector("#nombreMascota" + id).value;
  let nombrePropietario = document.querySelector("#nombrePropietario" + id).value;
  let fechaIngreso= document.querySelector("#fechaIngreso" + id).value;
  let  sintomas= document.querySelector("#sintomas" + id).value;
  let fechaSalidad = document.querySelector("#fechaSalidad" + id).value;

  // indice busca el valor en el arrr y lo compara con el id
  let indice = mascotasSalidad.findIndex(mascota => mascota.id == id);
  mascotasSalidad[indice].nombreMascota = nombreMascota; // busca en el arr mascotaSalida el valor y lo desigan al valo nuevo del input
  mascotasSalidad[indice].nombrePropietario = nombrePropietario;
  mascotasSalidad[indice].fecha=fechaIngreso ;
  mascotasSalidad[indice].sintomas=sintomas;
mascotasSalidad[indice].fechaSalidad=fechaSalidad;



}


// estilo de fecha
function formatearFecha(fecha) {

  let newfecha = new Date(fecha);
  let opciones = {
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: 'numeric',
    minute: 'numeric', second: 'numeric'
  }
  var today = new Date();
  var now = today.toLocaleTimeString('en-US');
  console.log(now);

  return newfecha.toLocaleString("es-CO", opciones);
}

function iterar() {
  var usejs = JSON.parse(localStorage.getItem("mascotas"));



  if (usejs === null) {
    mascotas = [];
  } else {
    const resultado = usejs.map(
      (datos) =>
        `<tr>
  
                  <td>${datos.nombrePropietario}</td>
                  <td>${datos.nombreMascota}</td>
                  <td >${formatearFecha(datos.fecha)}</td>
                  <td>${datos.sintomas}</td>
          
                     
                <td><input type="button" value="fecha salidad " onclick="borrarElemento(${datos.id})"/></td>
                <td><input type="button" value="editar " onclick="borrarElemento($)"/></td>
               
              </tr>`
    );

    document.querySelector("#tbody").innerHTML = resultado;
  }
}

function iterarr() {
  let resultado = "";
  // cambiar variables
  for (let i = 0; i < mascotasSalidad.length; i++) {
    resultado += `
    <div class="card">

    <h2>Nombre </h2>            <input id="nombrePropietario${mascotasSalidad[i].id}" type="text"value= "${mascotasSalidad[i].nombrePropietario}">
    <h2>nombre de mascota</h2>  <input id="nombreMascota${mascotasSalidad[i].id}" type="text"value= "${mascotasSalidad[i].nombreMascota}">
    <h2>fecha de ingreso</h2>   <input id="fechaIngreso${mascotasSalidad[i].id}" type="text"value= "${formatearFecha(mascotasSalidad[i].fecha)}">
    <h2>sintomas</h2>           <input id="sintomas${mascotasSalidad[i].id}" type="text"value= "${mascotasSalidad[i].sintomas}">
   
    <h2>fecha de salidad</h2>   <input id="fechaSalidad${mascotasSalidad[i].id}" type="text"value= "${formatearFecha(mascotasSalidad[i].fechaSalidad)}">

    <input type="button" value="editar " onclick="editar(${mascotasSalidad[i].id})"/>
    </div>

   
`



  }

  let listCard = document.getElementById("listCard");
  listCard.innerHTML = resultado;

}
