class Personaje {
    constructor(nombre, alias, editorial, id = null) {
      if (id === null) {
        this.id = Date.now();
      } else {
        this.id = id;
      }
      this.Alias = alias;
      this.Editorial = editorial;
      this.Nombre = nombre;
    }
  }
  
  export class PersonajeNew extends Personaje {
    constructor(
      nombre,
      alias,
      editorial,
      fuerza,
      arma,
      id = null
    ) {
      super(nombre, alias, editorial, id);
      this.Fuerza = fuerza;
      this.Arma = arma;
    }
  }
  