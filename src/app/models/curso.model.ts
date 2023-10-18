import { Tema } from '../models/tema.model';

export class Curso {
	constructor() {
		this.id = 0
		this.nombre = ''
		this.tema = new Tema()
		this.fechaInicio = new Date()
		this.idDocente = 0
	}
	id: number;
	nombre: string;	
	tema: Tema;
	fechaInicio: Date;
	idDocente: number;
}

