import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from '../auth/auth-routing.module';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutPeliPageComponent } from './pages/layout-page/layout-page.component';
import { PeliPageComponent } from './pages/peli-page/peli-page.component';
import { PeliculasRoutingModule } from './peliculas-routing.module';
import { CrudPageComponent } from './pages/crud-page/crud-page.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { NewPageComponent } from './pages/new-page/new-page.component';
import { EditPageComponent } from './pages/edit-page/edit-page.component';


@NgModule({
  declarations: [
    LayoutPeliPageComponent,
    PeliPageComponent,
    CrudPageComponent,
    ConfirmDialogComponent,
    NewPageComponent,
    EditPageComponent
  ],
  imports: [
    CommonModule,
    PeliculasRoutingModule,
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PeliculasModule { }
