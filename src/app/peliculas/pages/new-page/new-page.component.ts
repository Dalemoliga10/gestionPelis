import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../interfaces/user.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styleUrls: ['./new-page.component.css']
})
export class NewPageComponent {

  constructor(
    private route: ActivatedRoute, // Para obtener parámetros de la URL
    private httpClient: HttpClient, // Para hacer las solicitudes HTTP
    private fb: FormBuilder,
    private router: Router // Para crear el formulario reactivo
  ) {}

  // Crear el formulario reactivo
  userForm = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]], //Tamaño minimo
    apellidos: ['', [Validators.required, Validators.minLength(3)]],//Tamaño minimo
    rol: ['', [Validators.required]],//Tamaño Obligatorio
    correo: ['', [Validators.required, Validators.email]], //Tamaño obligatorio + ser un emai con @
    contrasena: ['', [Validators.required, Validators.minLength(6)]]//Tamaño minimo
  });

  //Creacion del usuario
  onSubmit() {
    if (this.userForm.valid) {
      const newUser: User = this.userForm.value as User;

      console.log(newUser);

      this.httpClient.post<User>('http://localhost:3000/api/usuarios', newUser).subscribe({ //Llamada de api
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
