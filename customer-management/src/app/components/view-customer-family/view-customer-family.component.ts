import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ViewcustomerService } from 'src/app/services/viewcustomer.service';

@Component({
  selector: 'app-view-customer-family',
  templateUrl: './view-customer-family.component.html',
  styleUrls: ['./view-customer-family.component.css']
})
export class ViewCustomerFamilyComponent {
  public customer = [] as any;
  value:any;

  constructor(public datepipe: DatePipe,private viewcustomer: ViewcustomerService,private router:Router,private activatedRouter:ActivatedRoute){

  }

  ngOnInit(){

    const id= this.activatedRouter.snapshot.params['id'];
    console.log("Id "+id);

    this.viewcustomer.getClickedCustomer(id).subscribe(
      (data:any)=>{

        this.customer=data;
        this.value=data.customerFamilyDetails;
        //console.log(this.customer);
        //console.log(this.value)
      },
      (error)=>{

      }
      );
  }
}
