import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean{
      if(this.isLoggedIn()){
        return true;
      }
    return true;
  }
  
  public isLoggedIn():boolean{
    let status = false;
    if(localStorage.getItem('isLoggedIn') == 'true'){
      status = true
    }
    else{
      status = false;
    }
    return status
  }
}
