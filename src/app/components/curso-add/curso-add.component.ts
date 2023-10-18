import { Component, OnInit } from '@angular/core';
import { Curso } from 'src/app/models/curso.model';
import { CursoService } from 'src/app/services/curso.service';
import { TemaService } from 'src/app/services/tema.service';
import { Tema } from 'src/app/models/tema.model';



@Component({
  selector: 'app-curso-add',
  templateUrl: './curso-add.component.html',
  styleUrls: ['./curso-add.component.css']
})
export class CursoAddComponent implements OnInit {
  curso: Curso = <Curso>{
    nombre: '',
    fechaInicio: null,
    idDocente: undefined,
    tema: {
      id: undefined,
      nombre: ''
    }
  };
  submitted = false;
  errors = [1, 1, 0, 0, 1, 1, 0];
  public temas: Tema[];
  public nombresTemas: string[];
  lastTemaInput = '';
  constructor(private cursoService: CursoService,
    private temaService: TemaService) { }
  ngOnInit(): void {
    this.getTemas('');
  }
  saveCurso(): void {
	const data = {
		"id": this.curso.id,
    	"nombre": this.curso.nombre,
    	"fechaInicio": this.curso.fechaInicio,
    	"idDocente": this.curso.idDocente ,
    	"tema": this.curso.tema
	};	
    this.cursoService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) =>
        {
        	console.error(e);
		} 
      });
  }
  newCurso(): void {
    this.submitted = false;
    this.curso = <Curso>{
      nombre: '',
      fechaInicio: null,
      idDocente: undefined,
      tema: {
        id: undefined,
        nombre: ''
      }
    };
    this.errors = [1, 1, 0, 0, 1, 1, 0];
    this.activeError(0);
    this.activeError(1);
    this.activeError(4);
    this.activeError(5);
  }
  getTemas(nombre:string) {
    console.log(nombre)
    if (nombre != ''){
      this.temaService.findByTitle(nombre)
        .subscribe({
          next: (data) => {
            this.temas = (data as undefined) as Tema[];
            var i:number;
            for (i=0; i<this.temas.length; i++){
              this.nombresTemas = this.temas.map((x) => x.nombre)
            }
            console.log(data);
          },
          error: (e) => console.error(e)
        });
    }
    else {
      this.temaService.getAll()
        .subscribe({
          next: (data) => {
            this.temas = (data as undefined) as Tema[];
            var i:number;
            for (i=0; i<this.temas.length; i++){
              this.nombresTemas = this.temas.map((x) => x.nombre)
            }
            console.log(data);
          },
          error: (e) => console.error(e)
        });
    }
  }
  changeNombre(nombre:string): void {
    if (nombre != '') {
      this.deactiveError(0);
    }
    else this.activeError(0);
  }
  changeTemaId(id:number): void {
    if (id != null) {
      this.deactiveError(1);
      console.log(id)
      this.temaService.get(id.toString())
        .subscribe({
          next: (data) => {
            if (data != null){
              this.deactiveError(2);
              this.deactiveError(3);
              this.curso.tema = data;
              this.lastTemaInput = data.nombre;
              console.log(data);
            }
            else this.activeError(2);
          },
          error: (e) => console.error(e)
        })
    }
    else this.activeError(1);
  }
  changeTemaNombre(nombre:string): void {
    if (nombre != '') {
      this.deactiveError(1);
      console.log(nombre);
      this.temaService.findByTitle(nombre)
        .subscribe({
          next: (data) => {
            console.log(data);
            if (data != null && this.lastTemaInput.length < nombre.length){
              var temasAux:Tema[] = (data as undefined) as Tema[];
              if (temasAux.length == 1) {
                this.deactiveError(3);
                this.deactiveError(2);
                this.curso.tema = temasAux[0];
                this.lastTemaInput = temasAux[0].nombre;
              }
              else this.activeError(3);
            }
            else {
              this.activeError(3);
              this.lastTemaInput = nombre;
            }
            console.log(this.lastTemaInput)
          },
          error: (e) => console.error(e)
        })
    }
    else {
      this.activeError(1);
      this.lastTemaInput = nombre;
    }
  }
  changeDate(date: Date): void {
    if (date != null) {
      this.deactiveError(4);
      this.curso.fechaInicio = date;
    }
    else this.activeError(4);
  }
  changeDocenteId(id: number): void {
    if (id != null){
      this.deactiveError(5);
      if (id == 1 || id == 2) {
        this.deactiveError(6);
        this.curso.idDocente = id;
      }
      else this.activeError(6);
    }
    else this.activeError(5);
  }
  activeError(error:number) {
    document.getElementById('error'+error).style.display = "block";
    this.errors[error] = 1;
    (document.getElementById('submit') as HTMLButtonElement).disabled = true;
  }
  deactiveError(error:number) {
    document.getElementById('error'+error).style.display = "none";
    this.errors[error] = 0;
    if (this.errors.reduce(add, 0) == 0){
      (document.getElementById('submit') as HTMLButtonElement).disabled = false;
    }
  }
}

function add(accumulator:number, a:number) {
  return accumulator + a;
}

