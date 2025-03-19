import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { User } from 'src/app/peliculas/interfaces/user.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = "localhost:3000";
  private Usuario?: Usuario;

  constructor(public httpClient: HttpClient, private router: Router) { }

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

  llamadaToken(): void {
    const idUsuario = localStorage.getItem("id");

    if (!idUsuario) {
        console.error("No se encontró el ID de usuario en localStorage");
        return;
    }

    console.log("Llamada a agregarToken con id", idUsuario);

    this.httpClient.put<{ token: string }>(`http://localhost:3000/api/agregarToken?id=${idUsuario}`, {})
        .subscribe({
            next: response => {
                console.log("Respuesta recibida:", response);
                if (response.token) {
                    localStorage.setItem("token", response.token);
                    console.log("Token guardado en localStorage:", response.token);

                    this.router.navigate(['/peliculas/listaPeli'])
                } else {
                    console.error("La respuesta no contiene un token.");
                }
            },
            error: err => {
                console.error("Error en la solicitud:", err);
            }
        });
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
