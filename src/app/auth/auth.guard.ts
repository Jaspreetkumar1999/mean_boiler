import { AuthserviceService } from './authservice.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(
    private authService : AuthserviceService,
    private router : Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot)
  : boolean | Observable <boolean> | Promise <boolean> {
    const isAuth  = this.authService.getIsAuth();
    if(!isAuth){
     this.router.navigate(['/login'])
    }
    return isAuth;
    // throw new Error ("Method not Implemented")
  }
} {

}
