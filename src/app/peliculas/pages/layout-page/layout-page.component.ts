import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: [
  ]
})
export class LayoutPeliPageComponent {

  constructor(private router: Router, private authService: AuthService) {}

  userRole: string | null = ""

  ngOnInit() {
    this.userRole = localStorage.getItem('rol'); // Obtiene el rol al cargar el componente

  }


  public sidebarItems = [
  {label:'Crud', icon: 'label', url: '/crud'},
  {label:'Favorito', icon: 'star', url: '/favoritos'},
  {label:'Buscar', icon: 'search', url: '/search'},
  ];


  onLogout(): void{
    this.authService.logout();
    this.router.navigate(['/auth'])
  }

  /*Funcion para redirigir*/
  redireccion(label:String) {
    for(let i=0;i<this.sidebarItems.length;i++){
      if(label == this.sidebarItems[i].label){
        console.log(this.sidebarItems[i].url);

        this.router.navigate(["/peliculas" + this.sidebarItems[i].url])
      }
    }

  }
}
