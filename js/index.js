// import turnos from "./turnos.js";

const turnosContainer = document.getElementById("turnosContainer");
const detalleContainer = document.getElementById("detalleContainer");
let indiceSeleccionado;

const clienteElement = document.getElementById("cliente");
const modeloElement = document.getElementById("modelo");
const problemaElement = document.getElementById("problema");
const comentarioElement = document.getElementById("comentario");
const marcarTerminadoElement = document.getElementById("finalizar");


function createTarjeta(turno,index){
  const nuevaTarjeta = document.createElement("div");
  nuevaTarjeta.classList = "tarjeta";
  nuevaTarjeta.innerHTML = `
    <h3>${turno.cliente}</h3>
    <p>${turno.email}</p>
    <p>${turno.modelo}</p>
    <p>${turno.problema}</p>
  `
  nuevaTarjeta.addEventListener("click", ()=> actualizarDetalle(index))
  turnosContainer.appendChild(nuevaTarjeta);
}

function actualizarTarjetas(){
  turnosContainer.innerHTML = "";
  turnos.forEach((turno,i) => {
    createTarjeta(turno,i);
  })
}

function actualizarDetalle(index){
  if(indiceSeleccionado !== undefined) turnosContainer.children[indiceSeleccionado].classList.toggle("seleccionado",false);
  clienteElement.innerText = turnos[index].cliente;
  modeloElement.innerText = turnos[index].modelo;
  problemaElement.innerText = turnos[index].problema;
  detalleContainer.classList.toggle("escondido",false);
  indiceSeleccionado = index;
  turnosContainer.children[indiceSeleccionado].classList.toggle("seleccionado",true);
}

finalizar.addEventListener("click",()=> marcarTerminado(indiceSeleccionado))

async function marcarTerminado(i){
  const updateTurno = turnos[i];
  updateTurno.comentario = comentarioElement.value;
  const res = await editTurno(updateTurno.id,updateTurno);
  if(res.status === 200){
    turnos = turnos.filter(turno => turno.id !== updateTurno.id);
    indiceSeleccionado = 0;
    await actualizarTarjetas()
    detalleContainer.classList.toggle("escondido",true);
    comentarioElement.value="";
  }
}

