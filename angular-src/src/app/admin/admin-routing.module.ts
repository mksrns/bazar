import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminGuard } from '../_guards/admin.guard'; 

const routes: Routes = [ 
  {path: '', component:LoginComponent},
  {path: 'dashboard', component:AdminComponent, canActivate: [AdminGuard],
    children: [
      {path:'', component: DashboardComponent},
      {path:'dashboard', redirectTo:'', pathMatch: 'full'}, 
      // {path:'scroller', component: ScrollerComponent},  
    ]
  } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
