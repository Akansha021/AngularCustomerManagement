import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewcustomerService } from 'src/app/services/viewcustomer.service';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {

  editcustomer: FormGroup |any;
  submitted=false;
  disabledButton=false;
  hidden=true;
  messageSuccess=false;
  messageError=false;
  familyDetails:FormArray|any;
  duplicate=false;
  value:any;
  info:any;
  //id:number =0;

  public editCustomers={
    firstName:'',
    middleName:'',
    lastName:'',
    gender:'',
    dateOfBirth:'',
    citizenshipNumber:'',
    address:'',
    maritalStatus:'',
    email:'',
    mobileNumber: '',
    addedBy: null,
    addedDate: null,
    modifiedBy: null,
    modifiedDate: null,
    customerFamilyDetails: []
  };

  constructor(public datepipe: DatePipe,private fb:FormBuilder,private editcustomerService:ViewcustomerService,private router:ActivatedRoute,private route:Router){

  }


  ngOnInit(){
  
    
    this.editcustomer=this.fb.group({

      firstName: ['',Validators.required,Validators.maxLength(10),Validators.minLength(2),Validators.pattern(/^[A-Z][A-Za-z]*$/)],
      middleName: ['',Validators.required,Validators.maxLength(10),Validators.minLength(2),Validators.pattern(/^[A-Z][A-Za-z]*$/)],
      lastName:['',Validators.required,Validators.maxLength(10),Validators.minLength(2),Validators.pattern(/^[A-Z][A-Za-z]*$/)],
      gender:['',Validators.required],
      dateOfBirth:['',Validators.required],
      citizenshipNumber:['',Validators.required],
      address:['',Validators.required,Validators.maxLength(10),Validators.minLength(2),Validators.pattern(/^[A-Z][A-Za-z]*$/)],
      maritalStatus:['',Validators.required],
      email:['',Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')],
      mobileNumber:['',Validators.required,Validators.pattern('^(98|97)[0-9]{8}$')],
      customerFamilyDetailsRequest :this.fb.array([
        this.fb.group({
          relationship : ['Father',Validators.required],
          relationPersonName:['',Validators.required,Validators.maxLength(10),Validators.minLength(2),Validators.pattern(/^[A-Z][A-Za-z]*$/)]
        }),
        this.fb.group({
          relationship : ['Mother',Validators.required],
          relationPersonName:['',Validators.required,Validators.maxLength(10),Validators.minLength(2),Validators.pattern(/^[A-Z][A-Za-z]*$/)]
        }),
        this.fb.group({
          relationship : ['Grand Father',Validators.required],
          relationPersonName:['',Validators.required,Validators.maxLength(10),Validators.minLength(2),Validators.pattern(/^[A-Z][A-Za-z]*$/)]
        }),
        this.fb.group({
          relationship : ['Spouse',[Validators.required]],
          relationPersonName:['',Validators.required,Validators.maxLength(10),Validators.minLength(2),Validators.pattern(/^[A-Z][A-Za-z]*$/)]
        })
      ])           
    })
    
  
   const id= this.router.snapshot.params['id'];
   //console.log("My Id "+ id);

    this.editcustomerService.getClickedCustomer(id).subscribe(
      (result:any)=>{
        // console.log(result);

        this.info=result;

        this.value=result.customerFamilyDetails;

        // console.log(result.customerFamilyDetails)

        this.editcustomer=this.fb.group({
          firstName: [this.info.firstName,Validators.required],
          middleName: [this.info.middleName,Validators.required],
          lastName:[this.info.lastName,Validators.required],
          gender:[this.info.gender,Validators.required],
          dateOfBirth:[formatDate(this.info.dateOfBirth, 'yyyy-MM-dd', 'en-US'),Validators.required],
          citizenshipNumber:[this.info.citizenshipNumber,Validators.required],
          address:[this.info.address,Validators.required],
          maritalStatus:[this.info.maritalStatus,Validators.required],
          email:[this.info.email,Validators.required],
          mobileNumber:[this.info.mobileNumber,Validators.required],
          customerFamilyDetailsRequest :this.fb.array([     
      ])          
        })
        this.familyDetails=this.customerFamilyDetailsRequest();
        
        for(let data of this.value) {
          if(data.flag==true){
          const fam = this.fb.group({
           relationship:[data.relationship,Validators.required],
           relationPersonName:[data.relationPersonName,Validators.required]
          });
          this.familyDetails.push(fam);
        }  
      } 
      },
      (error)=>{
        console.log(error);
        alert('error');
      }
     );  
     
}

customerFamilyDetailsRequest() :any{
  return this.editcustomer.get("customerFamilyDetailsRequest") as FormArray;
}

familyDetailsFieldAddMore(){
  return this.fb.group({

    relationship:['',Validators.required],
    relationPersonName:['',Validators.required]
  })
} 
addMoreCustomerFamilyDetails(){
  this.disabledButton=false;
  this.customerFamilyDetailsRequest().push(this.familyDetailsFieldAddMore());
}

removeCustomerFamilyDetails(index : any){
  // if(this.customerFamilyDetailsRequest().controls['relationPersonName']==null){

     // console.log("Hullop");
  // }
  this.customerFamilyDetailsRequest().removeAt(index);
}

spouse(event:any,maritalStatus:any,i:any){
  //console.log(maritalStatus.value);

  if(event.target.value=="Spouse" && maritalStatus=="Unmarried"){
    this.removeCustomerFamilyDetails(i);
  }

}

onUpdate(){
  this.submitted=true;
  const id= this.router.snapshot.params['id'];

  // console.log(this.addcustomer.value);

  if(this.editcustomer.invalid){
    return
  }
  console.log("Customer Every Details "+this.editcustomer.value);
  
    this.editcustomerService.updateCustomer(this.editcustomer.value,id).subscribe(
      (data) => {
        //console.log("Customer Every Details "+this.editcustomer.value);
        this.messageSuccess=true;
        //console.log(data);
        setTimeout(() => {
        this.route.navigate(['view']);
      }, 1500);
      },
      (error)=>{
        this.messageError=true;
        //console.log(error);
        alert('error');
      }
     );  
}

spouseField(){
  return this.fb.group({
    relationship : ['Spouse',[Validators.required]],
    relationPersonName:['',Validators.required]
  })
} 

getFamilyDetails(customerfam : any){
  return customerfam.get('customerFamilyDetailsRequest').controls;
}


add(event:any){
  this.hidden=false;
  
  console.log(event.target.value);
  if(event.target.value=="Married"){
    // this.customerFamilyDetailsRequest().removeAt(3);
    // this.customerFamilyDetailsRequest().push(this.spouseField());

    for(let index in this.getFamilyDetails(this.editcustomer)){
      if(this.customerFamilyDetailsRequest().controls[index].controls.relationship.value=="Father" || this.customerFamilyDetailsRequest().controls[index].controls.relationship.value=="Mother" 
      || this.customerFamilyDetailsRequest().controls[index].controls.relationship.value=="Grand Father" || this.customerFamilyDetailsRequest().controls[index].controls.relationship.value=="Spouse"){
        this.disabledButton=false;
      }
      if(this.customerFamilyDetailsRequest().controls[index].controls.relationship.value=="Spouse"){
        this.customerFamilyDetailsRequest().removeAt(index);
      }
    }
    this.customerFamilyDetailsRequest().push(this.spouseField());
    
    
  }else if(event.target.value=="Unmarried"){
    // this.disabledButton=false;
    // for(let index in this.getFamilyDetails(this.editcustomer)){
    //   console.log(index);
    //   this.customerFamilyDetailsRequest().removeAt(3);
    // }

    for(let index in this.getFamilyDetails(this.editcustomer)){
      console.log(index);
      console.log(this.customerFamilyDetailsRequest().controls[index].controls.relationship.value);
      if(this.customerFamilyDetailsRequest().controls[index].controls.relationship.value=="Father" || this.customerFamilyDetailsRequest().controls[index].controls.relationship.value=="Mother" 
      || this.customerFamilyDetailsRequest().controls[index].controls.relationship.value=="Grand Father"){
        this.disabledButton=false;
      }
      if(this.customerFamilyDetailsRequest().controls[index].controls.relationship.value=="Spouse"){
        this.customerFamilyDetailsRequest().removeAt(index);
      }
    }   
  }
  
  //this.familyDetailsField();
  this.getFamilyDetails(this.editcustomer);
  
}

findDuplicate(name:FormControl, i:any,maritalstatus:any): boolean {
  let myArray = this.getFamilyDetails(this.editcustomer);

  if (name.value=="Father" || name.value=="Mother" || name.value=="Grand Father" || (name.value=="Spouse" && maritalstatus=="Married")) {
    this.duplicate=true;
    this.disabledButton=false;
    name.markAsTouched();
    name.setValidators((f) => <any>{ duplicateName: true });
    name.updateValueAndValidity();
    setTimeout(() => {
    this.removeCustomerFamilyDetails(i)
  }, 3000);
     return true;
  } else {
      name.clearValidators();
      name.setValidators([Validators.required]);
      name.updateValueAndValidity();
    return false
}}

cancel(){
  this.route.navigate(['view']);
}
}
