import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from '../auth/auth-routing.module';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';
import { LayoutPeliPageComponent } from './pages/layout-page/layout-page.component';
import { PeliPageComponent } from './pages/peli-page/peli-page.component';
import { PeliculasRoutingModule } from './peliculas-routing.module';
import { CrudPageComponent } from './pages/crud-page/crud-page/crud-page.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';


@NgModule({
  declarations: [
    LayoutPeliPageComponent,
    PeliPageComponent,
    CrudPageComponent,
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    PeliculasRoutingModule,
    RouterModule,
    MaterialModule,
    FormsModule
  ]
})
export class PeliculasModule { }
