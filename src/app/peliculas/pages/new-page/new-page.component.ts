import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styleUrls: ['./new-page.component.css']
})
export class NewPageComponent {

  constructor(private httpClient: HttpClient) {}

  public userForm = new FormGroup({
    id_usuario: new FormControl<number>(0),         // id_usuario, tipo número
    nombre: new FormControl<string>(''),            // nombre, tipo string
    apellidos: new FormControl<string>(''),         // apellidos, tipo string
    rol: new FormControl<string>(''),               // rol, tipo string
    correo: new FormControl<string>(''),            // correo, tipo string
    contrasena: new FormControl<string>(''),        // contrasena, tipo string
  });


  onSubmit() {
    if (this.userForm.valid) {
      const newUser: User = this.userForm.value as User;

      console.log(newUser);

      this.httpClient.post<User>('http://localhost:3000/api/usuarios', newUser).subscribe({
        next: (response) => {
          console.log('Usuario añadido:', response);
          this.userForm.reset(); // Limpiar formulario
        },
        error: (error) => {
          console.error('Error al añadir usuario', error);
        }
      });
    }
  }




}
