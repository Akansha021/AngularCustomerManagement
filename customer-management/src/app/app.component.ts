import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ViewcustomerService } from './services/viewcustomer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'cutomer-management';
  loggedIn:boolean=false;

  constructor(public viewcustomer: ViewcustomerService,public router:Router){

  }
  ngOnInit(): void {
    
    if(this.viewcustomer.isLoggedIn()){
      this.loggedIn=true;
      //this.router.navigate(['view']);
    } 
    
  }

  logout(){
    if(this.viewcustomer.isLoggedIn()){

      this.viewcustomer.logout();
      this.router.navigate(['login']);

      this.loggedIn=false;
    }
  }
  


}
