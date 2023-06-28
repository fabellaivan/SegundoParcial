
import { PersonajeNew  } from "../data/personajes.js";
import { actualizarTabla } from "./tabla.js";
/*************form****************** */
const armasJSON = localStorage.getItem('armas');
const armas = ["armadura", "espada", "martillo","Escudo","Arma de Fuego","Flechas"];
localStorage.setItem('armas', armasJSON);
const selectArma = document.getElementById('idArmas');

armas.forEach((arma) => {
    const option = document.createElement('option');
    option.value = arma;
    option.textContent = arma;
    selectArma.appendChild(option);
});

/********************************** */
const $seccionTabla = document.getElementById("tabla");
const $formulario = document.forms[0];

const personajes = JSON.parse(localStorage.getItem("personajes")) || [];

const botonEliminar = document.querySelector('.eliminarCancelar');
/******************************Manejo de operaciones********************************* */
window.addEventListener("click", (e) => {
    if (e.target.matches("td")) {
      const id = e.target.parentElement.dataset.id;
      const selectPersonajes = personajes.find((personajes) => personajes.id == id);
      cargarFormulario($formulario, selectPersonajes);
      botonEliminar.classList.add("eliminarCancelarVisible");
    } else if (e.target.matches("button[value='Eliminar personajes']")) {   
      handlerDelete(parseInt($formulario.txtId.value));
      console.log($formulario.txtId.value);
    }
  
  });


if (personajes.length) actualizarTabla($seccionTabla, personajes);

$formulario.addEventListener("reset",(e) => {
  botonEliminar.classList.remove("eliminarCancelarVisible");
  $formulario.txtId.value = ""; 
});

$formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  const selectArmas = document.querySelector('#idArmas');
  const valorArma = selectArmas.value;
  const {txtId,txtNombre,txtAlias,rdoEditorial,rngFuerza,selArma} = $formulario;
  if (txtId.value === "") {  
    const newPersonaje = new PersonajeNew(
        txtNombre.value,
        txtAlias.value,
        rdoEditorial.value,
        parseInt(rngFuerza.value),        
        valorArma);
    handlerCreate(newPersonaje);
  } else {
    const newPersonaje = new PersonajeNew(
        txtNombre.value,
        txtAlias.value,
        rdoEditorial.value,
        parseInt(rngFuerza.value),       
        selArma.value,
      parseInt(txtId.value));
    handlerUpdate(newPersonaje);
  }

  $formulario.reset();
});

function cargarFormulario(formulario, personajes) {
  const selectArmas = document.querySelector('#idArmas');
  const valorArma = selectArmas.value;
  formulario.txtId.value = personajes.id;
  formulario.txtNombre.value = personajes.nombre;
  formulario.txtAlias.value = personajes.alias;
  formulario.rdoEditorial.value = personajes.rdoEditorial;
  formulario.rngFuerza.value = personajes.rngFuerza;
  formulario.valorArma= personajes.selArma;

}

function actualizaStorage(clave, data) {
  localStorage.setItem(clave, JSON.stringify(data));
}

const spinner = document.getElementById('spinner');
document.querySelectorAll('.guardar, .eliminar').forEach(button => {
  button.addEventListener('click', function() {
    spinner.style.display = 'block';
    setTimeout(function() {
      spinner.style.display = 'none';
    }, 3000);
  });

});


/***********************************ABM******************************************** */


function handlerCreate(nuevoAnuncio) {
  personajes.push(nuevoAnuncio);
  actualizaStorage("personajes", personajes);
  actualizarTabla($seccionTabla, personajes);
}

function handlerUpdate(editarAnuncio) {
  let index = personajes.findIndex((per) => per.id === editarAnuncio.id);
  personajes.splice(index, 1, editarAnuncio); //hay que hacer un sort
  actualizaStorage("personajes", personajes);
  actualizarTabla($seccionTabla, personajes);
}
function handlerDelete(id) {
  let index = personajes.findIndex((personajes) => personajes.id === id);
  if (index !== -1) {
    personajes.splice(index, 1);
    actualizaStorage("personajes", personajes);
    actualizarTabla($seccionTabla, personajes);
    $formulario.txtId.value = ""; 
    $formulario.reset();
  }
}








