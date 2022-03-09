import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  /**
   *
   */
  constructor(private toastr : ToastrService, private router : Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean{
      if(this.isLoggedIn()){
        return true;
      }
    this.toastr.info('Acceso no autorizado')
    this.router.navigateByUrl('/Home')
    return false;
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
