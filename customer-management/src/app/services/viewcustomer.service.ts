import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, ObservableInput, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewcustomerService {

  API='http://localhost:8080/user';

  constructor(private http:HttpClient) {

   }

   getAllCustomer(page:any,pageSize:any){
    const params=new HttpParams().set('pageNumber',page).set('pageSize',pageSize);
    return this.http.get("http://localhost:8080/getCustomer",{params })
      .pipe(catchError(this.errorHandler));
   }

   registerCustomer(request:any){
    return this.http.post("http://localhost:8080/register",request,{headers:{skip:"true"},responseType: 'text' as 'json'})
    .pipe(catchError(this.errorHandler));

   }

   getCustomerPage(){

    return this.http.get("http://localhost:8080/page")
      .pipe(catchError(this.errorHandler));

   }

   getUserStatus(username:string){
    const params=new HttpParams().append('username',username);
    return this.http.get("http://localhost:8080/userStatus",{params})
      .pipe(catchError(this.errorHandler));
   }

   searchCustomer(input:string){
    const params=new HttpParams().append('firstname',input);
    return this.http.get("http://localhost:8080/customerSearch",{params})
      .pipe(catchError(this.errorHandler));
   }

   getClickedCustomer(id:number){
    const params=new HttpParams().append('id',id)
     return this.http.get("http://localhost:8080/findById",{params})
   }

   updateCustomer(data:any,id:number){
    console.log("Data "+data);
    const params=new HttpParams().append('id',id)
    return this.http.put("http://localhost:8080/updateById",data,{params,responseType: 'text' as 'json'})
   }

   updateCustomerStatus(data:any,id:number){
    console.log("Data "+data);
    const params=new HttpParams().append('id',id)
    return this.http.patch("http://localhost:8080/statusChange",data,{params,responseType: 'text' as 'json'})
   }

   deleteCustomer(data:any,id:number){
    console.log("Data "+data);
    const params=new HttpParams().append('id',id)
    return this.http.patch("http://localhost:8080/deleteCustomer",data,{params,responseType: 'text' as 'json'})
   }

   deleteCustomerFamily(id:number){
    const params=new HttpParams().append('id',id)
    return this.http.patch("http://localhost:8080/deleteCustomerFamilyDetails",{params,responseType: 'text' as 'json'})
   }

   postAllCustomer(customer: any){
  
    return this.http.post("http://localhost:8080/saveCustomer",customer,{ responseType: 'text' as 'json'});
   }

   generateToken(request:any):Observable<any>{
    return this.http.post("http://localhost:8080/user-token",request,{headers:{skip:"true"},responseType: 'text' as 'json'})
    ; 
  }

  loginUser(token:any){
    if(this.isLoggedIn()){
      sessionStorage.removeItem('token');
    }
    sessionStorage.setItem('token',token);
    return true;
  }

  isLoggedIn(){
    let tokenStr=sessionStorage.getItem("token");
    if(tokenStr== undefined || tokenStr=='' ||tokenStr==null){
      return false;
    }else{
      return true;
    }
  }

  logout(){
    sessionStorage.removeItem('token');
    return true;
  }
  getToken(){
       let token = sessionStorage.getItem('token');
       if(token!=null){
        return JSON.parse(token);
      }
  }
  setUser(user:any){
    sessionStorage.setItem('user',JSON.stringify(user));
  }
  getUser(){
    let userStr=sessionStorage.getItem("user");

    if(userStr!=null){
      return JSON.parse(userStr);
    }else{
      this.logout();
      return null;
    }
  }
   errorHandler(error:HttpErrorResponse){
    return throwError(error.message || "Server Error"|| error.status);
    }
   
}
