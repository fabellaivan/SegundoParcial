import { actualizarTabla } from "../jsHERRAMIENTAS/tabla.js";
import {filtrarHeroe}from "../jsORDENADORES/scriptsOrdenadores.js";
const URL = "http://localhost:3000/superHeroe";

/*********************************************************************** */
const btnFiltra = document.querySelector("#listar");
const btnMap = document.querySelector("#mapear");
const btnReduce = document.querySelector("#reduce");
const $loader = document.getElementById("loader");
const $seccionTabla = document.getElementById("tabla");
$loader.classList.add("oculto");
let supHero=[];
/*****************************Carga************************************** */

const actTabla = () => {
    $loader.classList.remove("oculto");
  
    const xhr = new XMLHttpRequest();
   
    xhr.addEventListener("readystatechange", () => {
      if (xhr.readyState == 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          const data = JSON.parse(xhr.responseText);
          filtrarHeroe(data, 'Editorial', "TD");
          supHero = data;  
        } else {
          console.error("Error: ${xhr.status}-${xhr.statusText}");
        }
       $loader.classList.add("oculto");
      }
   
    });
    xhr.open("GET", URL);
    xhr.send();
  };
  actTabla();
 btnFiltra.addEventListener("click", () => {
  const rdoBtn = document.querySelector('input[name="rdoSelec"]:checked');
  const selectedValue = rdoBtn.value;
  filtrarHeroe(supHero, 'Editorial', selectedValue);
  
});
