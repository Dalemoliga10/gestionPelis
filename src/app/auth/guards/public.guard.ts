import { ActivatedRouteSnapshot, CanActivateFn, CanMatchFn, Route, Router, RouterStateSnapshot, UrlSegment } from "@angular/router";
import { map, Observable, tap } from "rxjs";
import { AuthService } from "../services/auth.service";
import { inject } from "@angular/core";


const checkOutStatusPublic = (): Observable<boolean> => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return authService.checkAutentication().pipe(
    tap(isAuthenticated => console.log('AuthenticatedPublic: ', isAuthenticated)),
    tap(isAuthenticated => {
      if (isAuthenticated) {

        router.navigate(['/peliculas/listaPeli'], { replaceUrl: true });
      }
    }),
    map(estaAutenticado => { //isAuthenticated pasa a estaAutenticado, dependiendo de si esta autenticado o no,
      if (estaAutenticado) {
        return false;  // Si está autenticado evita llamar al otro guard
      } else {
        return true;  // Si no está autenticado, permite continuar
      }
    })
  );
};

export const canMatchGuardPublic: CanMatchFn = (
  route: Route,
  segments: UrlSegment[]
) => {
  console.log('CanMatchPublic');
  console.log({route, segments});

  return checkOutStatusPublic();
};

export const canActivateGuardPublic: CanActivateFn =(
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  console.log('CanActivatePublic');
  console.log({route, state});

  return checkOutStatusPublic();
}


