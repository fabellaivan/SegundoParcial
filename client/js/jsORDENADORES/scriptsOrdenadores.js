import { actualizarTabla } from "../jsHERRAMIENTAS/tabla.js";
let divTabla = document.getElementById("superHeroes");
const $seccionTabla = document.getElementById("tabla");
const $loader = document.getElementById("loader");
$loader.classList.add("oculto");

export function filtrarHeroe(arr, atr, valor) {
  $loader.classList.remove("oculto");
  setTimeout(() => {
    let filtrados = arr;
    if (valor !== "TD") {
      filtrados = arr.filter((p) => p[atr] === valor);
    }
    
    const columnasSeleccionadas = Array.from(document.querySelectorAll('input[name="chkColumnas"]:checked'))
      .map((checkbox) => checkbox.value);
    
    const datosMostrar = filtrados.map((e) => {
      const datos = {};
      if (columnasSeleccionadas.includes('Alias')) {
        datos.Alias = e.Alias;
      }
      if (columnasSeleccionadas.includes('Editorial')) {
        datos.Editorial = e.Editorial;
      }
      if (columnasSeleccionadas.includes('Nombre')) {
        datos.Nombre = e.Nombre;
      }
      if (columnasSeleccionadas.includes('Fuerza')) {
        datos.Fuerza = e.Fuerza;
      } 
      if (columnasSeleccionadas.includes('Arma')) {
        datos.Arma = e.Arma;
      }
      
      return datos;
    });

    actualizarTabla($seccionTabla, datosMostrar);

    $loader.classList.add("oculto");
    const $promedioFuerza = document.getElementById("promedio-fuerza");
    const promedioFuerza = filtrados.reduce((total, heroe) => total + heroe.Fuerza, 0) / filtrados.length;
    $promedioFuerza.textContent = "Promedio Fuerza: " + promedioFuerza.toFixed(2);
    console.log("Promedio de fuerza:", promedioFuerza);
  }, 2000);
}