
import { crearCuerpo } from "./tabla.js";
const superheroes = JSON.parse(localStorage.getItem('personajes')) || [];

const section = document.getElementById('secSuperHeroes');

if (superheroes.length === 0) {
  const message = document.createElement('p');
  message.textContent = 'No hay heroes creados.';
  section.appendChild(message);
} else {
    const tabla = crearCuerpo(superheroes);
  section.appendChild(tabla);
   
}