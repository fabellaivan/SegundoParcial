import { PersonajeNew } from "../../data/personajes.js";
import { actualizarTabla } from "../jsHERRAMIENTAS/tabla.js";

const URL = "http://localhost:3000/superHeroe";

/*********************************************************************** */
const botonEliminar = document.querySelector(".eliminarCancelar");

const $seccionTabla = document.getElementById("tabla");
const $formulario = document.forms[0];

const $loader = document.getElementById("loader");
$loader.classList.add("oculto");

let person = [];
/*****************************Carga servidor***************************** */

const sendRequest =  (method, url, data) =>{
  const xhr = new XMLHttpRequest();

  xhr.addEventListener("readystatechange", () => {
  
    if (xhr.readyState == 4) {
    
      if (xhr.status >= 200 && xhr.status < 300) {
       const responseData = JSON.parse(xhr.responseText);
       actTabla();
      } else {
        console.error(`Error: ${xhr.status}-${xhr.statusText}`);
      }      
    }
  });
  
  xhr.open(method, url);
  xhr.setRequestHeader("Content-type", "application/json;charset=utf-8");
  if (method == "DELETE" || method == "GET") {
    xhr.send();
  } else {    
    xhr.send(JSON.stringify(data));    
  }
}


const actTabla = () => {
  $loader.classList.remove("oculto");

  const xhr = new XMLHttpRequest();
 
  xhr.addEventListener("readystatechange", () => {
    if (xhr.readyState == 4) {
      if (xhr.status >= 200 && xhr.status < 300) {
        const data = JSON.parse(xhr.responseText);
        person = data;  
        actualizarTabla($seccionTabla, data);
      } else {
        console.error("Error: ${xhr.status}-${xhr.statusText}");
      }
      $loader.classList.add("oculto");
    }
 
  });
  xhr.open("GET", URL);
  xhr.send();
};




/****************************Eventos********************************/
window.addEventListener("click", (e) => {
  if (e.target.matches("td")) {
    const id = e.target.parentElement.dataset.id;
    const selectPersonajes = person.find((person) => person.id == id);
    cargarFormulario($formulario, selectPersonajes);
    botonEliminar.classList.add("eliminarCancelarVisible");
  } else if (e.target.matches("button[value='Eliminar personajes']")) {
    handlerDelete(parseInt($formulario.txtId.value));
  }else if (e.target.matches("button[value='Listar Personajes']")) {
    actTabla();
  }
});
$formulario.addEventListener("reset", (e) => {
  botonEliminar.classList.remove("eliminarCancelarVisible");
  $formulario.txtId.value = "";
});

function cargarFormulario(formulario, personaje) {
  const selectArmas = document.querySelector("#idArmas");
  const valorArma = selectArmas.value;
  formulario.txtId.value = personaje.id;
  formulario.txtNombre.value = personaje.Nombre;
  formulario.txtAlias.value = personaje.Alias;
  formulario.rdoEditorial.value = personaje.Editorial;
  formulario.rngFuerza.value = personaje.Fuerza;
  formulario.idArmas.value = personaje.Arma;
}



/********************Manejo Formulario********************************/
$formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  const selectArmas = document.querySelector("#idArmas");
  const valorArma = selectArmas.value;
  const { txtId, txtNombre, txtAlias, rdoEditorial, rngFuerza, selArma } =
    $formulario;
  if (txtId.value === "") {
    const newPersonaje = new PersonajeNew(
      txtNombre.value,
      txtAlias.value,
      rdoEditorial.value,
      parseInt(rngFuerza.value),
      valorArma
    );
    handlerCreate(newPersonaje);
  } else {
    const newPersonaje = new PersonajeNew(
      txtNombre.value,
      txtAlias.value,
      rdoEditorial.value,
      parseInt(rngFuerza.value),
      selArma.value,
      parseInt(txtId.value)
    );
    handlerUpdate(newPersonaje);
  }

  $formulario.reset();
  
});
/***************************ABM************************************** */
function handlerCreate(newPersonaje) {
  $loader.classList.remove("oculto");
  sendRequest("POST", URL, newPersonaje);
}

function handlerUpdate(personajeChange) {
  $loader.classList.remove("oculto");
  sendRequest("PUT", URL + "/" + personajeChange.id, personajeChange);

}
function handlerDelete(id) {
  $loader.classList.remove("oculto");
  sendRequest("DELETE", URL + "/" + id);

}

/**************************Armas************************************** */

const armasJSON = localStorage.getItem("armas");
const armas = [
  "armadura",
  "espada",
  "martillo",
  "Escudo",
  "Arma de Fuego",
  "Flechas",
  "HULK",
  "Traje",
  "telarañas",
  "fuerza sobrehumana",
  "artes marciales",
  "garras de adamantium",
  "factor de curación",
  "lazo de la verdad",
  "habilidades divinas",
  "super velocidad",
  "anillo de poder",
  "tridente",
  "arco y flechas",
  "grito sónico",
  "poderes mágicos",
  "habilidades tecnológicas",
  "agilidad y habilidades de ladrona",
  "traje de vibranium",
  "poderes cósmicos",
  "traje de reducción y crecimiento",
  "intangibilidad y rayos de energía"
];
localStorage.setItem("armas", armasJSON);
const selectArma = document.getElementById("idArmas");
armas.forEach((arma) => {
  const option = document.createElement("option");
  option.value = arma;
  option.textContent = arma;
  selectArma.appendChild(option);
});
