import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ViewcustomerService } from 'src/app/services/viewcustomer.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm:FormGroup | any;
  submit:boolean=false;
  message=false;

  constructor(private fb:FormBuilder, private service:ViewcustomerService,private router:Router){

  }

  onSubmit():void{

    this.service.registerCustomer(this.registerForm.value).subscribe(
      (data)=>{
        this.message=true;
        setTimeout(() => {
        this.router.navigate(['/login']);
      }, 800);

      },
      (error)=>{

        console.log(error);
        alert('error');

      }
      )
  }

  ngOnInit(){
    this.registerForm=this.fb.group({
      username:['',[Validators.required,Validators.maxLength(10),Validators.minLength(3),Validators.pattern(/^((?!\s{1,}).)*$/)]],
      password:['',[Validators.required,Validators.maxLength(10),Validators.minLength(3),Validators.pattern(/^((?!\s{1,}).)*$/)]]
    });
  }
}
