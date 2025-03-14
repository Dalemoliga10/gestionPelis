import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  constructor(private httpClient: HttpClient) { }

  //Obtener todos los usuarios
  obtenerUsuarios(): Observable<User[]> {
    return this.httpClient.get<User[]>('http://localhost:3000/usuarios/todos');
  }

  //eliminar
  deleteUserById(id: number): Observable<boolean> {
    return this.httpClient.delete(`http://localhost:3000/api/usuarios/${id}`)
      .pipe(
        map(response => true),
        catchError(error => of(false))
      );
  }


}
