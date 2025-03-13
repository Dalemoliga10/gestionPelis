import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from '../auth/auth-routing.module';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';
import { LayoutPeliPageComponent } from './pages/layout-page/layout-page.component';
import { PeliPageComponent } from './pages/peli-page/peli-page.component';
import { PeliculasRoutingModule } from './peliculas-routing.module';


@NgModule({
  declarations: [
    LayoutPeliPageComponent,
    PeliPageComponent
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
