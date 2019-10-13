import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomerComponent } from './customer/customer.component';
import { AdminGuard } from '../_guards/admin.guard';  
import { OrderComponent } from './order/order.component';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from './product/product.component';
import { MerchantComponent } from './merchant/merchant.component';

const routes: Routes = [ 
  {path: '', component:LoginComponent},
  {path: 'dashboard', component:AdminComponent, canActivate: [AdminGuard],
    children: [
      {path:'', component: DashboardComponent},
      {path:'dashboard', redirectTo:'', pathMatch: 'full'}, 
      {path:'customer', component: CustomerComponent},  
      {path:'merchant', component: MerchantComponent},  
      {path:'order', component: OrderComponent},  
      {path:'category', component: CategoryComponent},  
      {path:'product', component: ProductComponent},  
    ]
  } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
