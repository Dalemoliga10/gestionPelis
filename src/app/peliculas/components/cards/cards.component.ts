import { Component, Input, OnInit } from '@angular/core';
import { Pelicula } from '../../interfaces/pelicula.interface';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})

// Nos permite crear cartas por cada pelicla encontrada
export class CardsComponent implements OnInit{

  constructor(private router: Router){}

  @Input()
  public peli!: Pelicula

  // Al iniciar
  ngOnInit(): void {
    if (!this.peli) throw new Error('Peli property is required')
  }

  //Envía a la pagina detalles al pulsar el boton
  detalles(PeliculaId: number): void {
    this.router.navigate(['/peliculas/detalle/' + PeliculaId]);
  }

}
