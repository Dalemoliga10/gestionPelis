import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-correo',
  templateUrl: './login-correo.component.html',
  styleUrls: ['./login-correo.component.css']
})
export class LoginCorreoComponent {
  constructor(private authService: AuthService,
    private router: Router
  ){}

  correo = ''

  onLoginCorreo() {
    this.authService.pruebaCorreo(this.correo)
      .subscribe(existe => {
        if (existe) {
          // Si existe, muestra el mensaje
          this.router.navigate(['/auth/loginPasswd']);
        } else {
          // Si no existe, muestra otro mensaje si es necesario
          console.log("Usuario no encontrado.");
        }
      });
  }
}
