import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { User } from 'src/app/peliculas/interfaces/user.interface';
import { PeliculasService } from '../../services/peliculas.service';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/peliculas/components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-crud-page',
  templateUrl: './crud-page.component.html',
  styleUrls: ['./crud-page.component.css']
})
export class CrudPageComponent {

  usuarios: Observable<User[]> | undefined

  constructor(private httpClient: HttpClient,
    private servicio: PeliculasService,
    private dialog: MatDialog,
    private router: Router) {}

  ngOnInit(): void {
    this.usuarios = this.servicio.obtenerUsuarios()
  }

  public userForm = new FormGroup({
    id_usuario: new FormControl<number>(0),         // id_usuario, tipo número
    nombre: new FormControl<string>(''),            // nombre, tipo string
    apellidos: new FormControl<string>(''),         // apellidos, tipo string
    rol: new FormControl<string>(''),               // rol, tipo string
    correo: new FormControl<string>(''),            // correo, tipo string
    contrasena: new FormControl<string>(''),        // contrasena, tipo string
    token: new FormControl<string>('')              // token, tipo string
  });


  onCreateUser() {
    this.router.navigate(['/peliculas/new'])
  }

  onEditUser(id: number) {
    this.router.navigate(['/peliculas/edit/' + id])
  }

  public onDeleteUser( idEliminar: number){

      //Confirmacion
      const dialogRef = this.dialog.open(ConfirmDialogComponent,
        {data: this.userForm.value});

    //Si da okey entonces borramos
    dialogRef.afterClosed().subscribe(result =>{
      if(!result) return;

      //borra por id usando el de la funcion
      this.servicio.deleteUserById(idEliminar).subscribe({
        //si sale bien entonces mensaje bueno y vuelta a la lista
        next: (resultado) =>{
          if(resultado){
            console.log("Borrado correctamente");
            this.router.navigate(['/peliculas/listaPeli'])

            //Si sale mal mensaje malo
          }else{
            console.log("Algo salio mal");
          }

        }
      })

    })
  }
}
