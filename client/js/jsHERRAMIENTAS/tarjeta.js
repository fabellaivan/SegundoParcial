export const crearCuerpo = (data) => {
  let divRow = document.createElement("fieldset");
  if (!Array.isArray(data)){
    divRow.appendChild(armaTarjea(data));
  }else{
    divRow.classList.add("row");
    data.forEach((element) => {
      divRow.appendChild(armaTarjea(element));
    });
  }
  return divRow;
};
function armaTarjea(element) {

    const divCol = document.createElement("div");
    divCol.classList.add("col-4");

    const divCard = document.createElement("div");
    divCard.classList.add("card");

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const title = document.createElement("h1");
    title.classList.add("card-title");
    title.textContent = element.Alias;

    const subtitle = document.createElement("p");
    subtitle.classList.add("card-subtitle", "mb-2");
    subtitle.textContent = element.Nombre;

    const fuerza = document.createElement("p");
    fuerza.classList.add("card-text");
    fuerza.textContent = `Fuerza: ${element.Fuerza}`;

    const arma = document.createElement("p");
    arma.classList.add("card-text");
    arma.textContent = `Arma: ${element.Arma}`;

    const piePagina = document.createElement("div");
    piePagina.classList.add("card-footer");
    const pie = document.createElement("span");
    pie.textContent = element.Editorial;

    piePagina.appendChild(pie);

    cardBody.appendChild(title);
    cardBody.appendChild(subtitle);
    cardBody.appendChild(fuerza);
    cardBody.appendChild(arma);
    cardBody.appendChild(piePagina);

    divCard.appendChild(cardBody);
    divCol.appendChild(divCard);
    
  return divCol;
}