import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ViewcustomerService } from 'src/app/services/viewcustomer.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup | any;
  error:boolean=false;
  message:boolean=false;
  messageError=false;
  messageAttemptCount=false;
  info:any;
  submit:boolean=false;
  public errorAttempt = [] as any;
  user:any;
  badcredential=false;

  ngOnChange(){

    this.service.getUserStatus(this.loginForm.username).subscribe((data)=>{

      if(data=="Inactive"){
           this.submit=true
      }

    },
      (error)=>{
       
    }
    );
  }

  ngOnInit(){
    this.loginForm=this.fb.group({
      username:['',[Validators.required,Validators.maxLength(10),Validators.minLength(3),Validators.pattern(/^((?!\s{1,}).)*$/)]],
      //Validators.pattern("\\S")
      password:['',[Validators.required,Validators.maxLength(10),Validators.minLength(3),Validators.pattern(/^((?!\s{1,}).)*$/)]]
    });
    
  }
  

  constructor(private fb:FormBuilder, private service:ViewcustomerService,private router:Router){

  }

  onSubmit() : void{
    //console.log(this.loginForm.value);
    let resp=this.service.generateToken(this.loginForm.value);
    
    resp.subscribe((data) => {
      this.message=true;
      //this.submit=true;
      this.info=data;
      this.service.loginUser(data);
      //this.service.setUser(this.user);
      //console.log("User "+this.service.getUser());
      setTimeout(() => {
      this.router.navigate(['view' , {previousUrl: 'login'}] );
    }, 400);

    },
      (error:HttpErrorResponse)=>{
        setTimeout(() => {
        this.error=true;
        
        if(error.status==467){

        this.messageAttemptCount=true;
        this.messageError=false;
        this.badcredential=false;

        }else if(error.status==415){

        this.messageAttemptCount=false;
        this.badcredential=true;
        this.messageError=false;

        }
        else{

        this.messageError=true;  
        this.messageAttemptCount=false;
        this.badcredential=false;

        }
        this.errorAttempt=error;
        // console.log(error.status);
        // console.log(error.message);
        // console.log(error.error);
        // console.log(error.error.message);
        // console.log(error);
      },400);
      
    }
    );
    
    }
  
}
