import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = "localhost:3000";
  private Usuario?: Usuario;

  constructor(public httpClient: HttpClient) { }

  //Llama a la api, añadiendo el correo a buscar en la bd
  pruebaCorreo(email: string): Observable<boolean> {
    return this.httpClient.get<Usuario>(`/api/usuarios?email=${email}`)
      .pipe(
        map(Usuario => { //Si encuentra usuario, recoge en localStorage el email y el token
          localStorage.setItem('email', Usuario.correo);
          return !!Usuario; // Devuelve true si encontró usuario, false si no
        }),
        catchError(err => {
          console.error("Error al obtener el usuario:", err);
          return of(false); // En caso de error, retorna false
        })
      );
  }

  //Llama a la api, añadiendo el correo a buscar en la bd
  pruebaPasswd(passwd: string): Observable<boolean> {
    return this.httpClient.get<Usuario>(`/api/passwd?email=${localStorage.getItem("email")}&passwd=${passwd}`)
      .pipe(
        map(Usuario => { //Si encuentra usuario, recoge en localStorage el email y el token
          localStorage.setItem('token', Usuario.token);
          localStorage.setItem('rol', Usuario.rol)
          return !!Usuario; // Devuelve true si encontró usuario, false si no
        }),
        catchError(err => {
          console.error("Error al obtener el usuario:", err);
          return of(false); // En caso de error, retorna false
        })
      );
  }

  logout() {
    localStorage.clear()
  }


  checkAutentication(): Observable<boolean>{
    if(!localStorage.getItem('token')){

      return of(false);
    }
    const token = localStorage.getItem('token');

    return this.httpClient.get<Usuario>(`${this.baseUrl}/api/usuarios/${token}`)
    .pipe(
      tap(user => this.Usuario = user),
      map(user => !!user && user.token === token), // Compara el token recibido con el esperado
      catchError(err => of(false))
    );
  }

}
