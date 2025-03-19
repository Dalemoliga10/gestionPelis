import { Component, OnInit } from '@angular/core';
import { Pelicula } from '../../interfaces/pelicula.interface';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-favoritos-page',
  templateUrl: './favoritos-page.component.html',
  styleUrls: ['./favoritos-page.component.css']
})
export class FavoritosPageComponent implements OnInit{
  constructor(private httpClient: HttpClient) { }

  // Datos de la api y la lista de peliculas
  apiKey: string = '673f91d62588a7a479055a917e767faa';
  searchQuery: string = '';
  listaPelis: Pelicula[] = [];

  // Busca las peliculas en base a la query del buscador
  ngOnInit() {
    const favoritosUrl = `http://localhost:3000/favoritos/leer/${localStorage.getItem("id")}`; // URL de tu API

    console.log("aaa");

    // Primero obtenemos la lista de id_pelicula desde tu API
    this.httpClient.get<number[]>(favoritosUrl).subscribe(
      (idsPeliculas) => {
        console.log("IDPELIS:" + idsPeliculas);

        if (!idsPeliculas.length) {
          console.log('No hay películas favoritas.');
          this.listaPelis = [];
          return;
        }

        // Hacer llamadas a TMDb para cada película favorita
        const peticiones = idsPeliculas.map(idPeli =>
          this.httpClient.get<Pelicula>(`https://api.themoviedb.org/3/movie/${idPeli}?api_key=${this.apiKey}&append_to_response=external_ids`)
        );

        console.log("lista pelis"+ this.listaPelis);

        // permite ejecutar múltiples observables en paralelo y espera a que todos se completen para emitir un solo array
        forkJoin(peticiones).subscribe(
          (peliculas) => {
            this.listaPelis = peliculas; // Guardamos todas las películas obtenidas
            console.log(this.listaPelis);
          },
          (error) => {
            console.error('Error al obtener detalles de películas:', error);
            this.listaPelis = [];
          }
        );
      },
      (error) => {
        console.error('Error al obtener favoritos del usuario:', error);
        this.listaPelis = [];
      }
    );


  }
}
