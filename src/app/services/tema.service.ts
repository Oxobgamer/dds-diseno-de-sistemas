import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tema } from '../models/tema.model';

const baseUrl = 'http://localhost:8080/api/temas';
//const baseUrl = 'http://localhost:4200/api/temas';
//const baseUrl = 'http://localhost:8080/temas';

@Injectable({
  providedIn: 'root'
})

export class TemaService {

  constructor(private http: HttpClient) { }
  
  getAll(): Observable<Tema[]> {
    return this.http.get<Tema[]>(baseUrl);
  }
  get(id: any): Observable<Tema> {
    return this.http.get<Tema>(`${baseUrl}/${id}`);
  }
  create(data: any): Observable<any> {
	console.log(data);
	//Conversione a form data
	//const formData = new FormData();
	//formData.append('title', <string>data.title);
    //formData.append('status', <string>data.status);
	//formData.append('content', <string>data.content);
    return this.http.post(`${baseUrl}`, data, {responseType: 'text'});
  }
  update(id: any, data: Tema): Observable<any> {
	//Conversione a form data
	const bodyData = {
    "id": id,
    "nombre": data.nombre,
    "duracion": data.duracion
	};
    return this.http.put(`${baseUrl}`, bodyData, {responseType: 'text'});
  }
  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`, {responseType: 'text'});
  }
  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }
  findByTitle(nombre: any): Observable<Tema> {
    return this.http.get<Tema>(`${baseUrl}/buscar/${nombre}`);
  }
}
