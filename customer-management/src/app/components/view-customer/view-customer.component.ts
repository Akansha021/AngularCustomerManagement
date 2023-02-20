import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ViewcustomerService } from 'src/app/services/viewcustomer.service';
import { DatePipe } from '@angular/common';
import { Observable, startWith, map } from 'rxjs';
import { SearchPipe } from 'src/app/pipes/search.pipe';

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.css']
})
export class ViewCustomerComponent implements OnInit {
  transform = [{ height: "1", width: "1" }];
  private customerView = [];
  search=false;
  view=true;
  statusRep:boolean |any;
  info:any;
  editcustomer: FormGroup |any;
  value:any;
  familyDetails:FormArray|any;
  id:any;
  searchItem:any;
  headers=["ID","Name","Gender","Citizenship Number","DOB","Contact","Marital Status","Address","Email Address","Added By","Modified Date","Modified By","Status","Action"]
  active:boolean=false;
  errorMessage:boolean=false;
  loggedIn=false;
  POSTS:any;
  page:number=1;
  count:number=0;
  tableSize:number=10;
  //tableSizes=[5,10,15,20] as any;
  searchCust:FormGroup|any;

  public customers = [] as any;
  public searchCustomer=[] as any;
  public errorMssg: any;
  token:any;
  private previousUrl: any;
  private currentUrl: any;

  searchControl = new FormControl();
  filteredOptions: Observable<string[]> | undefined;

  pages:number=0;
  pageSize =[] as any;

  searchedCustomer=[];

  constructor(private route:ActivatedRoute,public datepipe: DatePipe,private fb:FormBuilder,private viewcustomer: ViewcustomerService,private editcustomerService:ViewcustomerService,private router:Router,private activatedRouter:ActivatedRoute){

    this.currentUrl = this.router.url;
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      };
    });
  }
  

  performFilter(filterBy: string): any[] {
    if (filterBy) {
        filterBy = filterBy.toLocaleLowerCase();
        return this.customers.filter((customer: any) =>
            customer.title.toLocaleLowerCase().indexOf(filterBy) !== -1);
    } else {
        return this.customers;
    }
}
  
  ngAfterViewInit() {

    const url=this.route.snapshot.paramMap.get('previousUrl')

    setTimeout(() => {
      if (url  === 'login') {
        window.alert("You've successfully logged in");
      }
    },400)
 }
 
 logout(){
  if(this.viewcustomer.isLoggedIn()){

    this.viewcustomer.logout();
    this.router.navigate(['login']);

    this.loggedIn=false;
  }
}

  inActiveStatus(val:any,ind:any){
   this.statusRep=false;
   for(let customer of this.customers){
    
    if(customer.id==val.id){
      
      customer.status="INACTIVE";
      this.value=customer.status;

    }
   }

   const myId= val.id;
   
   console.log("MyId "+val.id);
  
   if(confirm('Are you sure want to change the status to ?'+this.value)){
   this.viewcustomer.updateCustomerStatus(this.value,myId).subscribe(
    (data)=> {
      //this.active=false;
      //console.log("Cust "+data);
      alert('You have successfully changed status to '+this.value);
    },
    (error)=>{
      console.log(error);
      alert('error');
    }
   );
  }else{
    this.ngOnInit();
  }

  this.router.navigate(['view']);
  }

  activeStatus(val:any,ind:any){

    this.statusRep=true;
    for(let customer of this.customers){
    
      if(customer.id==val.id){
        
        customer.status="ACTIVE"
        this.value=customer.status;
        //this.active=true;
      }
     }
  
     const myId= val.id;
     
    
     if(confirm('Are you sure want to change the status to '+this.value+ ' ?')){
     this.viewcustomer.updateCustomerStatus(this.value,myId).subscribe(
      (data)=> {
        
        alert('You have successfully changed status to '+ this.value);
      },
      (error)=>{
        alert('error');
      }
     );
    }else{
      this.ngOnInit();
    }
    this.router.navigate(['view']);
  }

  

  deleteCustomer(val:any,ind:any){

    for(let customer of this.customers){
    
      if(customer.id==val.id){  
        customer.flag=false;
        this.value=customer.flag;
      }
     }
  
     const myId= val.id;
     
    if(confirm('Are you sure want to delete it?')){
     this.viewcustomer.deleteCustomer(this.value,myId).subscribe(
      (data)=> {
        console.log(data);
        this.ngOnInit();
        alert('You have successfully deleted customer ' + myId);
      },
      (error)=>{
        alert('error');
      }
     );
    }else{
      this.ngOnInit();
    }

  }

  getToken(){
    let resp=this.viewcustomer.getToken();
    this.token=resp;
    return this.token;

  }

  setPage(i:any,event:any){
    event.preventDefault();
    this.pages=i;
    this.getCustomers();
  }

  getCustomers(){
    if(this.viewcustomer.isLoggedIn()){
      this.viewcustomer.getAllCustomer(this.pages,this.tableSize).subscribe( 
        (data:any)=> {
        this.customers= data['content'];
        this.pageSize=new Array(data['totalPages'])
        
    //  for(let customer of this.customers){
  
    //   if(customer.status=="ACTIVE"){
    //     this.active=true;
    //   }else if(customer.status=="INACTIVE"){
    //     this.active=false;
    //   }
    // }
    ;
      },
      
        (error) =>{ 
          this.errorMessage=true;
          this.errorMssg = error
        }
        );
      }
  }




  ngOnInit() {
  
    this.filteredOptions = this.searchControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this.performFilter(value))
      );

   this.searchCust=this.fb.group({
    firstName:['',Validators.required]
   }) 
   

   if(this.viewcustomer.isLoggedIn()){
    this.loggedIn=true;
    this.router.navigate(['view']);
  } 
  

   for(let customer of this.customers){
    if(customer.status=="ACTIVE"){
      this.active=true;
    }else if(customer.status=="INACTIVE"){
      this.active=false;
    }
   }
   this.getCustomers();
    }

    customerFamilyDetailsRequest() :any{
      return this.editcustomer.get("customerFamilyDetailsRequest") as FormArray;
    }


    };

  



