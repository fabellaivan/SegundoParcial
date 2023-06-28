export const crearTabla = (data) => {
    if (!Array.isArray(data)) return null;
  
    const tabla = document.createElement("table");
    tabla.appendChild(crearCabecera(data[0]));
    tabla.appendChild(crearCuerpo(data));
  
    return tabla;
  };  
  const crearCabecera = (elemento) => {
    const tHead = document.createElement("thead"),
      headRow = document.createElement("tr");
      headRow.classList.add("cabecera");
      tHead.classList.add("table","table-bordered","table-dark");
      
    for (const key in elemento) {
      if (key === "id") continue;
      const th = document.createElement("th");
      th.textContent = key;
      headRow.appendChild(th);
    }
    tHead.appendChild(headRow);
    return tHead;
  };
  export const crearCuerpo = (data) => {
    if (!Array.isArray(data)) return null;
    const fragmento = document.createDocumentFragment();
    data.forEach((element, index) => {
      const tr = document.createElement("tr");
      if (index % 2 == 0) {
        tr.classList.add("rowPar");
      }
  
      for (const key in element) {
        if (key === "id") {
          tr.dataset.id = element[key];
        } else {
          const td = document.createElement("td");
          td.textContent = element[key];
          tr.appendChild(td);
        }
      }
      fragmento.appendChild(tr);
    });
    return fragmento;
  }
  
  export const actualizarTabla = (contenedor, data) => {
      while (contenedor.hasChildNodes()) { 
        contenedor.removeChild(contenedor.firstElementChild);
      }
      contenedor.appendChild(crearTabla(data,"coral")); //
    };
  