import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeliPageComponent } from './pages/peli-page/peli-page.component';
import { LayoutPeliPageComponent } from './pages/layout-page/layout-page.component';
import { CrudPageComponent } from './pages/crud-page/crud-page.component';
import { NewPageComponent } from './pages/new-page/new-page.component';
import { EditPageComponent } from './pages/edit-page/edit-page.component';

//Asi creamos rutas, añadiendo en el Routes
const routes: Routes = [
  {
    //Localhost:4200/peliculas/
    path:"",
    component:LayoutPeliPageComponent,
    children:[
      {path: 'listaPeli', component: PeliPageComponent},
      {path: 'crud', component: CrudPageComponent},
      {path: 'new', component: NewPageComponent},
      { path: 'edit/:id', component: EditPageComponent },
      {path: '**', redirectTo: "listaPeli"}
    ]

  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeliculasRoutingModule { }
