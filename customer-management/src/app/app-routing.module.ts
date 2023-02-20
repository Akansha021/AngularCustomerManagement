import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './authguard/auth.guard';
import { LoginGuardGuard } from './loginguard/login-guard.guard';
import { AddCustomerComponent } from './components/add-customer/add-customer.component';
import { EditCustomerComponent } from './components/edit-customer/edit-customer.component';
import { LoginComponent } from './components/login/login.component';
import { SearchCustomerComponent } from './components/search-customer/search-customer.component';
import { ViewCustomerFamilyComponent } from './components/view-customer-family/view-customer-family.component';
import { ViewCustomerComponent } from './components/view-customer/view-customer.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'login',canActivate:[LoginGuardGuard],component :LoginComponent },
  {path:'register',component :RegisterComponent },
  {path:'view',canActivate:[AuthGuard], component : ViewCustomerComponent },
  {path:'add',canActivate:[AuthGuard],component : AddCustomerComponent },
  {path:'customerdetails/:id',canActivate:[AuthGuard],component : ViewCustomerFamilyComponent },
  {path:'update/:id',canActivate:[AuthGuard],component : EditCustomerComponent},
  {path:'search/:firstname',canActivate:[AuthGuard],component : SearchCustomerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
