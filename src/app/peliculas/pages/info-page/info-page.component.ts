import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pelicula } from '../../interfaces/pelicula.interface';

@Component({
  selector: 'app-info-page',
  templateUrl: './info-page.component.html',
  styleUrls: ['./info-page.component.css']
})
export class InfoPageComponent {
  PeliculaId: number = 0;

  constructor(
    private activatedRoute: ActivatedRoute, // Para obtener el parámetro de la URL
    private http: HttpClient // Para hacer la llamada a la API
  ) {}

  ngOnInit(): void {
    // Obtener el ID de la URL
    this.PeliculaId = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    // Llamar a la API de PeliculaDB usando el ID de la película
    this.SacardatosPelicula();
  }


  private apiKey:string= "673f91d62588a7a479055a917e767faa"
  PeliculaDetails: Pelicula | undefined; // Para almacenar los detalles de la película

  SacardatosPelicula() {
    const url = `https://api.themoviedb.org/3/movie/${this.PeliculaId}?api_key=${this.apiKey}&language=es`;

    this.http.get(url).subscribe((data: any) => {
      this.PeliculaDetails = data;
      console.log(this.PeliculaDetails); // Ver los detalles de la película en consola
    }, error => {
      console.error('Error al obtener los detalles de la película', error);
    });  }


}
