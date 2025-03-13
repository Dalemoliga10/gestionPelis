import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = "localhost:3000";
  private user?: User;

  constructor(public httpClient: HttpClient) { }

  //Llama a la api, añadiendo el correo a buscar en la bd
  pruebaCorreo(email: string): Observable<boolean> {
    return this.httpClient.get<User>(`/api/usuarios?email=${email}`)
      .pipe(
        map(user => { //Si encuentra usuario, recoge en localStorage el email y el token
          localStorage.setItem('email', user.correo);
          return !!user; // Devuelve true si encontró usuario, false si no
        }),
        catchError(err => {
          console.error("Error al obtener el usuario:", err);
          return of(false); // En caso de error, retorna false
        })
      );
  }

  //Llama a la api, añadiendo el correo a buscar en la bd
  pruebaPasswd(passwd: string): Observable<boolean> {
    return this.httpClient.get<User>(`/api/passwd?email=${localStorage.getItem("email")}&passwd=${passwd}`)
      .pipe(
        map(user => { //Si encuentra usuario, recoge en localStorage el email y el token
          localStorage.setItem('token', user.token);
          return !!user; // Devuelve true si encontró usuario, false si no
        }),
        catchError(err => {
          console.error("Error al obtener el usuario:", err);
          return of(false); // En caso de error, retorna false
        })
      );
  }

}
