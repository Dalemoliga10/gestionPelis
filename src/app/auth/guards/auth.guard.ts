import { ActivatedRouteSnapshot, CanActivateFn, CanMatchFn, Route, Router, RouterStateSnapshot, UrlSegment } from "@angular/router";
import { map, Observable, tap } from "rxjs";
import { AuthService } from "../services/auth.service";
import { inject } from "@angular/core";


const checkOutStatus = (): Observable<boolean> => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return authService.checkAutentication().pipe(
    tap(isAuthenticated => console.log('Authenticated:', isAuthenticated)),
    tap(isAuthenticated => {
      if (!isAuthenticated) {
        router.navigate(['/auth/loginCorreo'], { replaceUrl: true });
      }
    }),
    map(estaAutenticado => {
      if (estaAutenticado) {//isAuthenticated pasa a estaAutenticado, dependiendo de si esta autenticado o no,
        return true;  // Si esta autenticado
      } else {
        return false;  // Si no lo está, detiene
      }
    })
  );
};

export const canMatchGuard: CanMatchFn = (
  route: Route,
  segments: UrlSegment[]
) => {
  console.log('CanMatch');
  console.log({route, segments});

  return checkOutStatus();
};

export const canActivateGuard: CanActivateFn =(
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  console.log('CanActivate');
  console.log({route, state});

  return checkOutStatus();
}


