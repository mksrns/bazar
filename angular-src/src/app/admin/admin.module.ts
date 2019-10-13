import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomerComponent } from './customer/customer.component';
import { OrderComponent } from './order/order.component';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from './product/product.component';
import { MerchantComponent } from './merchant/merchant.component'; 

@NgModule({
  declarations: [LoginComponent, AdminComponent, DashboardComponent, CustomerComponent, OrderComponent, CategoryComponent, ProductComponent, MerchantComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule
  ]
})
export class AdminModule { }
