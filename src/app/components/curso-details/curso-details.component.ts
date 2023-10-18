import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CursoService } from 'src/app/services/curso.service';
import { Curso } from 'src/app/models/curso.model';
import { TemaService } from 'src/app/services/tema.service';
import { Tema } from 'src/app/models/tema.model';

@Component({
  selector: 'app-curso-details',
  templateUrl: './curso-details.component.html',
  styleUrls: ['./curso-details.component.css']
})
export class CursoDetailsComponent implements OnInit {
  public startingDate = new Date()
  public actualDate = new Date()
  errors = [0, 0, 0, 0, 0, 0, 0]
  public temas: Tema[]
  public nombresTemas: string[]
  borrar = false;
  lastTemaInput = '';
  @Input() viewMode = false;
  @Input() currentElement: Curso = <Curso>{
    id: 0,
    nombre: '',
    tema: {
      id: 0,
      nombre: '',
      duracion: 0
    },
    fechaInicio: new Date,
	  idDocente: 0
  };
  @Input() startingDateText = '';
  @Output() updated = new EventEmitter<Curso>();
  message = '';
  constructor(
    private cursoService: CursoService,
    private temaService: TemaService,
    private route: ActivatedRoute,
    private router: Router) { }
  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getElement(this.route.snapshot.params["id"]);
      this.getTemas('');
    }
  }
  getElement(id: string): void {
    this.cursoService.get(id)
      .subscribe({
        next: (data) => {
          this.currentElement = data;
          this.startingDate = new Date(JSON.stringify(this.currentElement.fechaInicio).slice(0,11));
          this.lastTemaInput = this.currentElement.tema.nombre;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
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
  updateElement(): void {
    this.message = '';
    this.cursoService.update(this.currentElement.id, this.currentElement)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'Curso actualizado!';
          this.router.navigate(['/cursos']);
        },
        error: (e) => console.error(e)
      });
  }
  checkDelete(): void {
    if (!this.borrar) {
      this.borrar = true;
      (document.getElementById('borrar1') as HTMLButtonElement).innerHTML = 'Cancelar';
      document.getElementById('borrar2').style.removeProperty('display');
    }
    else {
      this.borrar = false;
      (document.getElementById('borrar1') as HTMLButtonElement).innerHTML = 'Borrar';
      document.getElementById('borrar2').style.display = 'none';
    }
  }
  deleteElement(): void {
    this.cursoService.delete(this.currentElement.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/cursos']);
        },
        error: (e) => {
          console.error(e)
          alert('Error al borrar '+ this.currentElement.nombre+', es posible que tenga dependencias');
        }
      });
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
              this.currentElement.tema = data;
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
                this.currentElement.tema = temasAux[0];
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
      this.currentElement.fechaInicio = date;
    }
    else this.activeError(4);
  }
  changeDocenteId(id: number): void {
    if (id != null){
      this.deactiveError(5);
      if (id == 1 || id == 2) {
        this.deactiveError(6);
        this.currentElement.idDocente = id;
      }
      else this.activeError(6);
    }
    else this.activeError(5);
  }
  activeError(error:number) {
    document.getElementById('error'+error).style.display = "block";
    this.errors[error] = 1;
    (document.getElementById('update') as HTMLButtonElement).disabled = true;
  }
  deactiveError(error:number) {
    document.getElementById('error'+error).style.display = "none";
    this.errors[error] = 0;
    if (this.errors.reduce(add, 0) == 0){
      (document.getElementById('update') as HTMLButtonElement).disabled = false;
    }
  }
}

function add(accumulator:number, a:number) {
  return accumulator + a;
}