import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css']
})

export class EditPageComponent implements OnInit {
  userForm!: FormGroup; // Definimos el formulario reactivo
  usuarioId: string | null = null;

  constructor(
    private route: ActivatedRoute, // Para obtener parámetros de la URL
    private httpClient: HttpClient, // Para hacer las solicitudes HTTP
    private fb: FormBuilder,
    private router: Router // Para crear el formulario reactivo
  ) {}

  ngOnInit(): void {
    // Obtener el id desde la ruta
    this.usuarioId = this.route.snapshot.paramMap.get('id');

    // Crear el formulario reactivo
    this.userForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellidos: ['', [Validators.required, Validators.minLength(3)]],
      rol: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]]
    });

    // Si tenemos un id, hacer la solicitud para obtener los datos
    if (this.usuarioId) {
      this.getUsuario(this.usuarioId).subscribe((data) => {
        this.userForm.patchValue({
          nombre: data.nombre,
          apellidos: data.apellidos,
          rol: data.rol,
          correo: data.correo,
          contrasena: data.contrasena
        });
      });
    }
  }

  // Método para obtener el usuario desde la API
  getUsuario(id: string): Observable<any> {
    return this.httpClient.get<any>(`http://localhost:3000/api/usuarios/${id}`);
  }

// Método para manejar el envío del formulario
// Método para manejar el envío del formulario
// Método para manejar el envío del formulario
onSubmit(): void {
  if (this.userForm.valid) {
    const updatedUser = this.userForm.value;

    // Realizar la solicitud PUT para actualizar el usuario con la URL correcta
    this.httpClient.put<any>(`http://localhost:3000/api/usuarios/id?id=${this.usuarioId}`, updatedUser)
      .subscribe({
        next: (response) => {
          console.log('Usuario actualizado:', response);
          this.router.navigate(['/peliculas/crud']) //Volver al crud
        },
        error: (error) => {
          console.error('Error al actualizar usuario:', error);
          alert('Error al actualizar usuario');
        }
      });
  }
}



}
