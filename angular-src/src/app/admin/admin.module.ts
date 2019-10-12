import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { DashboardComponent } from './dashboard/dashboard.component';  

@NgModule({
  declarations: [LoginComponent, AdminComponent, DashboardComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule
  ]
})
export class AdminModule { }
