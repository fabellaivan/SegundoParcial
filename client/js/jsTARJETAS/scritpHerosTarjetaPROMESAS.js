import { crearCuerpo } from "../jsHERRAMIENTAS/tarjeta.js";
import {
  filtrarHeroe,
  mapHeroe,
  reduceHeroe,
} from "../jsORDENADORES/scriptsOrdenadoresPROMESAS.js";
const URL = "http://localhost:3000/superHeroe";

/*********************************************************************** */
const btnFiltra = document.querySelector("#listar");
const btnMap = document.querySelector("#mapear");
const btnReduce = document.querySelector("#reduce");
const $loader = document.getElementById("loader");
$loader.classList.add("oculto");
let supHero = [];
/*****************************Carga Lista************************************** */
const actTabla = () => {
  return new Promise((resolve, reject) => {
    $loader.classList.remove("oculto");
    axios
      .get(URL)
      .then(({ data }) => {
        const superHeroesContainer = document.getElementById("superHeroes");
        superHeroesContainer.appendChild(crearCuerpo(data));
        supHero = data;
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

/****************************Eventos********************************/

btnFiltra.addEventListener("click",async  () => {
  const rdoBtn = document.querySelector('input[name="rdoSelec"]:checked');
  const selectedValue = rdoBtn.value;
  if (selectedValue === "TD")  actTabla();
  await filtrarHeroe(supHero, "Editorial", selectedValue);
  // .then(() => {
  //     alert("Ordenado")});
});
btnMap.addEventListener("click", async() => {
  const rdoBtn = document.querySelector('input[name="rdoSelec"]:checked');
  const selectedValue = rdoBtn.value;
  if (selectedValue == "TD")  actTabla();
  await mapHeroe(supHero, "Editorial", selectedValue);
});
btnReduce.addEventListener("click",async () => {
  const rdoBtn = document.querySelector('input[name="rdoSelec"]:checked');
  const selectedValue = rdoBtn.value;
  if (selectedValue == "TD")  actTabla();
  await reduceHeroe(supHero, "Editorial", selectedValue);
});

actTabla();

