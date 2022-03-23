import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  /**
   *
   */
  constructor(private router : Router,private toastr : ToastrService) {
    
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if(this.isInRole()){
      return true;
    }
    this.toastr.error('Acceso no Autorizado')
    this.router.navigateByUrl('/Home')
    return false;
  }
  public isInRole():boolean{
    if(localStorage.getItem('role') == 'Admin'){ 
      return true;
    }
    else{
      return false;
    }
  }

}
