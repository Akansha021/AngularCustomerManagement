import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { ViewcustomerService } from '../services/viewcustomer.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector:Injector) { }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let viewcustomerService = this.injector.get(ViewcustomerService);
    
    if (req.headers.get("skip")){
      return next.handle(req);
    }
    const parsed=viewcustomerService.getToken();
    //console.log(parsed.token);
    let tokenizedReq = req.clone({
      
      setHeaders:{
        Authorization : `Bearer ${parsed.token}`
      }
      
    })
    return next.handle(tokenizedReq)
  }
}
