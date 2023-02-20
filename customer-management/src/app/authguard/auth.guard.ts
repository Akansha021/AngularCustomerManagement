import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ViewcustomerService } from '../services/viewcustomer.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private routes:Router,private serviceCust:ViewcustomerService){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if(this.serviceCust.isLoggedIn()){
        return true;
      }

      this.routes.navigate(['login']);
      alert("You are not logged in !! Please Login");
    return false;
  }
  
}
