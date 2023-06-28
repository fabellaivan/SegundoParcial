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
/*****************************Carga lista*************************** */
const actTabla =  () => {
  return new Promise((resolve, reject) => {
    $loader.classList.remove("oculto");
    axios
    .get(URL)
    .then(({ data }) => {
      actualizarTabla($seccionTabla, data);
      console.log(data);
      person = data;
      resolve(data);
    })
    .catch((err) => {
      console.error(err.message);
      reject(err);
    })
    .finally(()=> { 
      $loader.classList.add("oculto");
    });
  });

};

/****************************Eventos********************************/
window.addEventListener("click", (e) => {
  if (e.target.matches("td")) {
    const id = e.target.parentElement.dataset.id;
    const selectPersonajes = person.find((person) => person.id == id);
    cargarFormulario($formulario, selectPersonajes);
    botonEliminar.classList.add("eliminarCancelarVisible");
  } else if (e.target.matches("button[value='Eliminar personajes']")) {
   handlerDelete(parseInt($formulario.txtId.value))
    .then((data) => {
      $formulario.reset();
      console.log(data);
    })
    .catch((error) => {
      console.error(error);
    });
  } else if (e.target.matches("button[value='Listar Personajes']")) {   
    actTablaASYN();
  }
});
const actTablaASYN = async ()=> {
  try{
    await actTabla();
  }catch(err){
    console.log(err);
  }
}

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
    handlerCreate(new PersonajeNew(
      txtNombre.value,
      txtAlias.value,
      rdoEditorial.value,
      parseInt(rngFuerza.value),
      valorArma
    ))
      .then((data) => {
        $formulario.reset();
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  } else { 
    handlerUpdate(new PersonajeNew(
      txtNombre.value,
      txtAlias.value,
      rdoEditorial.value,
      parseInt(rngFuerza.value),
      selArma.value,
      parseInt(txtId.value)
    ))
      .then((data) => {
        $formulario.reset();
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }
});
/***************************ABM************************************** */
const handlerCreate = (newPersonaje) => {
  return new Promise((resolve, reject) => {
    $loader.classList.remove("oculto");
    axios
      .post(URL, newPersonaje, {
        "Content-Type": "application/json; charset=utf-8",
      })
      .then(({ data }) => {
        console.log(data);
        resolve(data);
      })
      .catch((err) => {
        console.error(err.message);
        reject(err);
      })
      .finally(() => {
        $loader.classList.add("oculto");
      });
  });
};


const handlerDelete = (id) => {
  return new Promise((resolve, reject) => {
    $loader.classList.remove("oculto");
    axios
      .delete(URL + "/" + id)
      .then(({ data }) => {
        console.log(data);
        resolve(data);
      })
      .catch((err) => {
        console.error(err.message);
        reject(err);
      })
      .finally(() => {
        $loader.classList.add("oculto");
      });
  });
};

const handlerUpdate = (personajeChange) => {
  return new Promise((resolve, reject) => {
    $loader.classList.remove("oculto");
    axios
      .put(URL + "/" + personajeChange.id, personajeChange, {
        "Content-Type": "application/json; charset=utf-8",
      })
      .then(({ data }) => {
        console.log(data);
        resolve(data);
      })
      .catch((err) => {
        console.error(err.message);
        reject(err);
      })
      .finally(() => {
        $loader.classList.add("oculto");
      });
  });
};

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
  "intangibilidad y rayos de energía",
];
localStorage.setItem("armas", armasJSON);
const selectArma = document.getElementById("idArmas");
armas.forEach((arma) => {
  const option = document.createElement("option");
  option.value = arma;
  option.textContent = arma;
  selectArma.appendChild(option);
});
