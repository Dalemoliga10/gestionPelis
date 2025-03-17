// Dialogo de confirmación antes de borrar
import { Usuario } from './../../../auth/interfaces/user.interface';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styles: [
  ]
})
export class ConfirmDialogComponent {

  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Usuario,
  ){}

  onNoClick():void{
    this.dialogRef.close(false);
  }

  onConfirm():void{
    this.dialogRef.close(true)
  }


}
