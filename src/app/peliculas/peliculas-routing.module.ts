import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeliPageComponent } from './pages/peli-page/peli-page.component';
import { LayoutPeliPageComponent } from './pages/layout-page/layout-page.component';

//Asi creamos rutas, añadiendo en el Routes
const routes: Routes = [
  {
    //Localhost:4200/peliculas/
    path:"",
    component:LayoutPeliPageComponent,
    children:[
      {path: 'listaPeli', component: PeliPageComponent},
      {path: '**', redirectTo: "listaPeli"}

    ]

  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeliculasRoutingModule { }
