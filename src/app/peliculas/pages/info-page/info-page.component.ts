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
  favorito: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute, // Para obtener el parámetro de la URL
    private http: HttpClient, // Para hacer la llamada a la API
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    // Obtener el ID de la URL
    this.PeliculaId = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    // Llamar a la API de PeliculaDB usando el ID de la película
    this.SacardatosPelicula();

    //Llama a función para comprobar si la película ya está en favoritos
    this.favorito = await this.verSiEsYaFavorito(localStorage.getItem("id")! , this.PeliculaId) // pongo ! porque se que llega siempre algo
    console.log("FAVORITO?:" , this.favorito);
  }

  //Api
  private apiKey:string= "673f91d62588a7a479055a917e767faa"

  // Para almacenar los detalles de la película
  PeliculaDetails: Pelicula | undefined;

  //Llama a la api para sacar los datos de esa pelicula en específico
  SacardatosPelicula() {
    const url = `https://api.themoviedb.org/3/movie/${this.PeliculaId}?api_key=${this.apiKey}`;

    this.http.get(url).subscribe((data: any) => {
      this.PeliculaDetails = data;
      console.log(this.PeliculaDetails); // Ver los detalles de la película en consola
    }, error => {
      console.error('Error al obtener los detalles de la película', error);
    });  }

  //Llama a la api para añadir la pelicula a favoritos, usa el id del localStorage
  anadirFavoritos(id_peli:number){
    const body = {
      id_usuario: localStorage.getItem("id"), // Usuario actual
      id_pelicula: id_peli   // ID de la película
    };

    this.http.post("http://localhost:3000/favoritos/anadir", body).subscribe({
      next: (response) => {
        console.log('Película añadida a favoritos:', response);
        // this.router.navigate(['/peliculas/favoritos']); No he considerado importante cambiar al meter en favoritos
      },
      error: (error) => {
        console.error('Error al añadir a favoritos:', error);
      }
    });
  }

  //Elimina de favoritos
  eliminarFavoritos(id_peli:number){
    const body = {
      id_usuario: localStorage.getItem("id"), // Usuario actual
      id_pelicula: id_peli   // ID de la película
    };

    this.http.delete('http://localhost:3000/favoritos/eliminar', { body })
    .subscribe(
      response => {
        //Si todo sale bien, al borrar una peli vuelvo a favoritos (Se supone que ya no esta en favoritos)
        console.log('Película eliminada de favoritos', response);
        this.router.navigate(['/peliculas/favoritos']);
      },
      error => {
        console.error('Error al eliminar la película', error);
      }
    );
  }

  //Comprueba si la película ya estña en favoritos, usa la api
  async verSiEsYaFavorito(id_usuario: string, id_pelicula: number): Promise<boolean> {
    let favorito: boolean = false;  // Valor por defecto

    try {
      const response = await fetch(`http://localhost:3000/favoritos/comprobar?id_usuario=${id_usuario}&id_pelicula=${id_pelicula}`);

      if (response.status === 200) {
        favorito = true; // La película ya está en favoritos
      } else if (response.status === 404) {
        favorito = false; // La película no está en favoritos
      }
    } catch (error) {
      console.error('Error al verificar si es favorito:', error);
      favorito = false; // Asumir que no estña en favoritos
    }
    return favorito;
  }


}
