import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-passwd',
  templateUrl: './login-passwd.component.html',
  styleUrls: ['./login-passwd.component.css']
})
export class LoginPasswdComponent {
 constructor(private authService: AuthService,
    private router: Router
  ){}

  passwd = '';
  comprobacionPasswdCompletado: boolean = false

  onLoginPasswd() {
    this.authService.pruebaPasswd(this.passwd)
      .subscribe(existe => {
        if (existe) {
          // Si existe, crea y añade token
          console.log("Llamada a generar token");
          this.generateToken()

        } else {
          // Si no existe, muestra otro mensaje si es necesario
          console.log("Usuario no encontrado.");
        }
      });
  }

  generateToken(){
      console.log("FUNCIONA, ERES LIBRE");

      this.authService.llamadaToken(localStorage.getItem("id")!)
  }
}
