import { crearCuerpo } from "../jsHERRAMIENTAS/tarjeta.js";

const divTabla = document.getElementById("superHeroes");
const $loader = document.getElementById("loader");
$loader.classList.add("oculto");

export function filtrarHeroe(arr, atr, valor) {
  return new Promise((resolve) => {
    $loader.classList.remove("oculto");
    setTimeout(() => {
      refrescarDiv(divTabla, crearCuerpo(arr.filter((p) => p[atr] == valor)));
      $loader.classList.add("oculto");
      resolve();
    }, 2000);
  });
}

export function mapHeroe(arr, atr, valor) {
  return new Promise((resolve) => {
    $loader.classList.remove("oculto");
    setTimeout(() => {
      $loader.classList.add("oculto");
      refrescarDiv(
        divTabla,
        crearCuerpo(
          arr
            .filter((e) => e.Fuerza >= 70 && e.Fuerza <= 80)
            .map((e) => ({ Fuerza: e.Fuerza, Arma: e.Arma }))
        )
      );
      resolve();
    }, 2000);
  });
}

export function reduceHeroe(arr, atr, valor) {
  return new Promise((resolve) => {
    let initialObj = { Fuerza: 0, [atr]: valor };
    $loader.classList.remove("oculto");
    setTimeout(() => {
      $loader.classList.add("oculto");
      refrescarDiv(
        divTabla,
        crearCuerpo(
          arr
            .filter((e) => e.Fuerza >= 70 && e.Fuerza <= 100)
            .map((e) => ({
              Nombre: e.Alias,
              Fuerza: e.Fuerza,
              Arma: e.Arma,
              Editorial: e.Editorial,
            }))
            .reduce((mayor, actual) => {
              if (actual.Fuerza > mayor.Fuerza && actual[atr] === valor) {
                return actual;
              } else {
                return mayor;
              }
            }, initialObj)
        )
      );
      resolve();
    }, 2000);
  });
}

function refrescarDiv(div, tabla) {
  while (div.hasChildNodes()) {
    div.removeChild(div.firstElementChild);
  }
  div.appendChild(tabla);
}
