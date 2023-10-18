import { Component, OnInit } from '@angular/core';
import { Curso } from 'src/app/models/curso.model';
import { CursoService } from 'src/app/services/curso.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-curso-list',
  templateUrl: './curso-list.component.html',
  styleUrls: ['./curso-list.component.css']
})
export class CursoListComponent implements OnInit {
  cursos?: Curso[];
  currentElement: Curso = new Curso;
  currentIndex = -1;
  startingDateText = ''
  title = '';
  borrar = false;
  public checkBorrar = ''

  constructor(private cursoService: CursoService,
    private router: Router) { }
  ngOnInit(): void {
    this.retrieveCursos();
  }
  
  retrieveCursos(): void {
    this.cursoService.getAll()
      .subscribe({
        next: (data) => {
          this.cursos = data;
          console.log(this.cursos);
        },
        error: (e) => console.error(e)
      });
  }
  refreshList(): void {
    this.retrieveCursos();
    this.currentElement = new Curso();
    this.currentIndex = -1;
  }
  setActiveElement(element: Curso, index: number): void {
    this.currentElement = element;
    this.currentIndex = index;
    const cutText = JSON.stringify(this.currentElement.fechaInicio).slice(1,11)
    this.startingDateText = cutText.split('-')[2]+'-'+cutText.split('-')[1]+'-'+cutText.split('-')[0];
  }
  checkDelete(): void {
    if (!this.borrar) {
      this.borrar = true;
      (document.getElementById('borrar1') as HTMLButtonElement).innerHTML = 'Cancelar';
      document.getElementById('borrar2').style.removeProperty('display');
      document.getElementById('borrar3').style.removeProperty('display');
    }
    else {
      this.borrar = false;
      (document.getElementById('borrar1') as HTMLButtonElement).innerHTML = 'Borrar Todos';
      document.getElementById('borrar2').style.display = 'none';
      document.getElementById('borrar3').style.display = 'none';
    }
  }
  doubleCheckDelete(texto:string): void {
    console.log(texto)
    if(texto == "BORRAR") {
      this.removeAllElements();
      this.borrar = false;
      (document.getElementById('borrar1') as HTMLButtonElement).innerHTML = 'Borrar Todos';
      document.getElementById('borrar2').style.display = 'none';
      document.getElementById('borrar3').style.display = 'none';
    }
  }
  removeAllElements(): void {
    var i:number;
    for (i=0; i<this.cursos.length; i++) {
      this.cursoService.delete(this.cursos[i].id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/cursos']);
        },
        error: (e) => {
          console.error(e)
          const curso = this.cursos.filter((curso) => curso.id == e.url.split('/')[5])[0]
          alert('Error al borrar '+ curso.nombre+', es posible que tenga dependencias');
        }
      });
    } 
  }
  searchTitle(): void {
    this.currentIndex = -1;
    this.cursoService.findByTitle(this.title)
      .subscribe({
        next: (data) => {
          this.cursos = (data as undefined) as Curso[];
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
}