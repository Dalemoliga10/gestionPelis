import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path : 'auth',
    loadChildren: () => import('./auth/auth.module').then(m=>m.AuthModule),
  },
  {
    path: 'peliculas',
    loadChildren: () => import('./peliculas/peliculas.module').then(m => m.PeliculasModule),
  },
  {
    path:'',
    redirectTo: 'auth',
    pathMatch: 'full'
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
