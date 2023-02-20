import { Component } from '@angular/core';
import { FormGroup, Validators,FormBuilder, FormControl, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { ViewcustomerService } from 'src/app/services/viewcustomer.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent {

  addcustomer: FormGroup | any;
  familyDetails: FormArray | any;
  currentDate:any=new Date();
  submitted=false;
  messageError=false;
  disabledButton=false;
  hidden=true;
  public message =[] as any;
  public errorMssg :any;
  val :any
  messageSuccess=false;
  marriedDisable=false;
  dup=false;
  token:any;
  readonly=true;
  index:number=0;
  duplicate=false;
  otherFieldAvailability=false;

  public customers={
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

  constructor(private fb:FormBuilder,private addcustomerService:ViewcustomerService,private router:Router){

  }

  getToday(): string {
    return new Date().toISOString().split('T')[0]
 }

  ngOnInit(){
    this.addcustomer=this.fb.group({

      firstName: ['',[Validators.required,Validators.maxLength(10),Validators.minLength(2),Validators.pattern(/^[A-Z][A-Za-z]*$/)]],
      middleName: ['',[Validators.required,Validators.maxLength(10),Validators.minLength(2),Validators.pattern(/^[A-Z][A-Za-z]*$/)]],
      lastName:['',[Validators.required,Validators.maxLength(10),Validators.minLength(2),Validators.pattern(/^[A-Z][A-Za-z]*$/)]],
      gender:['',[Validators.required,Validators.pattern(/^[A-Z][A-Za-z]*$/)]],
      dateOfBirth:['',Validators.required],
      citizenshipNumber:['',[Validators.required,Validators.pattern(/^[0-9]+([-/][0-9]+)+$/)]],
      address:['',[Validators.required,Validators.pattern(/^[A-Z][A-Za-z]*$/)]],
      maritalStatus:['',Validators.required],
      email:['',[Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      mobileNumber:['',[Validators.required,Validators.pattern('^(98|97)[0-9]{8}$')]],
      customerFamilyDetailsRequest :this.fb.array([
        this.fb.group({
          relationship : ['Father',Validators.required],
          relationPersonName:['',[Validators.required,Validators.maxLength(10),Validators.minLength(2),Validators.pattern(/^[A-Z][A-Za-z]*$/)]]
        }),
        this.fb.group({
          relationship : ['Mother',Validators.required],
          relationPersonName:['',[Validators.required,Validators.maxLength(10),Validators.minLength(2),Validators.pattern(/^[A-Z][A-Za-z]*$/)]]
        }),
        this.fb.group({
          relationship : ['Grand Father',Validators.required],
          relationPersonName:['',[Validators.required,Validators.maxLength(10),Validators.minLength(2),Validators.pattern(/^[A-Z][A-Za-z]*$/)]]
        }) 

      ])           
    })
}

customerFamilyDetailsRequest() :any{
  return this.addcustomer.get("customerFamilyDetailsRequest") as FormArray;
}

familyDetailsFieldAddMore(){
  return this.fb.group({
    relationship:['',Validators.required],
    relationPersonName:['',[Validators.required,Validators.pattern(/^[A-Z][A-Za-z]*$/)]]
  })
} 
spouseField(){
  return this.fb.group({
    relationship : ['Spouse',[Validators.required]],
    relationPersonName:['',[Validators.required,Validators.pattern(/^[A-Z][A-Za-z]*$/)]]
  })
} 

addMoreCustomerFamilyDetails(){
  this.readonly=false;
  //this.disabledButton=false;
  this.otherFieldAvailability=false;
  this.customerFamilyDetailsRequest().push(this.familyDetailsFieldAddMore());
 
}

removeCustomerFamilyDetails(index : any){
  this.customerFamilyDetailsRequest().removeAt(index);
}
   
getToken(){
  let resp=this.addcustomerService.getToken();
  this.token=resp;
}

onSubmit(){
    this.submitted=true;
    if(this.addcustomerService.isLoggedIn()){
      this.addcustomerService.postAllCustomer(this.addcustomer.value).subscribe(
        (data)=> {
          console.log(data);
          this.messageSuccess=true;
          setTimeout(() => {
          this.router.navigate(['view']);
        }, 400);
        },
        (error)=>{
          this.messageError=true;
          console.log(error);
          alert('error');
        }
       );
    }  
  }

getFamilyDetails(customerfam : any){
    return customerfam.get('customerFamilyDetailsRequest').controls;
  }
  
onAddSkill(){
    alert('error');
  }

add(event:any){
    this.hidden=false;
    
    //console.log(event.target.value);

    if(event.target.value=="Married"){
      for(let index in this.getFamilyDetails(this.addcustomer)){
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
      for(let index in this.getFamilyDetails(this.addcustomer)){
        if(this.customerFamilyDetailsRequest().controls[index].controls.relationship.value=="Father" || this.customerFamilyDetailsRequest().controls[index].controls.relationship.value=="Mother" 
        || this.customerFamilyDetailsRequest().controls[index].controls.relationship.value=="Grand Father"){
          this.disabledButton=false;
        }
        //console.log(index);
        //console.log(this.customerFamilyDetailsRequest().controls[index].controls.relationship.value);
        if(this.customerFamilyDetailsRequest().controls[index].controls.relationship.value=="Spouse"){
          this.customerFamilyDetailsRequest().removeAt(index);
        }
        
      }   
    }
    this.getFamilyDetails(this.addcustomer);    
  }
  
spouse(event:any,maritalStatus:any,i:any){
    console.log(maritalStatus.value);

    if(event.target.value=="Spouse" && maritalStatus=="Unmarried"){
      this.removeCustomerFamilyDetails(i);
    }
  }

  findDuplicate(name:FormControl, i:any,maritalstatus:any): boolean {
    let myArray = this.getFamilyDetails(this.addcustomer);

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
    this.router.navigate(['view']);
  }
}
