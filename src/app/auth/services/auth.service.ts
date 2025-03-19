import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { User } from 'src/app/peliculas/interfaces/user.interface';

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
        map(Usuario => { //Si encuentra usuario, recoge en localStorage el email y genera el token
          console.log("He llegado a obtener el usuario con correo y contraseña");

          localStorage.setItem('rol', Usuario.rol)
          localStorage.setItem('id', Usuario.id_usuario.toString())
          return !!Usuario; // Devuelve true si encontró usuario, false si no
        }),
        catchError(err => {
          console.log("Error al obtener el usuario:", err);
          return of(false); // En caso de error, retorna false
        })
      );
  }

  llamadaToken(passwd: string): Observable<User> {
    const idUsuario = localStorage.getItem("id");

    // Creamos el objeto que contiene la información necesaria para actualizar el token
    const body = { token: passwd };

    // Realizamos la solicitud PUT para actualizar el token
    console.log("llamada a agregarToken");

    return this.httpClient.put<User>(`http://localhot:3000/aaaa`, {})
      .pipe(
        map((Usuario: User) => {
          console.log("Token actualizado con éxito", Usuario);
          localStorage.setItem("token", Usuario.token!)
          return Usuario; // Devuelve el usuario con el token actualizado
        }),
        catchError(err => {
          console.log("Error al crear token", err);
          return throwError("Error al actualizar el token"); // Lanza un error si algo falla
        })
      );
  }


  logout() {
    localStorage.clear()
  }

  checkAutentication(): Observable<boolean>{
    const token = localStorage.getItem('token');

    if (!token) {
      return of(false); // Retorna un observable con `false` si no hay token
    }else{
      return of(true)
    }
  }

}
