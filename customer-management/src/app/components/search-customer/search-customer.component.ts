import { Component } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ViewcustomerService } from 'src/app/services/viewcustomer.service';

@Component({
  selector: 'app-search-customer',
  templateUrl: './search-customer.component.html',
  styleUrls: ['./search-customer.component.css']
})

// public interface searchCustomer{
//   "id":'',
//   "firstName":'',
//   "gender":'',
//   "citizenshipNumber":'',
//   "dateOfBirth":'',
//   "mobileNumber":'',
//   "address":'',
//   "email":'',
//   "addedBy":'',
//   "modifiedBy":'',
//   "status":''

// };

export class SearchCustomerComponent {

  search=false;
  stringJson:any;
  view=true;
  statusRep:boolean |any;
  info:any;
  editcustomer: FormGroup |any;
  value:any;
  familyDetails:FormArray|any;
  id:any;
  searchItem:any;
  headers=["ID","Name","Gender","Citizenship Number","DOB","Contact","Address","Email Address","Added By","Modified By","Status","Action"]
  active:boolean=false;


  public searchCustomer = [] as any;
  
  public errorMssg: any;
  token:any;

  constructor(private fb:FormBuilder,private viewcustomer: ViewcustomerService,private router:Router,private activatedRouter:ActivatedRoute){

  }

  ngOnInit(){

    const name= this.activatedRouter.snapshot.params['firstname'];



    this.viewcustomer.searchCustomer(name).subscribe(
      (data) =>{
        
        this.searchCustomer=data;
        
        console.log(this.stringJson);
        console.log("Gio "+data);

      },
      (error) =>{

      }
    );
  }

  inActiveStatus(val:any){
   this.statusRep=false;
    if(this.searchCustomer.id==val.id){
      
      this.searchCustomer.status="INACTIVE"
      this.value=this.searchCustomer.status;

   }

   const myId= val.id;
   
   console.log("MyId "+val.id);
  
   this.viewcustomer.updateCustomerStatus(this.value,myId).subscribe(
    (data)=> {
      
      //console.log("Cust "+data);
      alert('You have successfully changed status to '+this.value);

    },
    (error)=>{
      console.log(error);
      alert('error');
    }
   );

   this.ngOnInit();
  }

  activeStatus(val:any){

    this.statusRep=true;
    
      if(this.searchCustomer.id==val.id){
        
        this.searchCustomer.status="ACTIVE"
        this.value=this.searchCustomer.status;

      }
     
  
     const myId= val.id;
     
     console.log("MyId "+val.id);
    
     this.viewcustomer.updateCustomerStatus(this.value,myId).subscribe(
      (data)=> {
        
        console.log("Cust "+ data);
        alert('You have successfully changed status to '+ this.value);
        
      },
      (error)=>{
        console.log(error);
        alert('error');
      }
     );
  
     this.ngOnInit();
  }

  deleteCustomer(val:any){

    
      if(this.searchCustomer.id==val.id){
        
        this.searchCustomer.flag=false;
        this.value=this.searchCustomer.flag;
      }
  
     const myId= val.id;
     
     console.log("MyId "+val.id);
    
     this.viewcustomer.deleteCustomer(this.value,myId).subscribe(
      (data)=> {
        console.log(data);
        alert('You have successfully deleted customer ' + myId);
      },
      (error)=>{
        console.log(error);
        alert('error');
      }
     );
  
     this.ngOnInit();

  }
}
