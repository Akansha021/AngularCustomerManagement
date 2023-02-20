import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ViewCustomerComponent } from './components/view-customer/view-customer.component';
import { AddCustomerComponent } from './components/add-customer/add-customer.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule , HTTP_INTERCEPTORS} from '@angular/common/http';

import { TokenInterceptorService } from './interceptor/token-interceptor.service';
import { EditCustomerComponent } from './components/edit-customer/edit-customer.component';
import { SearchCustomerComponent } from './components/search-customer/search-customer.component';
import { DatePipe } from '@angular/common';
import { ViewCustomerFamilyComponent } from './components/view-customer-family/view-customer-family.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { SearchPipe } from './pipes/search.pipe';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ViewCustomerComponent,
    AddCustomerComponent,
    EditCustomerComponent,
    SearchCustomerComponent,
    ViewCustomerFamilyComponent,
    SearchPipe,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports: [],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi:true
  },DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
