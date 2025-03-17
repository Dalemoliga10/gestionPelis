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

// Posibles rutas que el sidebar pueda navegar
  public sidebarItems = [
  {label:'Crud', icon: 'label', url: '/crud'},
  {label:'Favorito', icon: 'star', url: '/favoritos'},
  {label:'Buscar', icon: 'search', url: '/search'},
  ];

// Cierre de sesion
  onLogout(): void{
    this.authService.logout();
    this.router.navigate(['/auth'])
  }

  // Redirige a donde se le haga click, basasdo en la lista de arriba
  redireccion(label:String) {
    for(let i=0;i<this.sidebarItems.length;i++){
      if(label == this.sidebarItems[i].label){
        console.log(this.sidebarItems[i].url);

        this.router.navigate(["/peliculas" + this.sidebarItems[i].url])
      }
    }

  }
}
