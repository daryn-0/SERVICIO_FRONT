import { Marca } from "./marca";
import { Tipo } from "./tipo";

export class Coche {
    id: number;
    matricula: string;
    numPuertas: number;
    tipo: Tipo;
    marca: Marca;
    constructor(id: number = 0, matricula: string = '', numPuertas: number = 0, tipo: Tipo = new Tipo(), marca: Marca = new Marca()){
        this.id = id;
        this.matricula = matricula;
        this.numPuertas = numPuertas;
        this.tipo = tipo;
        this.marca = marca;
    }
}
