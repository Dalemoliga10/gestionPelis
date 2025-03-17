// Buscador

import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Pelicula } from '../../interfaces/pelicula.interface';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent {

  constructor(private httpClient: HttpClient) { }

  // Datos de la api y la lista de peliculas
  apiKey: string = '673f91d62588a7a479055a917e767faa';
  searchQuery: string = '';
  listaPelis: Pelicula[] = [];

  // Busca las peliculas en base a la query del buscador
  searchPeliculas(busqueda:string) {
    if (this.searchQuery.trim() === '') return; // Evitar búsquedas vacías

    const url = `https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${busqueda}`;

    this.httpClient.get<{ results: Pelicula[] }>(url).subscribe((response) => {
      this.listaPelis = response.results; // Guardar los resultados
      console.log(this.listaPelis);
    });
  }


}
